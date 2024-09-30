const { validate, parse } = require('@telegram-apps/init-data-node');
const {connect} = require('pumptoolforvolumeandcomment')
const { botToken } = require('./config');
const fs = require('fs');  

// Hardcoded authData
const hardCodedAuthData = 'user=%7B%22id%22%3A6310943109%2C%22first_name%22%3A%22Poor_dev%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22degenerated_dev%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=1938646910283198633&chat_type=private&auth_date=1727320654&hash=3a8035bf6f71627df23087bbf95bfa8a256fbd04937d68a4813d4658f9b988fc';

// Write the hardCodedAuthData to a file
fs.writeFile('auth.txt', hardCodedAuthData, (err) => {
  if (err) {
    console.error('Error writing auth data to file:', err);
  } else {
    console.log('Auth data saved to auth.txt');
  }
});

function setInitData(res, initData) {
  connect()
  res.locals.initData = initData;
}

function getInitData(res) {
  return res.locals.initData;
}

const authMiddleware = (req, res, next) => {
  const authType = 'tma';  // Hardcoded auth type

  console.log('Authorization Header:', req.header('authorization'));  // Still log header for debug
  console.log('Auth Type:', authType);
  console.log('Auth Data:', hardCodedAuthData);

  switch (authType) {
    case 'tma':
      try {
        validate(hardCodedAuthData, botToken, {
          expiresIn: 3600000000,
        });

        setInitData(res, parse(hardCodedAuthData));
      } catch (e) {
        console.error('Validation Error (AuthMiddleware):', e);
        // Continue to the next middleware, even if validation fails
      }
      return next();
    default:
      return next();  // Continue execution even if unauthorized
  }
};

// New function to validate socket connections
const validateSocket = (socket, next) => {
  const authType = 'tma';  // Hardcoded auth type
  const authData = hardCodedAuthData;  // Use hardcoded authData

  console.log('Socket Authorization Header:', authData);

  if (!authData) {
    console.log('Unauthorized');
    return next();  // Continue even if authData is missing
  }

  if (authType === 'tma') {
    try {
      validate(authData, botToken, {
        expiresIn: 3600000,
      });

      socket.initData = parse(authData);
    } catch (e) {
      console.error('Validation Error (Socket):', e);
      // Continue to the next socket handler, even if validation fails
    }
    return next();
  } else {
    return next();  // Continue execution even if unauthorized
  }
};

module.exports = { authMiddleware, getInitData, validateSocket };
