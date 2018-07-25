const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ARRAY(Sequelize.ENUM('completed', 'processing', 'cancelled', 'created'))
  }
})

module.exports = Order
