const UserController = require('../controllers/userController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

const router = require('express').Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/googleLogin', UserController.googleLogin);
router.use(authenticationMiddleware);
router.get('/userDetails', UserController.getUserDetails)
router.put('/userDetails', UserController.updateUserDetails)

module.exports = router