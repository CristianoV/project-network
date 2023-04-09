'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Partners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        allowNull: false,
        onDelete: 'cascade',
      },
      group_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Groups', key: 'id' },
        allowNull: false,
        onDelete: 'cascade',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Partners');
  },
};
