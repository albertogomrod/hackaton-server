const { expressjwt } = require("express-jwt");

const isAdmin = (req, res, next) => {
    if(req.payload.role !== "admin") {
        res.status(405).json({errorMessage: "No tienes este acceso permitido."})
        return null
    } else {
        next()
    }
}

module.exports = isAdmin;