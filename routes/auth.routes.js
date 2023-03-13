const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/auth.middlewares");
const router = require("express").Router();


//POST "/api/auth/signup"=> Registrar al usuario en la BBDD
router.post("/signup", async (req, res, next) => {
  const { email, password, username, comunidadAutonoma, level, role } = req.body;

  // VALIDACIONES
  if (!email || !password || !comunidadAutonoma || !level || !role) {
    res.status(400).json({ errorMessage: "Los campos deben estar llenos" });
    return;
  }
  // - Validar que la contraseña sea suficientemente fuerte
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(req.body.password)) {
    res.status(400).json({
      errorMessage:
        "La contraseña no es lo sufucientemente segura. Debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un caracter especial",
    });
    return;
  }
  // - Validar que el correo electrónico tenga el formato correcto

  try {
    const foundUserName = await User.findOne({username});
    const foundEmail = await User.findOne({email});

    // - Validar que el usuario no esté duplicado

    if (foundUserName !== null) {
      res
        .status(400)
        .json({ errorMessage: "Este nombre de usuario ya existe" });
      return;
    } else if (foundEmail !== null) {
      res
        .status(400)
        .json({
          errorMessage: "Este correo electrónico ya está siendo utiizado",
        });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({
        email,
        username,
        password: hashPassword,
        comunidadAutonoma,
        level,
        role
    })
    res.status(201).json("Usuario creado");
  } catch (error) {
    next(error);
  }
});

//POST "api/auth/login"=> Validar credenciales del usuario

router.post("/login", async(req,res,next)=>{
    const { username, password } = req.body;
    try {
        const foundUser = await User.findOne({username});
        if (!foundUser) {
          res.status(400).json({ errorMessage: "Credenciales no válidas" });
          return;
        }
    
        const isPasswordCorrect = await bcrypt.compare(
          password,
          foundUser.password
        );
        if (!isPasswordCorrect) {
          res.status(400).json({ errorMessage: "Credenciales no válidas" });
          return;
        }
    
        // payload es el contenido del Token que identifica al usuario
        const payload = {
          _id: foundUser._id,
          username: foundUser.username,
          role: foundUser.role
        };
    
        // generamos el token
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "2d",
        });
        res.status(200).json({authToken: authToken})
      } catch (error) {
        next(error);
      }
})

//GET "api/auth/verify"=> Verifica si el usuario esta activo o no.

router.get("/verify", isAuthenticated, (req, res, next) => {
    // !! SOLO PODEMOS ACCEDER A REQ.PAYLOAD PASANDO EL MIDDLEWARE
    console.log(req.payload)
    res.status(200).json(req.payload)
  });

module.exports = router;
