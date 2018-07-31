const Sequelize = require('sequelize')
const db = require('../db')
const OrderItem = require('./orderItem')
const Product = require('./product')
const User = require('./user')

const Order = db.define('order', {
  status: {
    // type: Sequelize.ENUM('completed', 'processing')
    type: Sequelize.ENUM('completed', 'processing', 'cancelled', 'created', 'cart')
  },
  totalCost: {
    type: Sequelize.DECIMAL,
    defaultValue: 0
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

//this method is invoked when a cart is purchased and turned into an order
//it updates the carts status to
Order.prototype.changeCartToOrder = async function(cartWithOrderItems) {
  //sanity check that this method only runs on carts

  // if (cartWithOrderItems.status ==='cart'){


  cartWithOrderItems.update({status: 'created'})
  const user = await User.findOne({where: {id: cartWithOrderItems.userId}})
  console.log('orderId', cartWithOrderItems.dataValues.id)

  cartWithOrderItems.orderItems.map(async (orderItem) => {
    console.log('orderItemId', orderItem.dataValues.id)
    console.log('productId', orderItem.dataValues.productId)

    const curProduct = await Product.findOne({where: {id: orderItem.dataValues.productId}})
    await curProduct.update({stock: curProduct.stock - orderItem.quantity})
    await orderItem.update({fixedPrice: curProduct.price})
    await this.update({totalCost: this.totalCost + curProduct.price * orderItem.quantity})


  })


  // }

}

// Order.prototype.incrementQuantity = async function(product) {
//   let orderItem = await OrderItem.findOrCreate({where: {orderId: this.id, productId: product.id}})
//   await orderItem.incrementQuantity()
//
// }
//
// Order.prototype.decrementQuantity = async function(product) {
//   let orderItem = await OrderItem.findOrCreate({where: {orderId: this.id, productId: product.id}})
//   await orderItem.decrementQuantity()
//
// }



Order.prototype.customAddProduct = async function(product, amt) {
  //search for an orderItem that is in this order that has the productId of the given product
  let orderItem = await OrderItem.findOrCreate({where: {orderId: this.id, productId: product.id}})

  orderItem = orderItem[0]

  orderItem = await orderItem.update({quantity: amt})
  this.addOrderItem(orderItem).then(() => {
  })


  product.addOrderItem(orderItem).then(() => {
  })


  //if amt is 0 delete the orderItem
  if (!amt) {
    orderItem.destroy().then(() => {
    })
  }


  return orderItem

}

//gets all the order items assoicated with a particular order id
Order.prototype.getOrderItems = async function() {
  const res = await OrderItem.findAll({
    where: {
      orderId: this.id
    },
    include: [Product]
  })
  return res.data
}


module.exports = Order
