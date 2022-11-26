const usersRouter = require('express').Router();
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');

usersRouter.post('/register', UserController.register);
usersRouter.post('/login', UserController.login);
usersRouter.put('/', auth, UserController.update);
usersRouter.delete('/', auth, UserController.delete);
usersRouter.patch('/topup', auth, UserController.topup);

module.exports = usersRouter;
