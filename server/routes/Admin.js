const express = require("express");
const router = express.Router();

const Admin = require("../models/Admin");
const { login } = require('../account');

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  logged = login(username, password);
  res.setHeader('Content-Type', 'application/json');
  if (logged) {
    res.end(JSON.stringify({sessionID: logged}))
  }
  res.end(JSON.stringify({error: 'Wrong password or username'}))
});


module.exports = router;
