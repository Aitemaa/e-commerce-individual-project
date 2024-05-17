'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fullName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      phoneNumber: {
        allowNull: true,
        type: Sequelize.STRING
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      province: {
        allowNull: true,
        type: Sequelize.STRING
      },
      postalCode: {
        allowNull: true,
        type: Sequelize.STRING
      },
      CityId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Cities',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};