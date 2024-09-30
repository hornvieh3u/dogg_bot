const express = require("express");
const { getInitData } = require("./auth");
const { getTokenDuration } = require("./solana");
const router = express.Router();

// Register user
// Login
// Ignore these

router.get('/user', async (req, res, next) => {
  const initData = getInitData(res);
  if (!initData) {
    return next(new Error('Cannot display init data as it was not found'));
  }
  const { user } = initData;
  console.log('Referral ID---:', user.userId);
  return res.json(user.username);

});

router.get('/solana', async (req, res) => {
  const walletAddress = req.query.address;
  const result = await getTokenDuration(walletAddress);
  res.json(result);
});

// ----------- Main Issue ---------
// Check mog balance
// Check mogg holdering duration

module.exports = router;