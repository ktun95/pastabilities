const Sequelize = require('sequelize')
const db = require('../db')

const CartProduct = db.define('cartproduct', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = CartProduct
