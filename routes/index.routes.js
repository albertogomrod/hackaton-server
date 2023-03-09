const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const homeRoutes = require("./home.routes");
router.use("/home", homeRoutes);

const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const profileRoutes = require("./profile.routes");
router.use("/profile", profileRoutes);

const hackatonRoutes = require("./hackaton.routes");
router.use("/hackaton", hackatonRoutes);

const tutorialRoutes = require("./tutorial.routes.js");
router.use("/tutorial", tutorialRoutes);

module.exports = router;
