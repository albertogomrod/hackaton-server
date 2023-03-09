const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const Hackaton = require("../models/Hackaton.model");
const Tutorial = require("../models/Tutorial.model");

// GET "/api" => Renderiza la home (logeado) Hackaton.find() & Tutorial.find()

router.get("/", isAuthenticated, async (req, res, next) => {
    try {
        const response1 = await Hackaton.find()
        const response2 = await Tutorial.find().select("image")
        res.json({response1, response2})
    } catch (error) {
        next(error)
    }
})

// GET "/api/hackaton-list"= Renderiza lista de hackatones. find()

router.get("/hackaton-list", isAuthenticated, async (req, res, next) => {
    try {
        const response = await Hackaton.find()
        res.json(response)
    } catch (error) {
        next(error)
    }
})

// GET "/api/tutorials-list" => Renderiza lista de tutoriales. find()

router.get("/tutorial-list", isAuthenticated, async (req, res, next) => {
    try {
        const response = await Tutorial.find()
        res.json(response)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
