const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//get all products from 'Product' Table
router.get('/', async (req, res, next) => {
  try {
    console.log('products route!!')
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//get products based on search terms
router.get('/search/:terms', (req, res, next) => {
  const searchTerms = req.params.terms.split(' ')
  res.json(searchTerms)
  try {
    const products = Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})
