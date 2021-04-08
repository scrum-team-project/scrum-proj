const express = require("express");
const router = express.Router();

const Citizen = require("../models/Citizen");

router.post("/add", async (req, res) => {
  await Citizen.create(
    req.body,
    (error, newCitizen) => {
      if (error) console.log(error);
      res.send(newCitizen);
    }
  );
});

module.exports = router;
