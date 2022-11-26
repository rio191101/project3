const bcryptHelper = require('../helpers/bcryptHelper');
const jwtHelper = require('../helpers/jwtHelper');
const currencyHelper = require('../helpers/currencyHelper');
const { User } = require('../models');

const UserController = {
  register: async (req, res, next) => {
    try {
      const { full_name, password, gender, email } = req.body;
      const createdUser = await User.create({
        full_name,
        password,
        gender,
        email,
        role: 'customer',
      });
      res.status(201).json({
        user: {
          id: createdUser.id,
          full_name: createdUser.full_name,
          email: createdUser.email,
          gender: createdUser.gender,
          balance: currencyHelper.toRupiah(createdUser.balance),
          createdAt: createdUser.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ message: 'login memerlukan email' });
      }
      if (!password) {
        return res.status(400).json({ message: 'login memerlukan password' });
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Email tidak terdaftar' });
      }
      if (!bcryptHelper.comparePassword(password, user.password)) {
        return res.status(400).json({ message: 'Password anda salah' });
      }
      const token = jwtHelper.sign({ id: user.id, role: user.role });
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { full_name, email } = req.body;
      if (!full_name & !email) {
        return res.status(200).json({ message: 'Tidak ada data yang diubah' });
      }
      const updatedUser = (
        await User.update(
          { full_name, email },
          {
            where: { id },
            hooks: false,
            returning: ['id', 'full_name', 'email', 'createdAt', 'updatedAt'],
          }
        )
      )[1][0].dataValues;
      res.status(200).json({
        user: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.user;
      await User.destroy({ where: { id } });
      res
        .status(200)
        .json({ message: 'Your account has been successfully deleted' });
    } catch (error) {
      next(error);
    }
  },

  topup: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { balance } = req.body;
      if (!balance) {
        return res.status(400).json({ message: 'membutuhkan data balance' });
      }
      if (typeof balance !== 'number') {
        return res.status(400).json({ message: 'balance harus berupa angka' });
      }
      if (parseInt(balance) !== balance) {
        return res.status(400).json({ message: 'balance harus integer' });
      }
      const currentBalance = (
        await User.findOne({ where: { id }, attributes: ['balance'] })
      ).balance;
      const updatedBalance = (
        await User.update(
          { balance: currentBalance + balance },
          { where: { id }, hooks: false, returning: ['balance'] }
        )
      )[1][0].dataValues.balance;
      res.status(200).json({
        message: `Your balance has been successfully updated to ${currencyHelper.toRupiah(
          updatedBalance
        )}`,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = UserController;
