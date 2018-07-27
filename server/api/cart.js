const router = require('express').Router()
const {User, Order, Product, OrderItem} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

router.get('/:orderId', async (req, res, next) => {
  try {
    let products = []
    let orderItems = await OrderItem.findAll({where: {orderId: req.params.orderId}, include : [{model : Product}] })



    res.json(orderItems)
  } catch (err) {
    next(err)
  }
})

