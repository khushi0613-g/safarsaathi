const express = require('express');
const router = express.Router();
const { getBusPositions } = require('../utils/busTracker');

router.get('/live', (req, res) => {
  res.json({ success: true, buses: getBusPositions() });
});

module.exports = router;