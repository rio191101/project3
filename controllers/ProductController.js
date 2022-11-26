const { Product } = require('../models/index');
const { toRupiah } = require('../helpers/currencyHelper');

const ProductController = {
  create: async (req, res, next) => {
    try {
      const { title, price, stock, CategoryId } = req.body;

      const product = await Product.create({
        title,
        price,
        stock,
        CategoryId,
      });

      const rupiah = toRupiah(product.price);
      res.status(201).json({
        product: {
          id: product.id,
          title: product.title,
          price: rupiah,
          stock: product.stock,
          CategoryId: product.CategoryId,
          updatedAt: product.updatedAt,
          createdAt: product.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const products = await Product.findAll();
      products.filter((column) => (column.dataValues.price = toRupiah(column.dataValues.price)));
      res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await Product.findOne({
        where: { id: productId },
      });

      if (!product) {
        return res.status(404).json({ message: 'Product Not Found' });
      }

      const rupiah = toRupiah(product.dataValues.price);
      res.status(201).json({
        product: {
          id: product.id,
          title: product.title,
          price: rupiah,
          stock: product.stock,
          CategoryId: product.CategoryId,
          updatedAt: product.updatedAt,
          createdAt: product.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { price, stock, title } = req.body;

      const findProduct = await Product.findOne({
        where: { id: productId },
      });

      if (!findProduct) {
        return res.status(404).json({ message: 'Product Not Found' });
      }

      const product = (
        await Product.update(
          { price, stock, title },
          {
            where: { id: productId },
            returning: true,
          }
        )
      )[1][0];

      const rupiah = toRupiah(product.dataValues.price);
      res.status(201).json({
        product: {
          id: product.id,
          title: product.title,
          price: rupiah,
          stock: product.stock,
          CategoryId: product.CategoryId,
          updatedAt: product.updatedAt,
          createdAt: product.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  patch: async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { CategoryId } = req.body;
      if (!CategoryId) {
        return res.status(400).json({ message: 'Membutuhkan CategoryId untuk patch data product' });
      }

      const findProduct = await Product.findOne({
        where: { id: productId },
      });

      if (!findProduct) {
        return res.status(404).json({ message: 'Product Not Found' });
      }

      const product = (await Product.update({ CategoryId }, { where: { id: productId }, returning: true }))[1][0];
      const rupiah = toRupiah(product.dataValues.price);
      res.status(201).json({
        product: {
          id: product.id,
          title: product.title,
          price: rupiah,
          stock: product.stock,
          CategoryId: product.CategoryId,
          updatedAt: product.updatedAt,
          createdAt: product.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { productId } = req.params;

      const findProduct = await Product.findOne({
        where: { id: productId },
      });

      if (!findProduct) {
        return res.status(404).json({ message: 'Product Not Found' });
      }

      await Product.destroy({
        where: { id: productId },
      });

      res.status(200).json({ message: 'Product has been successfully deleted' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ProductController;
