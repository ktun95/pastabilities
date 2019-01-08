const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  streetLine1: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  streetLine2: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [5, 9]
    }
  }
})

module.exports = Address
