const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares.js");
const Hackaton = require("../models/Hackaton.model.js");
const isCompany = require("../middlewares/company.middlewares.js");
const User = require("../models/User.model.js");

// HACKATONES

// POST "/api/hackaton/create" => Crear nuevos hackatones
router.post("/create", isAuthenticated, isCompany, async (req, res, next) => {
  const {
    title,
    date,
    comunidadAutonoma,
    photo,
    description,
    tech,
    level,
    coordinates,
  } = req.body;

  // VALIDACIONES
  if (
    !title ||
    !date ||
    !comunidadAutonoma ||
    !photo ||
    !description ||
    !tech ||
    !level ||
    !coordinates
  ) {
    res.status(400).json({ errorMessage: "Los campos deben estar llenos" });
    return;
  }

  const fechaInput = Date.parse(date);
  const fechaActual = Date.parse(new Date());

  if (fechaInput < fechaActual) {
    res.status(409).json({
      errorMessage:
        "La fecha introducida no puede ser anterior a la fecha actual",
    });
    return;
  }

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
      coordinates,
    });

    // res.json(response)
    res.status(200).json();
  } catch (error) {
    next(error);
  }
});

// PATCH "/api/hackaton/edit/:hackatonId" => Editar hackatones

router.patch(
  "/edit/:hackatonId",
  isAuthenticated,
  isCompany,
  async (req, res, next) => {
    const { hackatonId } = req.params;
    const { title, date, comunidadAutonoma, photo, description, tech, level } =
      req.body;

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
  }
);

// DELETE "/api/hackaton/delete/:hackatonId" => Borrar hackatones

router.delete(
  "/delete/:hackatonId",
  isAuthenticated,
  isCompany,
  async (req, res, next) => {
    const { hackatonId } = req.params;

    try {
      await Hackaton.findByIdAndDelete(hackatonId);
      res.json("todo bien, documento borrado");
    } catch (error) {
      next(error);
    }
  }
);

// GET "/api/hackaton/details/:hackatonId" => Renderiza un solo hackaton
router.get("/details/:hackatonId", isAuthenticated, async (req, res, next) => {
  const { hackatonId } = req.params;

  try {
    const response = await Hackaton.findById(hackatonId);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET "/api/hackaton/cercaDeTi" => Renderiza los hackatones que están en la misma C.A. del usuario
router.get("/cercaDeTi", isAuthenticated, async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.payload._id);
    const response = await Hackaton.find({
      comunidadAutonoma: foundUser.comunidadAutonoma,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// PATCH "/api/hackaton/assist/:hackatonId" => Añade el id del hackaton al array de hackatones del user

router.patch("/assist/:hackatonId", isAuthenticated, async (req, res, next) => {
  try {
    const response = await User.findByIdAndUpdate(req.payload._id, {
      $push: { hackaton: req.params.hackatonId },
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// PATCH "/api/hackaton/assist-delete/:hackatonId" => Elimina el id del hackaton al array de hackatones del user

router.patch(
  "/assist-delete/:hackatonId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const response = await User.findByIdAndUpdate(req.payload._id, {
        $pull: { hackaton: req.params.hackatonId },
      });
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

// GET "/api/hackaton/assist" => Renderiza los hackatones a los que vas asistir
router.get("/assist", isAuthenticated, async (req, res, next) => {
  try {
    const response = await User.findById(req.payload._id).populate("hackaton");
    res.json(response.hackaton);
  } catch (error) {
    next(error);
  }
});

// GET "/api/hackaton/map" => Renderiza el mapa con los próximos hackatones

router.get("/map", isAuthenticated, async (req, res, next) => {
  try {
    const response = await Hackaton.find({
      coordinates: coordinates,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
