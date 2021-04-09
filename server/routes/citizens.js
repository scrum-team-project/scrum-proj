const express = require("express");
const router = express.Router();

const Citizen = require("../models/Citizen");

router.post("/add", async (req, res) => {
  try {
    await Citizen.create(req.body, (error, newCitizen) => {
      if (error) console.log(error);
      res.send(newCitizen);
    });
  } catch (error) {
    return res.send({ error });
  }
});

router.get("/all", async (req, res) => {
  const all = await Citizen.find();
  res.send(all);
});

router.get("/summary-population", async (req, res) => {
  const all = await Citizen.find();

  const grouppedByRegion = all.reduce((acc, value) => {
    if (!acc.find((el) => el.region == value.region)) {
      acc.push({
        region: value.region,
        summary: {
          population: 0,
        },
      });
    }

    let index = acc.findIndex((el) => el.region == value.region);
    acc[index].summary.population += 1;

    return acc;
  }, []);

  res.send(grouppedByRegion);
});

module.exports = router;
