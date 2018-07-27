const router = require('express').Router()
const {User, Order, Product, OrderItem} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

router.get('/:orderId', async (req, res, next) => {
  try {
    let orderItems = await OrderItem.findAll({where: {orderId: req.params.orderId}, include: [{model: Product}]})


    res.json(orderItems)
  } catch (err) {
    next(err)
  }
})

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

router.put('/:orderId', async (req, res, next) => {

  try {
    let orderItem = await OrderItem.findOne({where: {orderId: req.params.orderId, productId: req.body.productId}})
    orderItem.update({quantity: req.body.quantity})


    res.send(200)
  } catch (err) {
    next(err)
  }

})
