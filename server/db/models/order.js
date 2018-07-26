const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    // type: Sequelize.ENUM('completed', 'processing')
    type: Sequelize.ENUM('completed', 'processing', 'cancelled', 'created', 'cart')
  }
})

module.exports = Order
