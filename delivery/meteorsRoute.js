const express = require('express');
const router = express.Router();
const getMeteorsUseCase = require('../usecases/getMeteorsData');

router.get('/meteors', async (req, res) => {
  try {
    const meteors = await getMeteorsUseCase();
    res.json(meteors);
  } catch (error) {
    console.error('Error in Delivery Layer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
