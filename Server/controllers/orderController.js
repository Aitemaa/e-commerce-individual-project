const {Product, Order, OrderDetail} = require('../models')

class OrderController{
    static async addToCart(req, res, next){
        try {
            const UserId = req.user.id;
            const ProductId = req.params.productId;
            const {size} = req.body;
            const order = await Order.findOrCreate({
                where: {UserId, status: 'onCart'},
                defaults: {status: 'onCart'}
            })
            
            const product = await Product.findByPk(ProductId);
            if (!product){
                throw ({name: "ProductNotFound" })
            }

            await OrderDetail.create({
                OrderId: order[0].id,
                ProductId,
                size
            })

            res.status(200).json({message: "successfully added product to your cart"})
        } catch (error) {
            next(error)
        }
    }

    static async getAllOrdersForUser(req, res, next){
        try {
            const UserId = req.user.id;
            const {filter} = req.query;
            const order = await Order.findOne({
                where: {UserId, status: filter},
                include: [
                    { 
                        model: OrderDetail,
                        attributes: ['id'], 
                        include: [Product]
                    }
                ]
            });

            res.status(200).json(order)
        } catch (error) {
            next(error)
        }
    }

    static async getOrderDetailsById (req, res, next){
        try {
            const id = req.params.orderDetailsId;
            const orderDetail = await OrderDetail.findByPk(id, {
                include: {model: Order}
            });
            if (!orderDetail) {
                throw ({name: "OrderNotFound"})
            }
            res.status(200).json({orderDetail})
        } catch (error) {
            next(error)
        }
    }

    static async updateCart(req, res, next){
        try {
            const id = req.params.orderDetailsId;
            const {size} = req.body
            const orderDetail = await OrderDetail.findByPk(id, {
                include: {model: Order}
            });
            if (!orderDetail) {
                throw ({name: "OrderNotFound"})
            }
            if (orderDetail.Order.status !== "onCart"){
                throw ({name: "notOnCart"})
            }

            await orderDetail.update({size})
            res.status(200).json({message: "successfully update order's size"})
        } catch (error) {
            next(error);
        }
    }

    static async deleteCart(req, res, next){
        try {
            const id = req.params.orderDetailsId;
            const {size} = req.body
            const orderDetail = await OrderDetail.findByPk(id, {
                include: {model: Order}
            });
            if (!orderDetail) {
                throw ({name: "OrderNotFound"})
            }
            if (orderDetail.Order.status !== "onCart"){
                throw ({name: "notOnCart"})
            }

            await orderDetail.destroy()
            res.status(200).json({message: "successfully update order's size"})
        } catch (error) {
            next(error);
        }
    }
}

module.exports = OrderController