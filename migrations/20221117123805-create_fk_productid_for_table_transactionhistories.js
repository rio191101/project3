'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('TransactionHistories', {
      fields: ['ProductId'],
      type: 'foreign key',
      name: 'fk_product',
      references: {
        table: 'Products',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('TransactionHistories', 'fk_product');
  },
};
