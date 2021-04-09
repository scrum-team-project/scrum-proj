const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    return res.send({ error });
  }
});

module.exports = router;
