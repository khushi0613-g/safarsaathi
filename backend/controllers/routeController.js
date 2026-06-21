const Route = require('../models/Route');

// @route  GET /api/routes
const getAllRoutes = async (req, res, next) => {
  try {
    const routes = await Route.find().sort({ routeNumber: 1 });
    res.json({ success: true, count: routes.length, routes });
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/routes/popular
const getPopularRoutes = async (req, res, next) => {
  try {
    const routes = await Route.find({ popular: true }).limit(3);
    res.json({ success: true, routes });
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/routes/search?q=sometext
const searchRoutes = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, message: 'Search query required' });
    }

    const routes = await Route.find({
      $or: [
        { name:        { $regex: q, $options: 'i' } },
        { from:        { $regex: q, $options: 'i' } },
        { to:          { $regex: q, $options: 'i' } },
        { routeNumber: { $regex: q, $options: 'i' } },
        { 'stops.name': { $regex: q, $options: 'i' } },
      ],
    });

    // For each route, find which stops matched the query
    const results = routes.map(route => {
      const matchedStops = route.stops.filter(stop =>
        stop.name.toLowerCase().includes(q.toLowerCase())
      );
      return {
        ...route.toObject(),
        matchedStops, // which stops matched
      };
    });

    res.json({ success: true, count: results.length, routes: results });
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/routes/:id
const getRouteById = async (req, res, next) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ success: false, message: 'Route not found' });
    }
    res.json({ success: true, route });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllRoutes, getPopularRoutes, searchRoutes, getRouteById };