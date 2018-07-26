//orderItem is needed because creating a many to many between cart/order and products does not allow for keeping fixed price and quantity of eachitem
//orderItems will belongTo a cart/ order and also belongTo a product. It will have fields fixedPrice and quantity
//and auto generated fields of cartId and productId


const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  fixedPrice: {
    type: Sequelize.DECIMAL
  },
  quantity: {
    type: Sequelize.INTEGER,

  }
})

module.exports = OrderItem
