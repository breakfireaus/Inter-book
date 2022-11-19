const router = require("express").Router();

const userRoutes = require("./user-routes");
const serviceRoutes = require("./service-routes");
const bookingRoutes = require("./booking-routes");

router.use("/user", userRoutes);
router.use("/service", serviceRoutes);
router.use("/booking", bookingRoutes);

module.exports = router;