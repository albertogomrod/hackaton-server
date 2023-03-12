// const router = require("express").Router();

// const uploaderHackaton = require("../middlewares/cloudinary-hackaton.config.js");
// const uploaderTutorial = require("../middlewares/cloudinary-tutorial.config.js");
// const uploaderProfile = require("../middlewares/cloudinary-profile.config.js");

// // POST "/api/upload"
// router.post("/hackaton", uploaderHackaton.single("image"), (req, res, next) => {
//   if (!req.file) {
//     next("No file uploaded!");
//     return;
//   }

//   res.json({ imageUrl: req.file.path });
// });

// router.post("/tutorial", uploaderTutorial.single("image"), (req, res, next) => {
//   if (!req.file) {
//     next("No file uploaded!");
//     return;
//   }

//   res.json({ imageUrl: req.file.path });
// });

// router.post("/profile", uploaderProfile.single("image"), (req, res, next) => {
//   if (!req.file) {
//     next("No file uploaded!");
//     return;
//   }

//   res.json({ imageUrl: req.file.path });
// });

// module.exports = router;
