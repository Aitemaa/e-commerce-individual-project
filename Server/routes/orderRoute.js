const router = require('express').Router();
const OrderController = require('../controllers/orderController');


router.get('/', OrderController.getAllOrdersForUser);
router.patch('/:orderId', OrderController.updateStatusAfterPayment);
router.post('/addToCart/:productId', OrderController.addToCart);
router.patch('/:orderDetailsId', OrderController.updateCart);
router.delete('/:orderDetailsId', OrderController.deleteCart);

module.exports = router;