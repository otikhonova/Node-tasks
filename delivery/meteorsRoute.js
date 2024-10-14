const express = require("express");
const router = express.Router();
const getMeteorsUseCase = require("../usecases/getMeteorsData");

router.get('/meteors', async (req, res, next) => {
  try {
    const meteors = await getMeteorsUseCase(req.query);
    res.json(meteors);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
