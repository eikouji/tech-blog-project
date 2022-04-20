// server connection //
const router = require('express').Router();

// API routes //
const apiRoutes = require('./api');

// Homepage Routes 

const homeRoutes = require('./home-routes.js');

// User routes //

const userRoutes = require('./user-routes');

// Post routes //

const postRoutes = require('./post-routes');

// Comments routes //

const commentRoutes = require('./comments-routes');

// Dashboard Routes //
const dashboardRoutes = require('./dashboard-routes.js');

// Define path for dashboard //
router.use('/dashboard', dashboardRoutes);

// Catch-all route for resources that don't exist //
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;