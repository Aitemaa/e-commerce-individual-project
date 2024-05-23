const midtransClient = require('midtrans-client');
const calculateAmount = require('../helpers/amountCalculation');
const {User, Order, OrderDetail, Product} = require('../models')

class PaymentController {
    static async initiateMidTransTrx(req, res, next){
        try {
            const UserId = req.user.id;
            const user = await User.findByPk(UserId);

            const order = await Order.findOne({
                where: {UserId, status: 'onCart'},
                include: [
                    { 
                        model: OrderDetail,
                        attributes: ['id', 'size'], 
                        include: [Product]
                    }
                ]
            });
            console.log(order, "ini order")
            const totalAmount = await calculateAmount(order, user.CityId)
            console.log(totalAmount, '<<< total amount')
            let snap = new midtransClient.Snap({
                isProduction : false,
                serverKey :process.env.MIDTRANS_SERVER_KEY
            });
            let parameter = {
                "transaction_details": {
                    "order_id": Math.floor(Math.random() * (1000 * order.id)),
                    "gross_amount": totalAmount
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    "email": user.email,
                    "phone": user.phoneNumber
                }
            };

        //  update order

        
        const transaction = await snap.createTransaction(parameter)
        let transactionToken = transaction.token;
        console.log('>> transaction order',transactionToken);
            res.json({transactionToken})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PaymentController