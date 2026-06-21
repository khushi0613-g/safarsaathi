const express = require('express');
const router = express.Router();
const { getBusPositions } = require('../utils/bustracker');

router.get('/live', (req, res) => {
  res.json({ success: true, buses: getBusPositions() });
});

module.exports = router;