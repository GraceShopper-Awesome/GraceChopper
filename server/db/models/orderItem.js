const Sequelize = require('sequelize')
const db = require('../db')


const OrderItem = db.define('orderItem', {

  fixed_price: {
    type: Sequelize.DECIMAL,
    allowNull: false

  }


})

module.exports = OrderItem
