const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { hashPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

beforeAll(async () => {
    const cities =  [
        {
            id: 1,
            province: "Nanggroe Aceh Darussalam (NAD)",
            type: "Kabupaten",
            cityName: "Aceh Barat",
            createdAt: "2024-05-17T05:28:13.265Z",
            updatedAt: "2024-05-17T05:28:13.265Z"
        }
    ]
    await queryInterface.bulkInsert('Cities', cities)

    const users = require('../data/user.json').map(e => {
        e.createdAt = e.updatedAt = new Date();
        e.password = hashPassword(e.password);
        e.CityId = 1;
        return e;
      });
      await queryInterface.bulkInsert('Users', users)
})


const access_token = signToken({id: 1})

describe('GET /cities', () => {
    describe('success get all products', () => {
        test('return an object with status 200', async () => {
            const {body, status} = await request(app)
            .get('/cities')
            .set("Authorization", `Bearer ${access_token}`)
            expect(status).toBe(200)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("cities", expect.any(Array))
            expect(body.cities[0]).toHaveProperty("id", expect.any(Number))
            expect(body.cities[0]).toHaveProperty("province", expect.any(String))
            expect(body.cities[0]).toHaveProperty("type", expect.any(String))
            expect(body.cities[0]).toHaveProperty("cityName", expect.any(String))
            expect(body.cities[0]).toHaveProperty("createdAt", expect.any(String))
            expect(body.cities[0]).toHaveProperty("updatedAt", expect.any(String))
        })
    })
})

afterAll(async () => {

    await queryInterface.bulkDelete('Cities', null, {
        restartIdentity: true,
        cascade: true,
        truncate: true
      })

    await queryInterface.bulkDelete('Users', null, {
        restartIdentity: true,
        cascade: true,
        truncate: true
      })
})