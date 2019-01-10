const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  sessionId: {
    type: Sequelize.STRING
    // Does this need a validator?
  }
})

module.exports = Cart
