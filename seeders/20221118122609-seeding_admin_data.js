'use strict';

const bcryptHelper = require('../helpers/bcryptHelper');

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = 'admin123';
    const hashedPassword = bcryptHelper.hashPassword(password);
    const date = new Date();
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          full_name: 'admin',
          email: 'admin@tokobelanja.com',
          password: hashedPassword,
          gender: 'male',
          role: 'admin',
          balance: 0,
          createdAt: date,
          updatedAt: date,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { role: 'admin' }, {});
  },
};
