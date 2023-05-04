const router = require("express").Router();

// import api routes
const apiRoutes = require("./api");

// /api
router.use("/api", apiRoutes);

// wrong endpoint
router.use((req, res) => res.send("Wrong route!"));

module.exports = router;
