const express =require("express");
const router = express.Router();
// Generates a new accessToken through refresh token if lastone expires
router.post("/refresh", (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401); // No token, unauthorized
  
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Invalid token
  
      const accessToken = generateAccessToken({ id: user.id });
      res.json({ accessToken });
    });
  });

  module.exports = router;
  