const { verifyToken } = require("../helpers/jwt");
const {User} = require('../models');

module.exports = async function authentication(req, res, next){
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken){
            throw ({name: "JsonWebTokenError"})
        }
        const token = bearerToken.split(" ")[1];
        const decodedToken = verifyToken(token);
        const user = await User.findByPk(decodedToken.id);
        req.user = {
            id: user.id,
            role: user.role
        };
        next();
    } catch (error) {
        next(error)
    }
}