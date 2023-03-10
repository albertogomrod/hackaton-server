const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares.js");
const Hackaton = require("../models/Hackaton.model.js");
const isCompany = require("../middlewares/company.middlewares.js")
const User = require("../models/User.model.js");

// HACKATONES

// POST "/api/hackaton/create" => Crear nuevos hackatones.
router.post("/create", isAuthenticated, isCompany, async (req, res, next) => {
  const { title, date, comunidadAutonoma, photo, description, tech, level } = req.body;

  try {
    const response = await Hackaton.create({
      title,
      date,
      comunidadAutonoma,
      photo,
      description,
      tech,
      level,
      owner: req.payload._id,
    });

    // res.json(response)
    res.status(200).json();
  } catch (error) {
    next(error);
  }
});

// PATCH "/api/hackaton/edit/:hackatonId" => Editar hackatones.

router.patch("/edit/:hackatonId", isAuthenticated, isCompany, async (req, res, next) => {
  const { hackatonId } = req.params;
  const { title, date, comunidadAutonoma, photo, description, tech,level } = req.body;

  try {
    await Hackaton.findByIdAndUpdate(hackatonId, {
      title,
      date,
      comunidadAutonoma,
      photo,
      description,
      tech,
      level,
    });

    res.json("todo bien, documento actualizado");
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/hackaton/delete/:hackatonId" => Borrar hackatones

router.delete("/delete/:hackatonId", isAuthenticated, isCompany, async (req, res, next) => {
  const { hackatonId } = req.params;

  try {
    await Hackaton.findByIdAndDelete(hackatonId);
    res.json("todo bien, documento borrado");
  } catch (error) {
    next(error);
  }
});

// GET "/api/hackaton/details/:hackatonId" => Renderiza un solo hackaton.
router.get("/details/:hackatonId", isAuthenticated, async (req, res, next) => {
  const { hackatonId } = req.params;

  try {
    const response = await Hackaton.findById(hackatonId);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET "/api/hackaton/cercaDeTi" => Renderiza los hackatones que están en la misma C.A. del usuario.
router.get("/cercaDeTi", isAuthenticated, async (req, res, next) => {
  
  try {
    const foundUser = await User.findById(req.payload._id);
    console.log(foundUser)
    const response = await Hackaton.find({comunidadAutonoma: foundUser.comunidadAutonoma})
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
