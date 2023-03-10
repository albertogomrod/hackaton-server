const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares.js");
const Hackaton = require("../models/Hackaton.model.js");
const isCompany = require("../middlewares/company.middlewares.js")

// HACKATONES

// POST "/api/hackaton/create" => Crear nuevos hackatones. Hackaton.create()
router.post("/create", isAuthenticated, isCompany, async (req, res, next) => {
  const { title, date, comunidadAutonoma, photo, description, tech } = req.body;

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

// PATCH "/api/hackaton/edit/:hackatonId" => Editar hackatones. findByIdAndUpdate()

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

// GET "/api/hackaton/details/:hackatonId" => Renderiza un solo hackaton. findOneById()
router.get("/details/:hackatonId", isAuthenticated, async (req, res, next) => {
  const { hackatonId } = req.params;

  try {
    const response = await Hackaton.findById(hackatonId);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
