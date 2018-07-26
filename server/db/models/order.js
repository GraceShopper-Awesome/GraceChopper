const Sequelize = require('sequelize')
const db = require('../db')
const OrderItem = require('./orderItem')
const Product = require('./product')

const Order = db.define('order', {
  status: {
    // type: Sequelize.ENUM('completed', 'processing')
    type: Sequelize.ENUM('completed', 'processing', 'cancelled', 'created', 'cart')
  }
})

// Order.prototype.getCartPrice = function(){
//   find
//
// }
//
// Order.prototype.getOrderPrice = function(){
//
// }


Order.prototype.customAddProduct = async function(product, amt) {
  //search for an orderItem that is in this order that has the productId of the given product
  let orderItem = await OrderItem.findOrCreate({where: {orderId: this.id, productId: product.id}})

  orderItem= orderItem[0]

  orderItem = await orderItem.update({quantity: amt})
  this.addOrderItem(orderItem).then(() => {
  })


  product.addOrderItem(orderItem).then(() => {
  })


  //if amt is 0 delete the orderItem
  if (!amt) {
    orderItem.destroy().then(()=>{})
  }


  return orderItem

}


module.exports = Order
