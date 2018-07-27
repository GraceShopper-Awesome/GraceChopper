const router = require('express').Router()
const {User, Order, Product, OrderItem} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

const Op = Sequelize.Op

//send all products in a given order to client
router.get('/:userId', async (req, res, next) => {
  try {
    // let orderItems = await OrderItem.findAll({where: {orderId: req.params.orderId}, include: [{model: Product}]})
    let order = await Order.findOne({where: {userId: req.params.userId, status: "cart"}})
    let orderItems = await OrderItem.findAll({where: {orderId : order.id}, include: [Product]})
    console.log(orderItems)
    res.json(orderItems)
  } catch (err) {
    next(err)
  }
})


//remove a product from an order
router.delete('/:orderId', async (req, res, next) => {

  try {
    let orderItem = await OrderItem.findOne({
      where: {orderId: req.params.orderId, productId: req.body.productId},
      include: [Order, Product]
    })
    orderItem.order.customAddProduct(orderItem.product, 0)

    res.send(200)
  } catch (err) {
    next(err)
  }

})


//changing quantity of a product in a given order or adding a product to an order
router.put('/:orderId', async (req, res, next) => {

  try {
    let orderItem = await OrderItem.findOne({where: {orderId: req.params.orderId, productId: req.body.productId}})
    orderItem.update({quantity: req.body.quantity})


    res.send(200)
  } catch (err) {
    next(err)
  }

})


//checkout a cart which sets fixed price on its OrderItems, changes its status to an order and creates a new db cart instance for the given user
router.post('/:orderId', async (req, res, next) => {

  try {
    let cart = await Order.findOne({where: {id: req.params.orderId}, include :[OrderItem]})
    cart.changeCartToOrder(cart)


    res.send(200)
  } catch (err) {
    next(err)
  }

})
