const express = require("express");
const router = express.Router();
const Admin = require('../models/Admin');
const User = require('../models/User');


router.post("/login-admin", async (req, res) => {
  try {
    const { login, password } = req.body;

    if (await Admin.exists({login: login, password: password})) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    return res.send({ error });
  }
});

router.post("/login-user", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (await User.exists({email: email, password: password})) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    return res.send({ error });
  }
});

module.exports = router;
