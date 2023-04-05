'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        bio: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        profile_picture: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        timestamps: false,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};