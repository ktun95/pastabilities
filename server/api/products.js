const router = require('express').Router()
const {Product, Review} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

//get all products from 'Product' Table
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//get single product by id
router.get('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id
    const singleProduct = await Product.findOne({
      where: {
        id: productId
      },
      include: [Review]
    })

    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})

//get products by search - NOTE: we can't easily search by type or shape in Sequelize while those columns are ENUMs, so they are ignored

router.get('/search/:string', async (req, res, next) => {
  try {
    const searchStr = req.params.string
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${searchStr}%`
            }
          },
          {
            description: {
              [Op.iLike]: `%${searchStr}%`
            }
          }
        ]
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//authenticate
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.sendStatus(403)
  } else {
    next()
  }
}

//create new product in database
router.post('/', async (req, res, next) => {
  const {name, description, price, quantity, image, type, shape} = req.body

  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      quantity,
      image,
      type,
      shape
    })
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

//update existing product in database
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const productId = req.params.id
    Product.update(req.body, {where: {id: productId}})
    const updatedProduct = await Product.findById(productId)
    res.json(updatedProduct.dataValues)
  } catch (err) {
    next(err)
  }
})

//delete product in database
router.delete('/:id', (req, res, next) => {
  try {
    const productId = req.params.id
    Product.destroy({
      where: {
        id: productId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
