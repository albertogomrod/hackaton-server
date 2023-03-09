const { expressjwt } = require("express-jwt");

const isAdmin = (req, res, next) => {
    if(req.payload !== admin) {
        res.redirect("/")
    } else {
        next()
    }
}

module.exports = isAdmin;