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

const UserId = 1
const access_token = signToken({id: UserId})

describe('POST /orders/addToCart/:productId', () => {
    describe('success add product to order with status onCart', () => {
        test('return object with status 201', async () => {
            const {body, status} = await request(app)
            .post(`/orders/addToCart/${1}`)
            .set("Authorization", `Bearer ${access_token}`)
            .send({size: "L"})
            expect(status).toBe(201)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("message", expect.any(String))
        })
    }),
    describe('failed due to no size', () => {
        test('return object with status 400', async () => {
            const {body, status} = await request(app)
            .post(`/orders/addToCart/${1}`)
            .set("Authorization", `Bearer ${access_token}`)
            expect(status).toBe(400)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("message", expect.any(String))
        })
    }),
    describe('failed due to invalid token', () => {
        test('return object with status 401', async () => {
            const {body, status} = await request(app)
            .post(`/orders/addToCart/${1}`)
            .set("Authorization", `Bearer ahihihihi`)
            expect(status).toBe(401)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("message", expect.any(String))
        })
    })
})

describe('GET /orders', () => {
    describe('success get all orders with status onCart', () => {
        test('return an object with staus 200', async () => {
            const {body, status} = await request(app)
            .get('/orders?filter=onCart')
            .set("Authorization", `Bearer ${access_token}`)
            expect(status).toBe(200)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("id", expect.any(Number))
            expect(body).toHaveProperty("status", expect.any(String))
            expect(body).toHaveProperty("totalPaid")
            expect(body).toHaveProperty("UserId", expect.any(Number))
            expect(body).toHaveProperty("createdAt", expect.any(String))
            expect(body).toHaveProperty("updatedAt", expect.any(String))
            expect(body).toHaveProperty("OrderDetails")
        })
    }),
    describe('failed due to invalid token', () => {
        test('return object with status 401', async () => {
            const {body, status} = await request(app)
            .get('/orders?filter=onCart')
            .set("Authorization", `Bearer ahihihihi`)
            expect(status).toBe(401)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("message", expect.any(String))
        })
    })
})

describe('PATCH /orders/:orderDetailsId', () => {
    describe('success update order size on Cart', () => {
        test('return an object with status 200', async () => {
            const {body, status} = await request(app)
            .patch(`/orders/${1}`)
            .send({size: "L"})
            .set("Authorization", `Bearer ${access_token}`)
            expect(status).toBe(200)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("message", expect.any(String))
        })
    }),
    describe('failed due to no order found', () => {
        test('return an object with status 404', async () => {
            const {body, status} = await request(app)
            .patch(`/orders/${100}`)
            .send({size: "L"})
            .set("Authorization", `Bearer ${access_token}`)
            expect(status).toBe(404)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("message", expect.any(String))
        })
    }),
    describe('failed due to invalid token', () => {
        test('return object with status 401', async () => {
            const {body, status} = await request(app)
            .patch(`/orders/${1}`)
            .send({size: "L"})
            .set("Authorization", `Bearer hahihahi`)
            expect(status).toBe(401)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("message", expect.any(String))
        })
    })
})

describe('DELETE /orders/:orderDetailsId', () => {
    describe('success delete order on Cart', () => {
        test('return an object with status 200', async () => {
            const {body, status} = await request(app)
            .delete(`/orders/${1}`)
            .set("Authorization", `Bearer ${access_token}`)
            expect(status).toBe(200)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("message", expect.any(String))
        })
    }),
    describe('failed due to no order found', () => {
        test('return an object with status 404', async () => {
            const {body, status} = await request(app)
            .delete(`/orders/${100}`)
            .set("Authorization", `Bearer ${access_token}`)
            expect(status).toBe(404)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("message", expect.any(String))
        })
    }),
    describe('failed due to invalid token', () => {
        test('return object with status 401', async () => {
            const {body, status} = await request(app)
            .delete(`/orders/${1}`)
            .set("Authorization", `Bearer hahihahi`)
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