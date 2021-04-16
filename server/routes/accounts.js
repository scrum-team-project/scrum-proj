const express = require("express");
const router = express.Router();
const Admin = require('../models/Admin');

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (await !Admin.exists({login: username, password: password})) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    return res.send({ error });
  }
});

module.exports = router;
