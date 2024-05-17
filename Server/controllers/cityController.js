const {City} = require('../models')

class CityController{

    static async getCities(req, res, next){
        try {
            const cities = await City.findAll();
            res.status(200).json({cities})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CityController