const Sequelize = require('sequelize')
const db = require('../db')


const review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    validate: {
      len: [50, 5000]
    },

    allowNull: false
  }

})

module.exports = review
