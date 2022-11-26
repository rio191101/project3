const { TransactionHistory, Product, User, Category } = require('../models/index');
const { toRupiah } = require('../helpers/currencyHelper');

const TransactionHistoryController = {
  create: async (req, res, next) => {
    try {
      const user = req.user;
      const { productId, quantity } = req.body;

      const data = await Product.findOne({
        where: { id: productId },
      });

      const customer = await User.findOne({
        where: { id: user.id },
      });

      if (!data) {
        return res.status(404).json({ message: 'product does not exist' });
      }

      if (data.dataValues.stock < quantity) {
        return res.status(400).json({
          quantity,
          stock: data.dataValues.stock,
          message: `Stok tidak cukup untuk memproses pembelian anda`,
        });
      }

      const total_price = quantity * data.dataValues.price;
      if (customer.balance < total_price) {
        return res.status(400).json({
          harga_barang: toRupiah(data.dataValues.price),
          total_price: toRupiah(total_price),
          balance: toRupiah(customer.balance),
          message: 'Saldo tidak mencukupi untuk melakukan transaksi',
        });
      }

      await Product.update(
        {
          stock: data.dataValues.stock - quantity,
        },
        {
          where: { id: productId },
        }
      );

      await User.update(
        {
          balance: customer.dataValues.balance - total_price,
        },
        {
          where: {
            id: user.id,
          },
          hooks: false,
        }
      );

      const sold_product_amount = await Category.findOne({ where: { id: data.dataValues.CategoryId } });
      await Category.update(
        {
          sold_product_amount: sold_product_amount.sold_product_amount + quantity,
        },
        {
          where: {
            id: data.dataValues.CategoryId,
          },
          hooks: false,
        }
      );

      await TransactionHistory.create({
        ProductId: productId,
        UserId: user.id,
        quantity: quantity,
        total_price: total_price,
      });
      res.status(201).json({
        message: 'You have successfully purchase the product',
        transactionBill: {
          total_price: toRupiah(total_price),
          quantity: quantity,
          product_name: data.dataValues.title,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  getUser: async (req, res, next) => {
    try {
      const user = req.user;
      if (user.role == 'customer') {
        const transaction = await TransactionHistory.findAll({
          attributes: ['ProductId', 'UserId', 'quantity', 'total_price', 'createdAt', 'updatedAt'],
          include: [
            {
              model: Product,
              attributes: ['id', 'title', 'price', 'stock', 'CategoryId'],
            },
          ],
          where: { UserId: user.id },
        });

        transaction.filter((column) => {
          column.dataValues.total_price = toRupiah(column.dataValues.total_price);
          column.dataValues.Product.price = toRupiah(column.dataValues.Product.price);
        });

        res.status(200).json({
          transactionHistories: transaction,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  getAdmin: async (req, res, next) => {
    try {
      const userAdmin = req.user;
      if (userAdmin.role == 'admin') {
        const transaction = await TransactionHistory.findAll({
          attributes: ['ProductId', 'UserId', 'quantity', 'total_price', 'createdAt', 'updatedAt'],
          include: [
            {
              model: Product,
              attributes: ['id', 'title', 'price', 'stock', 'CategoryId'],
            },
            {
              model: User,
              attributes: ['id', 'email', 'balance', 'gender', 'role'],
            },
          ],
        });

        transaction.filter((column) => {
          column.dataValues.total_price = toRupiah(column.dataValues.total_price);
          column.dataValues.Product.price = toRupiah(column.dataValues.Product.price);
          column.dataValues.User.balance = toRupiah(column.dataValues.User.balance);
        });
        res.status(200).json({
          transactionHistories: transaction,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const user = req.user;
      const { transactionId } = req.params;
      if (user.role == 'customer') {
        // get by id only data transaction users
        const transaction = await TransactionHistory.findOne({
          attributes: ['ProductId', 'UserId', 'quantity', 'total_price', 'createdAt', 'updatedAt'],
          include: [
            {
              model: Product,
              attributes: ['id', 'title', 'price', 'stock', 'CategoryId'],
            },
          ],
          where: { id: transactionId, UserId: user.id },
        });

        if (!transaction) {
          return res.status(404).json({
            message: 'Transaction not found',
          });
        }

        transaction.dataValues.total_price = toRupiah(transaction.dataValues.total_price);
        transaction.dataValues.Product.price = toRupiah(transaction.dataValues.Product.price);
        res.status(200).json(transaction);
      } else {
        // Admin can get data by id on all users
        const transaction = await TransactionHistory.findOne({
          attributes: ['ProductId', 'UserId', 'quantity', 'total_price', 'createdAt', 'updatedAt'],
          include: [
            {
              model: Product,
              attributes: ['id', 'title', 'price', 'stock', 'CategoryId'],
            },
          ],
          where: { id: transactionId },
        });

        if (!transaction) {
          return res.status(404).json({
            message: 'Transaction not found',
          });
        }

        transaction.dataValues.total_price = toRupiah(transaction.dataValues.total_price);
        transaction.dataValues.Product.price = toRupiah(transaction.dataValues.Product.price);
        res.status(200).json(transaction);
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = TransactionHistoryController;
