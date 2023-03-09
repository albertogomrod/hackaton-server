const { expressjwt } = require("express-jwt");

const isCompany = (req, res, next) => {
    if(req.payload !== company) {
        res.redirect("/")
    } else {
        next()
    }
}

module.exports = isCompany;