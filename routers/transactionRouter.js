const transactionRouter = require('express').Router();
const transactionHistoryController = require('../controllers/TransactionHistoryController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');

transactionRouter.post('/', auth, transactionHistoryController.create);
transactionRouter.get('/user', auth, transactionHistoryController.getUser);
transactionRouter.get('/admin', auth, adminOnly, transactionHistoryController.getAdmin);
transactionRouter.get('/:transactionId', auth, transactionHistoryController.getById);

module.exports = transactionRouter;
