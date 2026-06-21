const express = require('express');
const router = express.Router();
const {
  getAllRoutes,
  getPopularRoutes,
  searchRoutes,
  getRouteById,
} = require('../controllers/routeController');

router.get('/',        getAllRoutes);
router.get('/popular', getPopularRoutes);
router.get('/search',  searchRoutes);
router.get('/:id',     getRouteById);

module.exports = router;