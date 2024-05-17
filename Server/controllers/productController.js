const {Product, Category} = require('../models')
class ProductController {
    static async getAllProducts(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3; 
        const offset = (page - 1) * limit;

        try {
            const { count, rows } = await Product.findAndCountAll({
                limit: limit,
                offset: offset,
                include: {
                    model: Category,
                    attributes: ['name']
                }
            });
            
            res.status(200).json({
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                data: rows
            });
        } catch (error) {
            next(error);
        }
    }

    static async getOneProduct (req, res, next){
        try {
            const id = req.params.id
            const data = await Product.findByPk(id);
            if (!data){
                throw ({name: 'ProductNotFound'})
            }
            await res.status(200).json(data)
        } catch (error) {
            next(error);
        }
    }

    static async addProduct (req, res, next){
        try {
            const {name, description, price, weight, imgUrl, CategoryId} = req.body;
            await Product.create({name, description, price, weight, imgUrl, CategoryId})
            res.status(201).json({message: "New product has been added"})
        } catch (error) {
            next(error);
        }
    }

    static async editProduct (req, res, next){
        try {
            const id = req.params.id;
            const product =  await Product.findByPk(id);
            const {name, description, price, weight, imgUrl, CategoryId}= req.body;
            await product.update({name, description, price, weight, imgUrl, CategoryId});
            res.status(200).json({message: "Product has been successfully edited"})  
        } catch (error) {
            next(error);
        }
    }

    static async deleteProduct (req, res, next){
        try {
            const id = req.params.id;
            const product =  await Product.findByPk(id);
            await product.destroy();
            res.status(200).json({message: "Product has been successfully deleted"})  
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductController