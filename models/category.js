'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product);
    }
  }

  Category.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'memerlukan data type',
          },
          notEmpty: {
            msg: 'type tidak boleh kosong',
          },
        },
      },
      sold_product_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'memerlukan data sold_product_amount',
          },
          notEmpty: {
            msg: 'sold_product_amount tidak boleh kosong',
          },
          isInt: {
            msg: 'sold_product_amount harus berupa angka integer',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Category',
      hooks: {
        beforeValidate: (category, options) => {
          category.sold_product_amount = 0;
        },
      },
    }
  );

  return Category;
};
