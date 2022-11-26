'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('TransactionHistories', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fk_user',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('TransactionHistories', 'fk_user');
  },
};
