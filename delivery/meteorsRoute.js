const express = require("express");
const router = express.Router();
const getMeteorsUseCase = require("../usecases/getMeteorsData");
const getLatestRoverImage = require("../usecases/getLatestRoverImage");
const stringToBoolean = require("../utils/booleanUtils");
const { format } = require("date-fns");
const config = require("../config");
const validateRequest = require("../middlewares/validateRequest");
const latestRoverImageSchema = require("../schemas/latestRoverImageSchema");
const meteorsSchema = require("../schemas/meteorsSchema");

router.get("/meteors", async (req, res, next) => {
  try {
    let {
      date,
      count,
      "were-dangerous-meteors": wereDangerousMeteors,
    } = req.query;

    date = date || format(new Date(), "yyyy-MM-dd");

    count = stringToBoolean(count || "false");
    wereDangerousMeteors = stringToBoolean(wereDangerousMeteors || "false");

    const meteors = await getMeteorsUseCase({
      date,
      count,
      wereDangerousMeteors,
    });

    res.json(meteors);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/meteors/html",
  validateRequest(meteorsSchema),
  async (req, res, next) => {
    try {
      let {
        date,
        count,
        "were-dangerous-meteors": wereDangerousMeteors,
      } = req.query;

      date = date || format(new Date(), "yyyy-MM-dd");

      count = stringToBoolean(count || "false");
      wereDangerousMeteors = stringToBoolean(wereDangerousMeteors || "false");

      const meteors = await getMeteorsUseCase({
        date,
        count,
        wereDangerousMeteors,
      });

      res.render("meteors.njk", { date, meteors });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/latest-rover-image-form", (req, res) => {
  res.render("roverForm.njk");
});

router.post(
  "/latest-rover-image",
  validateRequest(latestRoverImageSchema),
  async (req, res, next) => {
    try {
      const { userId, userName, userAPIKey } = req.body;

      const imageData = await getLatestRoverImage({
        userId,
        userName,
        userAPIKey,
      });
      res.render("roverImage.njk", {
        userId,
        userName,
        latestImage: imageData.latestImage,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
