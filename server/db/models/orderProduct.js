const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderproduct', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = OrderProduct
