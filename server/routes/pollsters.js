const express = require("express");
const router = express.Router();

const Pollster = require("../models/Pollster");

router.post("/add", async (req, res) => {
  await Pollster.create(req.body, (error, addedPollster) => {
    if (error) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

module.exports = router;
