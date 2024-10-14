const express = require("express");
const router = express.Router();
const getMeteorsUseCase = require("../usecases/getMeteorsData");

router.get("/meteors", async (req, res) => {
  try {
    const { date, count, 'were-dangerous-meteors': wereDangerousMeteors } = req.query;

    const queryDate = date || new Date().toLocaleDateString('en-CA');

    const meteors = await getMeteorsUseCase(queryDate);

    if (count === "true") {
      return res.json({ count: meteors.length });
    }

    if (wereDangerousMeteors === 'true') {
      const dangerousMeteors = meteors.filter(meteor => meteor.is_potentially_hazardous_asteroid);
      return res.json({ wereDangerousMeteors: dangerousMeteors.length > 0 });
    }

    res.json(meteors);
  } catch (error) {
    console.error("Error in Delivery Layer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
