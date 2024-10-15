const express = require('express');
const router = express.Router();
const getMeteorsUseCase = require('../usecases/getMeteorsData');
const stringToBoolean = require('../utils/booleanUtils');
const { format } = require('date-fns');

router.get('/meteors', async (req, res, next) => {
  try {
    let { date, count, 'were-dangerous-meteors': wereDangerousMeteors } = req.query;

    date = date || format(new Date(), 'yyyy-MM-dd');

    count = stringToBoolean(count || 'false');
    wereDangerousMeteors = stringToBoolean(wereDangerousMeteors || 'false');

    const meteors = await getMeteorsUseCase({ date, count, wereDangerousMeteors });

    res.json(meteors);
  } catch (error) {
    next(error);
  }
});

module.exports = router;