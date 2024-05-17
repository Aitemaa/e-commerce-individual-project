module.exports = async function authorization(req, res, next){
    try {
        if (req.user.role !== 'Admin'){
            throw {name: 'NoAccess'};
        }
        next();
    } catch (error) {
        next(error)
    }
}