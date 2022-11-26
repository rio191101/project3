'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category);
      Product.hasMany(models.TransactionHistory);
    }
  }

  Product.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'memerlukan data title',
          },
          notEmpty: {
            msg: 'title tidak boleh kosong',
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'memerlukan data price',
          },
          notEmpty: {
            msg: 'price tidak boleh kosong',
          },
          isInt: {
            msg: 'price harus berupa angka integer',
          },
          min: {
            args: [0],
            msg: 'nilai minimal dari price adalah 0',
          },
          max: {
            args: [50000000],
            msg: 'nilai maksimal dari price adalah 50000000',
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'memerlukan data stock',
          },
          notEmpty: {
            msg: 'stock tidak boleh kosong',
          },
          isInt: {
            msg: 'stock harus berupa angka integer',
          },
          min: {
            args: [5],
            msg: 'nilai minimal dari stock adalah 5',
          },
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'memerlukan data CategoryId',
          },
          notEmpty: {
            msg: 'CategoryId tidak boleh kosong',
          },
          isInt: {
            msg: 'CategoryId harus berupa angka integer',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );

  return Product;
};
