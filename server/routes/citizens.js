const express = require("express");
const router = express.Router();

const Citizen = require("../models/Citizen");

router.post("/add", async (req, res) => {
  try {
    await Citizen.create(req.body, (error, added) => {
      if (error) console.log(error);
      res.send(true);
    });
  } catch (error) {
    return res.send(false);
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

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Citizen.findByIdAndDelete(id, (error, deleted) => {
    if (error) {
      res.send(false); // false if fail
    } else {
      res.send(true); // true if success
    }
  });
});

router.patch("/:idUser", async (req, res) => {
  const id = req.params.id;
  const updated = req.body;

  await Citizen.findOneAndUpdate({ _id: id }, { $set: updated }, (error, updated) => {
      if (error) {
        res.send(false);
      } else {
        res.send(true);
      }
    });
});

module.exports = router;
