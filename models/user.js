'use strict';
const { Model } = require('sequelize');
const bcryptHelper = require('../helpers/bcryptHelper');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.TransactionHistory);
    }
  }

  User.init(
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'memerlukan data full_name',
          },
          notEmpty: {
            msg: 'full_name tidak boleh kosong',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'email telah terdaftar',
        },
        validate: {
          notNull: {
            msg: 'memerlukan data email',
          },
          notEmpty: {
            msg: 'email tidak boleh kosong',
          },
          isEmail: {
            msg: 'format email tidak valid',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'memerlukan data password',
          },
          notEmpty: {
            msg: 'password tidak boleh kosong',
          },
          len: {
            args: [6, 10],
            msg: 'password harus terdiri 6 hingga 10 karakter'
          }
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'memerlukan data gender',
          },
          notEmpty: {
            msg: 'gender tidak boleh kosong',
          },
          isIn: {
            args: [['male', 'female']],
            msg: 'gender harus bernilai male/female',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'memerlukan data role',
          },
          notEmpty: {
            msg: 'role tidak boleh kosong',
          },
          isIn: {
            args: [['admin', 'customer']],
            msg: 'role harus bernilai admin/customer',
          },
        },
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'memerlukan data balance',
          },
          notEmpty: {
            msg: 'balance tidak boleh kosong',
          },
          min: {
            args: [0],
            msg: 'nilai minimal untuk balance adalah 0',
          },
          max: {
            args: [100000000],
            msg: 'nilai maksimal untuk balance adalah 100000000',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeValidate: (user, options) => {
          user.balance = 0;
        },
        beforeCreate: (user, options) => {
          user.password = bcryptHelper.hashPassword(user.password);
        },
      },
    }
  );

  return User;
};
