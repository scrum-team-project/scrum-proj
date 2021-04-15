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

router.get("/summaryByRegion", async (req, res) => {
  const all = await Citizen.find();

  const worktypeNull = "";
  const emptySummary = {
    population: 0,
    workingPopulation: 0,
    workingPercentage: 0,
  };

  const grouppedByRegion = all.reduce((acc, value) => {
    if (!acc.find((el) => el.region === value.region)) {
      acc.push({
        region: value.region,
        districts: [
          {
            district: value.district,
            communities: [
              {
                community: value.community,
                cities: [
                  { city: value.city, summaryCity: { ...emptySummary } },
                ],
                summaryCommunity: { ...emptySummary },
              },
            ],
            summaryDistrict: { ...emptySummary },
          },
        ],
        summaryRegion: { ...emptySummary },
      });
    }

    let indexRegion = acc.findIndex((el) => el.region === value.region);

    if (
      !acc[indexRegion].districts.find((el) => el.district === value.district)
    ) {
      acc[indexRegion].districts.push({
        district: value.district,
        communities: [
          {
            community: value.community,
            cities: [{ city: value.city, summaryCity: { ...emptySummary } }],
            summaryCommunity: { ...emptySummary },
          },
        ],
        summaryDistrict: { ...emptySummary },
      });
    }

    let indexDistrict = acc[indexRegion].districts.findIndex(
      (el) => el.district === value.district
    );

    if (
      !acc[indexRegion].districts[indexDistrict].communities.find(
        (el) => el.community === value.community
      )
    ) {
      acc[indexRegion].districts[indexDistrict].communities.push({
        community: value.community,
        cities: [{ city: value.city, summaryCity: { ...emptySummary } }],
        summaryCommunity: { ...emptySummary },
      });
    }

    let indexCommunity = acc[indexRegion].districts[
      indexDistrict
    ].communities.findIndex((el) => el.community === value.community);

    if (
      !acc[indexRegion].districts[indexDistrict].communities[
        indexCommunity
      ].cities.find((el) => el.city === value.city)
    ) {
      acc[indexRegion].districts[indexDistrict].communities[
        indexCommunity
      ].cities.push({ city: value.city, summaryCity: { ...emptySummary } });
    }

    let indexCity = acc[indexRegion].districts[indexDistrict].communities[
      indexCommunity
    ].cities.findIndex((el) => el.city === value.city);

    const summaryRegion = acc[indexRegion].summaryRegion;
    const summaryDistrict =
      acc[indexRegion].districts[indexDistrict].summaryDistrict;
    const summaryCommunity =
      acc[indexRegion].districts[indexDistrict].communities[indexCommunity]
        .summaryCommunity;
    const summaryCity =
      acc[indexRegion].districts[indexDistrict].communities[indexCommunity]
        .cities[indexCity].summaryCity;

    summaryRegion.population += 1;
    summaryDistrict.population += 1;
    summaryCommunity.population += 1;
    summaryCity.population += 1;

    if (!value.worktype == "") {
      summaryRegion.workingPopulation += 1;
      summaryDistrict.workingPopulation += 1;
      summaryCommunity.workingPopulation += 1;
      summaryCity.workingPopulation += 1;
    }

    summaryRegion.workingPercentage =
      Math.round(
        (summaryRegion.workingPopulation / summaryRegion.population) * 10000
      ) / 100;
    summaryDistrict.workingPercentage =
      Math.round(
        (summaryDistrict.workingPopulation / summaryDistrict.population) * 10000
      ) / 100;
    summaryCommunity.workingPercentage =
      Math.round(
        (summaryCommunity.workingPopulation / summaryCommunity.population) *
          10000
      ) / 100;
    summaryCity.workingPercentage =
      Math.round(
        (summaryCity.workingPopulation / summaryCity.population) * 10000
      ) / 100;

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

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updated = req.body;

  await Citizen.findOneAndUpdate(
    { _id: id },
    { $set: updated },
    (error, updated) => {
      if (error) {
        res.send(false);
      } else {
        res.send(true);
      }
    }
  );
});

module.exports = router;
