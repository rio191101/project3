'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    static associate(models) {
      TransactionHistory.belongsTo(models.Product);
      TransactionHistory.belongsTo(models.User);
    }
  }

  TransactionHistory.init(
    {
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'memerlukan data ProductId',
          },
          notEmpty: {
            msg: 'ProductId tidak boleh kosong',
          },
          isInt: {
            msg: 'ProductId harus berupa angka integer',
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'memerlukan data UserId',
          },
          notEmpty: {
            msg: 'UserId tidak boleh kosong',
          },
          isInt: {
            msg: 'UserId harus berupa angka integer',
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'memerlukan data quantity',
          },
          notEmpty: {
            msg: 'quantity tidak boleh kosong',
          },
          isInt: {
            msg: 'quantity harus berupa angka integer',
          },
        },
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'memerlukan data total_price',
          },
          notEmpty: {
            msg: 'total_price tidak boleh kosong',
          },
          isInt: {
            msg: 'total_price harus berupa angka integer',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'TransactionHistory',
    }
  );

  return TransactionHistory;
};
