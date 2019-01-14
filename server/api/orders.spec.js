/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Order = db.model('order')
const User = db.model('user')
const superRequest = require('superagent')
const auth = require('../auth')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/orders/', () => {
    beforeEach(() => {
      const twoUsers = [
        {
          id: 1,
          email: 'test@test.com'
        },
        {
          id: 2,
          email: 'cody@puppybook.com'
        }
      ]
      User.bulkCreate(twoUsers)
      const threeOrders = [
        {
          id: 1,
          status: 'completed',
          orderDate: new Date(),
          email: 'test@test.com',
          userId: 1
        },
        {
          id: 2,
          status: 'canceled',
          orderDate: new Date(),
          email: 'cody@puppybook.com',
          userId: 2
        },
        {
          id: 3,
          status: 'processing',
          orderDate: new Date(),
          email: 'cody@puppybook.com',
          userId: 2
        }
      ]

      return Order.bulkCreate(threeOrders)
    })

    it('GET /api/orders', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].status).to.be.equal('completed')
      expect(res.body[1].email).to.be.equal('cody@puppybook.com')
      expect(res.body[2].userId).to.be.equal(2)
    })
  })

  describe('PUT /api/orders/:id', async () => {
    beforeEach(() => {
      const threeOrders = [
        {
          id: 1,
          status: 'completed',
          orderDate: new Date(),
          email: 'test@test.com',
          userId: 1
        },
        {
          id: 2,
          status: 'canceled',
          orderDate: new Date(),
          email: 'cody@puppybook.com',
          userId: 2
        },
        {
          id: 3,
          status: 'processing',
          orderDate: new Date(),
          email: 'cody@puppybook.com',
          userId: 2
        }
      ]

      return Order.bulkCreate(threeOrders)
    })
    const order1 = await request(app).get(`/api/orders/{id}`)

    const updatedOrder1 = await request(app).put()
  })
})

it('PUT /api/orders/:id is successful if user is an admin', async () => {})
