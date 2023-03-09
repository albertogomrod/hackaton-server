const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares.js");
const isAdmin = require("../middlewares/admin.middlewares.js")
const Tutorial = require("../models/Tutorial.model");

//TUTORIALES

// POST "/api/tutorial/create"=> Crear nuevo tutorial. Tutorial.create()

router.post("/create", isAuthenticated, isAdmin, async (req, res, next) => {
    const { title, image, description, tech, links, owner } = req.body;
  
    try {
      const response = await Tutorial.create({
        title,
        image,
        description,
        tech,
        links,
        owner: req.payload._id,
      });
      res.status(200).json();
    } catch (error) {
      next(error);
    }
  });

// PATCH "/api/tutorial/edit/:tutorialId" => Editar nuevo tutoriales

router.patch("/edit/:tutorialId", isAuthenticated, isAdmin, async (req, res, next) => {
    const { tutorialId } = req.params;
    const { title, image, description, tech, links, owner } = req.body;
  
    try {
      await Tutorial.findByIdAndUpdate(tutorialId, {
        title,
        image,
        description,
        tech,
        links,
        owner: req.payload._id,
      });
      res.status(200).json();
      res.json("todo bien, documento actualizado");
    } catch (error) {
      next(error);
    }
  });

// DELETE "/api/tutorial/delete/:tutorialId" => Borrar tutoriales

router.delete("/delete/:tutorialId", isAuthenticated, isAdmin, async (req, res, next) => {
    const { tutorialId } = req.params;
  
    try {
      await Tutorial.findByIdAndDelete(tutorialId);
      res.json("todo bien, documento borrado");
    } catch (error) {
      next(error);
    }
  });

// GET "/api/tutorial/details/:tutorialId" => Renderiza un solo tutorial findOneById()

router.get("/details/:tutorialId", isAuthenticated, async (req, res, next) => {
    const { tutorialId } = req.params;
  
    try {
      const response = await Tutorial.findById(tutorialId);
      res.json(response);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
