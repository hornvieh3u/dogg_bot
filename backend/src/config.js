require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  socketPort: process.env.SOCKET_PORT,
  botToken: process.env.BOT_TOKEN,
  botURL: process.env.BOT_URL,
};
