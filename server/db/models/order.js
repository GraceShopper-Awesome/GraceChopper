const Sequelize = require('sequelize')
const db = require('../db')
const OrderItem = require('./orderItem')
const Product = require('./product')
const User = require('./user')

const Order = db.define('order', {
  status: {
    // type: Sequelize.ENUM('completed', 'processing')
    type: Sequelize.ENUM(
      'completed',
      'processing',
      'cancelled',
      'created',
      'cart'
    )
  },
  totalCost: {
    type: Sequelize.DECIMAL,
    defaultValue: 0
  }
})

//this method is invoked when a cart is purchased and turned into an order
//it updates the carts status to
Order.prototype.changeCartToOrder = async function() {
  try {
    //sanity check that this method only runs on carts
    this.update({status: 'created'})
    const user = await User.findOne({where: {id: this.userId}})
    //user references user that has that order
    await user.addOrder(await Order.create({status: 'cart'}))

    this.orderItems.map(async orderItem => {
      const curProduct = await Product.findOne({
        where: {id: orderItem.dataValues.productId}
      })
      await curProduct.update({stock: curProduct.stock - orderItem.quantity})
      await orderItem.update({fixedPrice: curProduct.price})
      await this.update({
        totalCost: this.totalCost + curProduct.price * orderItem.quantity
      })
    })
  } catch (err) {
    console.error(err)
  }
}

Order.prototype.customAddProduct = async function(product, amt) {
  try {
    //search for an orderItem that is in this order that has the productId of the given product
    let orderItem = await OrderItem.findOrCreate({
      where: {orderId: this.id, productId: product.id}
    })

    orderItem = orderItem[0]

    orderItem = await orderItem.update({quantity: amt})
    this.addOrderItem(orderItem).then(() => {})

    product.addOrderItem(orderItem).then(() => {})

    //if amt is 0 delete the orderItem
    if (!amt) {
      orderItem.destroy().then(() => {})
    }
    return orderItem
  } catch (err) {
    console.error(err)
  }
}

//gets all the order items assoicated with a particular order id
Order.prototype.getOrderItems = async function() {
  try {
    const res = await OrderItem.findAll({
      where: {
        orderId: this.id
      },
      include: [Product]
    })
    return res.data
  } catch (err) {
    console.error(err)
  }
}

module.exports = Order
