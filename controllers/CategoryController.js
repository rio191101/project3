const { Category, Product } = require('../models');

const CategoryController = {
  create: async (req, res, next) => {
    try {
      const { type } = req.body;
      const createCategory = await Category.create({
        type,
      });
      res.status(201).json({
        category: {
          id: createCategory.id,
          type: createCategory.type,
          updatedAt: createCategory.updatedAt,
          createdAt: createCategory.createdAt,
          sold_product_amount: createCategory.sold_product_amount,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  findAll: async (req, res, next) => {
    try {
      const categories = await Category.findAll({
        include: [
          {
            model: Product,
          },
        ],
      });
      res.status(200).json({ categories });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const { type } = req.body;
      if (!type) {
        return res.status(400).json({ message: 'Tidak ada data yang diubah' });
      }

      const findCategory = await Category.findOne({
        where: { id: categoryId },
      });
      if (!findCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      const updateCategory = await Category.update(
        { type },
        {
          where: { id: categoryId },

          returning: true,
        }
      );
      if (updateCategory[0] === 0) {
        res.status(400).json({
          message: 'No Category Updated',
        });
      } else {
        res.status(200).json({
          category: updateCategory[1][0],
        });
      }
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const findCategory = await Category.findOne({
        where: { id: categoryId },
      });

      if (!findCategory) {
        return res.status(404).json({ message: 'Category Not Found' });
      }
      await Category.destroy({ where: { id: categoryId } });
      res
        .status(200)
        .json({ message: 'Category has been successfully deleted' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = CategoryController;
