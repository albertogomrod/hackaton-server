const router = require("express").Router();

const uploaderHackaton = require("../middlewares/cloudinary-hackaton.config.js");
const uploaderProfile = require("../middlewares/cloudinary-profile.config.js");

// POST "/api/upload/hackaton" => Sube la imagen del hackaton a crear
router.post("/hackaton", uploaderHackaton.single("image"), (req, res, next) => {
  if (!req.file) {
    next("No file uploaded!");
    return;
  }
  res.json({ imageUrl: req.file.path });
});

// POST "/api/upload/profile" => Sube la imagen de perfil del usuario
router.post("/profile", uploaderProfile.single("image"), (req, res, next) => {
  if (!req.file) {
    next("No file uploaded!");
    return;
  }
  res.json({ imageUrl: req.file.path });
});

module.exports = router;
