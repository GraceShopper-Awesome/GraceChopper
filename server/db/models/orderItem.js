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
    defaultValue: 1

  }
})

OrderItem.prototype.incrementQuantity = async function() {
  await this.update({quantity: this.quantity + 1})
}

OrderItem.prototype.decrementQuantity = async function() {
  if(this.quantity > 1){
  await this.update({quantity: this.quantity - 1})
  }
}


OrderItem.prototype.changeQuantity = function(amt) {
  this.quantity = amt

}

OrderItem.prototype.changeFixedPrice = function(amt) {
  this.fixedPrice = amt

}

module.exports = OrderItem
