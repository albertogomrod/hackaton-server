const { expressjwt } = require("express-jwt");

const isCompany = (req, res, next) => {
    if(req.payload.role !== "company") {
        res.status(405).json({errorMessage: "No tienes este acceso permitido."})
        return null
    } else {
        next()
    }
}

module.exports = isCompany;