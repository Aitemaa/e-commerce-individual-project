const router = require('express').Router();
const OrderController = require('../controllers/orderController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

router.use(authenticationMiddleware);
router.get('/', OrderController.getAllOrdersForUser);
router.get('/:orderDetailsId', OrderController.getOrderDetailsById);
router.post('/addToCart/:productId', OrderController.addToCart);
router.patch('/:orderDetailsId', OrderController.updateCart);
router.delete('/:orderDetailsId', OrderController.deleteCart)
module.exports = router;