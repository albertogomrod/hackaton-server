const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares.js");
const isAdmin = require("../middlewares/admin.middlewares.js");
const Tutorial = require("../models/Tutorial.model");

//TUTORIALES

// POST "/api/tutorial/create"=> Crear nuevo tutorial

router.post("/create", isAuthenticated, isAdmin, async (req, res, next) => {
  const { title, description, tech, videoUrl, owner } = req.body;

  // VALIDACIONES
  if (!title || !description || !tech || !videoUrl) {
    res.status(400).json({ errorMessage: "Los campos deben estar llenos" });
    return;
  }

  try {
    const response = await Tutorial.create({
      title,
      description,
      tech,
      videoUrl,
      owner: req.payload._id,
    });
    res.status(200).json();
  } catch (error) {
    next(error);
  }
});

// PATCH "/api/tutorial/edit/:tutorialId" => Editar tutorial

router.patch(
  "/edit/:tutorialId",
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    const { tutorialId } = req.params;
    const { title, description, tech, videoUrl, owner } = req.body;

    try {
      await Tutorial.findByIdAndUpdate(tutorialId, {
        title,
        description,
        tech,
        videoUrl,
        owner: req.payload._id,
      });
      res.status(200).json();
      res.json("todo bien, documento actualizado");
    } catch (error) {
      next(error);
    }
  }
);

// DELETE "/api/tutorial/delete/:tutorialId" => Borrar tutoriales

router.delete(
  "/delete/:tutorialId",
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    const { tutorialId } = req.params;

    try {
      await Tutorial.findByIdAndDelete(tutorialId);
      res.json("todo bien, documento borrado");
    } catch (error) {
      next(error);
    }
  }
);

// GET "/api/tutorial/details/:tutorialId" => Renderiza un solo tutorial

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
