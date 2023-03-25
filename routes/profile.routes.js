const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model.js");
const Hackaton = require("../models/Hackaton.model.js");
const Tutorial = require("../models/Tutorial.model");
const bcrypt = require("bcryptjs");
const isCompany = require("../middlewares/company.middlewares");
const isAdmin = require("../middlewares/admin.middlewares");
// PROFILE

// GET "/api/profile" => Renderiza un perfil de usuario

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const response = await User.findById(req.payload._id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// PATH "/api/profile/edit" => Actualiza perfil de usuario
router.patch("/edit", isAuthenticated, async (req, res, next) => {
  const { username, email, profilephoto, comunidadAutonoma, tech } =
    req.body;
  try {
    await User.findByIdAndUpdate(req.payload._id, {
      username,
      email,
      profilephoto,
      comunidadAutonoma,
      tech
    });
    res.json("Usuario actualizado");
  } catch (error) {
    next(error);
  }
});

// PATH "api/profile/editPassword" => Actualiza la contraseña del usuario
router.patch("/editPassword", isAuthenticated, async (req, res, next) => {
  const {password} = req.body

  if (!password) {
    res.status(400).json({ errorMessage: "Los campos deben estar llenos" });
    return;
  }
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      errorMessage:
        "La contraseña no es lo sufucientemente segura. Debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un caracter especial",
    });
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(req.payload._id, {
      password: hashPassword
    })
    res.json("Contraseña actualizada");
  } catch (error) {
    next(error)
  }
})

// DELETE "/api/profile/delete" => Elimina un perfil de usuario

router.delete("/delete", isAuthenticated, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.payload._id);
    res.json("Usuario borrado");
  } catch (error) {
    next(error);
  }
});

//GET "/api/profile/hackaton-list-company"=> Renderiza lista de Hackatones creados por una compañia
router.get(
  "/hackaton-list-company",
  isAuthenticated,
  isCompany,
  async (req, res, next) => {
    try {
      const foundUser = await User.findById(req.payload._id);
      const response = await Hackaton.find({ owner: foundUser._id });
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

//GET "/api/profile/tutorial-list-admin"=> Renderiza lista de Hackatones creados por una compañia
router.get(
  "/tutorial-list-admin",
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    try {
      const foundUser = await User.findById(req.payload._id);
      const response = await Tutorial.find({ owner: foundUser._id });
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
