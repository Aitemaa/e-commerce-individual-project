'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('../data/product.json').map(e => {
      e.createdAt = e.updatedAt = new Date();
      return e;
    });
    await queryInterface.bulkInsert('Products', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {
      restartIdentity: true,
      cascade: true,
      truncate: true
    })
  }
};
