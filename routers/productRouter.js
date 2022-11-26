const productRouter = require('express').Router();
const ProductController = require('../controllers/ProductController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');

productRouter.post('/', auth, adminOnly, ProductController.create);
productRouter.get('/', auth, adminOnly, ProductController.getAll);
productRouter.get('/:productId', auth, adminOnly, ProductController.getById);
productRouter.put('/:productId', auth, adminOnly, ProductController.update);
productRouter.patch('/:productId', auth, adminOnly, ProductController.patch);
productRouter.delete('/:productId', auth, adminOnly, ProductController.delete);

module.exports = productRouter;
