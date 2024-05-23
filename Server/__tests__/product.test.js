const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { hashPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

beforeAll(async () => {
    const categories = require('../data/categories.json').map(e => {
        e.createdAt = e.updatedAt = new Date();
        return e;
      });
      await queryInterface.bulkInsert('Categories', categories)

      const products = require('../data/product.json').map(e => {
        e.createdAt = e.updatedAt = new Date();
        return e;
      });
      await queryInterface.bulkInsert('Products', products)

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
const admin_token = signToken({id: 2})

describe('GET /products', () => {
    describe('success get all products', () => {
        test('return an object with status 200', async () => {
            const {body, status} = await request(app)
            .get('/products')
            .set("Authorization", `Bearer ${access_token}`)
            expect(status).toBe(200)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("totalItems", expect.any(Number))
            expect(body).toHaveProperty("totalPages", expect.any(Number))
            expect(body).toHaveProperty("currentPage", expect.any(Number))
            expect(body).toHaveProperty("data", expect.any(Array))
        })
    }),
    describe('failed due to invalid token', () => {
        test('return object with status 401', async () => {
            const {body, status} = await request(app)
            .get('/products')
            .set("Authorization", `Bearer ahihihihi`)
            expect(status).toBe(401)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("message", expect.any(String))
        })
    })
})

describe('GET /products:id', () => {
    describe('success get 1 product by id', () => {
        test('return an object with status 200', async () => {
            const {body, status} = await request(app)
            .get(`/products/${1}`)
            .set("Authorization", `Bearer ${access_token}`)
            expect(status).toBe(200)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("id", expect.any(Number))
            expect(body).toHaveProperty("name", expect.any(String))
            expect(body).toHaveProperty("description", expect.any(String))
            expect(body).toHaveProperty("price", expect.any(Number))
            expect(body).toHaveProperty("weight", expect.any(Number))
            expect(body).toHaveProperty("imgUrl", expect.any(String))
            expect(body).toHaveProperty("CategoryId", expect.any(Number))
            expect(body).toHaveProperty("sizes", expect.any(Array))
            expect(body).toHaveProperty("createdAt", expect.any(String))
            expect(body).toHaveProperty("updatedAt", expect.any(String))
        })
    }),
    describe('failed due to invalid id', () => {
        test('return object with status 404', async () => {
            const {body, status} = await request(app)
            .get(`/products/${100}`)
            .set("Authorization", `Bearer ${access_token}`)
            expect(status).toBe(404)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("message", expect.any(String))
        })
    }),
    describe('failed due to invalid token', () => {
        test('return object with status 401', async () => {
            const {body, status} = await request(app)
            .get(`/products/${1}`)
            .set("Authorization", `Bearer ahihihihi`)
            expect(status).toBe(401)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("message", expect.any(String))
        })
    })
})



afterAll(async () => {
    await queryInterface.bulkDelete('Categories', null, {
        restartIdentity: true,
        cascade: true,
        truncate: true
      })

    await queryInterface.bulkDelete('Products', null, {
        restartIdentity: true,
        cascade: true,
        truncate: true
      })

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