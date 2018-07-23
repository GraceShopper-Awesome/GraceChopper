const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('fulfilled', 'pending')
  }
})

module.exports = Order
