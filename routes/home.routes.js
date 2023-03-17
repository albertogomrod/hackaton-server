const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const Hackaton = require("../models/Hackaton.model");
const Tutorial = require("../models/Tutorial.model");

// GET "/api/hackaton-list"= Renderiza lista de hackatones

router.get("/hackaton-list", isAuthenticated, async (req, res, next) => {
  try {
    const response = await Hackaton.find();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET "/api/tutorials-list" => Renderiza lista de tutoriales

router.get("/tutorial-list", isAuthenticated, async (req, res, next) => {
  try {
    const response = await Tutorial.find();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
