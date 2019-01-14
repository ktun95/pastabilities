const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['completed', 'canceled', 'processing']
  },
  orderDate: {
    type: Sequelize.DATE,
    validate: {
      isDate: true
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
})

module.exports = Order
