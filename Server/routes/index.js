const router = require('express').Router();
const errorMiddleware = require('../middlewares/errorMiddleware');
const productRoute = require('./productRoute');
const userRoute = require('./userRoute');
const orderRoute = require('./orderRoute');
const paymentRoute = require('./paymentRoute');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const CityController = require('../controllers/cityController');

router.use('/', userRoute)
router.use(authenticationMiddleware)
router.get('/cities', CityController.getCities)
router.use('/products', productRoute)
router.use('/orders', orderRoute)
router.use('/payments', paymentRoute)
router.use(errorMiddleware)

module.exports = router;