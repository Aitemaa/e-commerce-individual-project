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

describe('POST /register', () => {
    describe('success register', () => {
        test('return an object with status 201', async () => {
            const {body, status} = await request(app)
            .post('/register')
            .send({
              email: "testingManja@mail.com",
              password: "rahasia"
            });
            expect(status).toBe(201)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("message", expect.any(String))
        })
    }),
    describe('failed register due to empty Email', () => {
      test('return an object with status 400', async () => {
          const {body, status} = await request(app)
          .post('/register')
          .send({
            password: "rahasia"
          });
          expect(status).toBe(400)
          expect(body).toBeInstanceOf(Object)
          expect(body).toHaveProperty("message", expect.any(String))
      })
  }),
  describe('failed register due to empty Password', () => {
    test('return an object with status 400', async () => {
        const {body, status} = await request(app)
        .post('/register')
        .send({
          email: "wawaw@mail.com"
        });
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", expect.any(String))
    })
}),
  describe('failed register due to registered email already exists', () => {
    test('return an object with status 400', async () => {
        const {body, status} = await request(app)
        .post('/register')
        .send({
          email: "testingManja@mail.com",
          password: "rahasia"
        });
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", expect.any(String))
    })
  }),
  describe('failed register due to invalid email format', () => {
    test('return an object with status 400', async () => {
        const {body, status} = await request(app)
        .post('/register')
        .send({
          email: "testingManja",
          password: "rahasia"
        });
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", expect.any(String))
    })
  })
})


describe('POST /login', () => {
  describe('success login', () => {
      test('return an object with status 200', async () => {
          const {body, status} = await request(app)
          .post('/login')
          .send({
            email: "testingManja@mail.com",
            password: "rahasia"
          });
          expect(status).toBe(200)
          expect(body).toBeInstanceOf(Object)
          expect(body).toHaveProperty("access_token", expect.any(String))
      })
  }),
  describe('failed login due to empty Email', () => {
    test('return an object with status 400', async () => {
        const {body, status} = await request(app)
        .post('/login')
        .send({
          password: "rahasia"
        });
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", expect.any(String))
    })
}),
describe('failed login due to empty Password', () => {
  test('return an object with status 400', async () => {
      const {body, status} = await request(app)
      .post('/login')
      .send({
        email: "wawaw@mail.com"
      });
      expect(status).toBe(400)
      expect(body).toBeInstanceOf(Object)
      expect(body).toHaveProperty("message", expect.any(String))
  })
}),
describe('failed login due to invalid email or pass', () => {
  test('return an object with status 400', async () => {
      const {body, status} = await request(app)
      .post('/login')
      .send({
        email: "testingManja@mail.com",
        password: "rahasiaaa"
      });
      expect(status).toBe(401)
      expect(body).toBeInstanceOf(Object)
      expect(body).toHaveProperty("message", expect.any(String))
  })
})
})

describe('PUT /userDetails', () => {
  describe('success update user details', () => {
      test('return an object with status 200', async () => {
          const {body, status} = await request(app)
          .put('/userDetails')
          .send({
            fullName: "test ini di edit",
            phoneNumber: "0842424242",
            address: "Jalan, jalan apa yang menyenangkan? jalan bersamamu",
            city: "Jayapura",
            province: "Papua",
            postalCode: 99114,
            CityId: 1
          })
          .set("Authorization", `Bearer ${access_token}`)
          expect(status).toBe(200)
          expect(body).toBeInstanceOf(Object)
          expect(body).toHaveProperty("message", expect.any(String))
      })
  })
})

describe('GET /userDetails', () => {
  describe('success get user details', () => {
      test('return an object with status 200', async () => {
          const {body, status} = await request(app)
          .get('/userDetails')
          .set("Authorization", `Bearer ${access_token}`)
          expect(status).toBe(200)
          expect(body).toBeInstanceOf(Object)
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