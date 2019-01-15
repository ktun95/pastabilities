const router = require('express').Router()
const {Product, Review} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

//get all products from 'Product' Table
router.get('/products', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [Review]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})
