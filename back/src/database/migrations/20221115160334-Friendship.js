'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Friendships',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id_1: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'cascade',
        },
        user_id_2: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'cascade',
        },
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Friendships');
  },
};
