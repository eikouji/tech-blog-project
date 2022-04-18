// server connection //
const router = require('express').Router();

// API routes //
const apiRoutes = require('./api');

// Homepage Routes 

const homeRoutes = require('./home-routes.js');

// Dashboard Routes //
const dashboardRoutes = require('./dashboard-routes.js');

// Define path for dashboard //
router.use('/dashboard', dashboardRoutes);

// Catch-all route for resources that don't exist //
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;