const PaymentController = require('../controllers/paymentController');

const router = require('express').Router();

router.get('/midtrans/initate', PaymentController.initiateMidTransTrx)

module.exports = router;