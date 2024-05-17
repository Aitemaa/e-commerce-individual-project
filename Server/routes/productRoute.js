const ProductController = require('../controllers/productController');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');

const router = require('express').Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getOneProduct);
router.use(authorizationMiddleware);
router.post('/', ProductController.addProduct);
router.put('/:id', ProductController.editProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;