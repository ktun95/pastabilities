const router = require('express').Router()
const {Product, Review} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

//get all shapes from 'Product' Table
router.get('/products/categories/shapes', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['shape'],
      group: ['shape']
    })
    const shapeArr = products.map(item => item.shape)
    res.json(shapeArr)
  } catch (err) {
    next(err)
  }
})

//get all types from 'Product' Table
router.get('/products/categories/types', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['type'],
      group: ['type']
    })
    const typeArr = products.map(item => item.type)
    res.json(typeArr)
  } catch (err) {
    next(err)
  }
})
