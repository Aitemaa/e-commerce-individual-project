'use strict';
require('dotenv').config();
const axios = require('axios');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      const {data} = await axios({
        method: 'get',
        url: 'https://api.rajaongkir.com/starter/city',
        headers: {key: process.env.RAJAONGKIR_API}
      }); 
      const updatedData  = data.rajaongkir.results.map(e => {
          e.id = e.city_id;
          e.cityName = e.city_name;
          e.createdAt = e.updatedAt = new Date();
          delete e.city_id;
          delete e.city_name;
          delete e.postal_code;
          delete e.province_id;
          return e
      });
      await queryInterface.bulkInsert('Cities', updatedData)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null, {
      restartIdentity: true,
      cascade: true,
      truncate: true
    })
  }
};


