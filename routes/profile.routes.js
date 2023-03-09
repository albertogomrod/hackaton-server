const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");

// PROFILE

// GET "/api/profile/:id" => Renderiza un perfil de usuario. findById()

router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const response = await User.findById(req.payload._id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// PATH "/api/profile/edit/:id" => Actualiza perfil de usuario findByIdAndUpdate()
router.patch("/edit/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const {username, email, profilephoto, comunidadesAutonomas, password, tech} = req.body;
  try {

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(id, {
      username,
      email,
      profilephoto,
      comunidadesAutonomas,
      password: hashPassword,
      tech,
    });
    res.json("Usuario actualizado");
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/profile/delete/:id" => Elimina un perfil de usuario. findByIdAndDelete()

router.delete("/delete/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id)
    res.json("Usuario borrado")
  } catch (error) {
    next(error);
  }
});

module.exports = router;
