const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  rating: {
    type: Sequelize.DECIMAL(10, 1),

    validate: {
      min: 0,
      max: 5
    }
  },
  comment: {
    type: Sequelize.TEXT
  }
})

module.exports = Review
