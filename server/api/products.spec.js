/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const User = db.model('user')
const superRequest = require('superagent')
const auth = require('../auth')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/products/', () => {
    beforeEach(() => {
      const threeProducts = [
        {
          id: 1,
          name: 'Ravioli',
          description: 'The best in the city!',
          quantity: 10,
          image: '/imageUrl',
          type: 'semolina',
          shape: 'shaped',
          price: 995
        },
        {
          id: 2,
          name: 'Linguini',
          description: 'The best in the city!',
          quantity: 7,
          image: '/imageUrl',
          type: 'gluten-free',
          shape: 'long',
          price: 995
        },
        {
          id: 3,
          name: 'Cavatelli',
          description: 'The best in the city!',
          quantity: 5,
          image: '/imageUrl',
          type: 'whole-wheat',
          shape: 'long',
          price: 1995
        }
      ]

      return Product.bulkCreate(threeProducts)
    })

    const newProduct = {
      id: 4,
      name: 'Fideus',
      description: 'The best in the BCN!',
      quantity: 5,
      image: '/imageUrl',
      type: 'semolina',
      shape: 'long',
      price: 1245
    }
    const thisAdmin = {
      email: 'admin@admin.com',
      password: '123',
      firstName: 'This',
      lastName: 'User',
      isAdmin: true
    }

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Ravioli')
      expect(res.body[1].name).to.be.equal('Linguini')
      expect(res.body[2].name).to.be.equal('Cavatelli')
    })

    it('POST /api/products non admin gets error', async () => {
      const res = await request(app)
        .post('/api/products', newProduct)
        .expect(403)
    })

    beforeEach(() => {
      return User.create(thisAdmin)
    })

    // it('POST /api/products logged in admin', async () => {
    //   let user1 = superRequest.agent()
    //   user1
    //     .post('/auth/login')
    //     .send({email: thisAdmin.email, password: thisAdmin.password})
    //     .end(async function(err, res) {
    //       // user1 will manage its own cookies
    //       // res.redirects contains an Array of redirects
    //       await res(app)
    //         .post('/api/products', newProduct)
    //         .expect(201)
    //     })

    // const res = await res(app)
    //   .post('/api/products', newProduct)
    //   .expect(201)

    // expect(res.body).to.be.an('object')
    // expect(res.body).to.deep.equal(newProduct)
    // })

    //localhost:
  }) // end describe('/api/products')
}) // end describe('User routes')
