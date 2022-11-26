const categoryRouter = require('express').Router();
const CategoryController = require('../controllers/CategoryController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');

categoryRouter.post('/', auth, adminOnly, CategoryController.create);
categoryRouter.get('/', auth, adminOnly, CategoryController.findAll);
categoryRouter.patch(
  '/:categoryId',
  auth,
  adminOnly,
  CategoryController.update
);
categoryRouter.delete(
  '/:categoryId',
  auth,
  adminOnly,
  CategoryController.delete
);

module.exports = categoryRouter;
