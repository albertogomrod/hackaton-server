const { expressjwt } = require("express-jwt");

const isCompany = (req, res, next) => {
    if(req.payload.role !== "company") {
        return null
    } else {
        next()
    }
}

module.exports = isCompany;