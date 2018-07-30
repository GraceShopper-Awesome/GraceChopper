const router = require('express').Router()
const {User, Order, Product, OrderItem} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

const Op = Sequelize.Op

//send all products in a given user to client
router.get('/:userId', async (req, res, next) => {
  try {
    // let orderItems = await OrderItem.findAll({where: {orderId: req.params.orderId}, include: [{model: Product}]})
    let cart = await Order.findOne({where: {userId: req.params.userId, status: 'cart'}})
    let orderItems = await OrderItem.findAll({where: {orderId: cart.dataValues.id}, include: [Product]})
    res.json(orderItems)
  } catch (err) {
    next(err)
  }
})


//remove a product from an order
router.delete('/:userId', async (req, res, next) => {

  try {
    let cart = await Order.findOne({where: {userId: req.params.userId, status: 'cart'}})
    let orderItem = await OrderItem.findOne({
      where: {orderId: cart.id, productId: req.body.productId}
    })
    orderItem.destroy().then()

    res.send(200)
  } catch (err) {
    next(err)
  }

})


//changing quantity of a product in a given order or adding a product to an order
router.put('/:userId', async (req, res, next) => {

  try {
    let cart = await Order.findOne({where: {userId: req.params.userId, status: 'cart'}})
    let product = await Product.findOne({where: {id: req.body.productId}})
    cart.customAddProduct(product, req.body.quantity)

    res.send(200)
  } catch (err) {
    next(err)
  }

})


//purchase a cart and runs db changes associated
//see changeCartToOrder for documentation
router.post('/:userId', async (req, res, next) => {

  try {
    let cart = await Order.findOne({where: {userId: req.params.userId, status: 'cart'}})
    cart.changeCartToOrder(cart)


    res.send(200)
  } catch (err) {
    next(err)
  }

})
