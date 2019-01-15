const router = require('express').Router()
const {Order, orderProduct, Product} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

//authenticate admin
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.sendStatus(403)
  } else {
    next()
  }
}

//authenticate user
const isUser = (req, res, next) => {
  if (!req.user) {
    return res.sendStatus(403)
  } else {
    next()
  }
}

//get all orders from 'Order' Table -- eager load products
//admin only
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [Product],
      order: [['id', 'ASC']]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//get single order by orderId -- eager load products
// admin or user
router.get('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const singleOrder = await Order.findOne({
      where: {
        id: orderId
      },
      include: [{model: Product}]
    })
    res.json(singleOrder)
  } catch (err) {
    next(err)
  }
})

//get all orders for a single user -- eager load products
router.get('/orderHistory/:userId', async (req, res, next) => {
  const userId = req.params.userId
  try {
    const orders = await Order.findAll({
      where: {
        userId: userId
      },
      include: [{model: Product}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// PUT Update Order Status -- admin only
//add back is admin
router.put('/:id', async (req, res, next) => {
  try {
    const orderId = +req.params.id
    const {status} = req.body
    let isUpdated
    isUpdated = await Order.update(
      {status},
      {
        where: {
          id: orderId
        }
      }
    )
    res.json(isUpdated)
  } catch (err) {
    next(err)
  }
})

// POST Create Order
// add admin or user back
router.post('/checkout', async (req, res, next) => {
  // const userId = req.user.id
  console.log('req.body', req.body)
  const {
    email,
    status,
    userId,
    cart,
    streetLine1,
    city,
    state,
    zipCode
  } = req.body

  //from the cart we'll get
  //cart is an array of products
  //quantity
  //productID
  //price
  //check admin or user here
  //destructure the array then bulk create
  // if (isAdmin || req.user.id === userId) {
  try {
    const instance = await Order.create({
      status,
      email,
      orderDate: new Date(),
      userId,
      streetLine1,
      city,
      state,
      zipCode
    })
    console.log('instance', instance)
    res.json(instance)
  } catch (err) {
    next(err)
  }
})
