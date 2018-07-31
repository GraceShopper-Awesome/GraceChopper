const router = require('express').Router()
const {Order, Product, OrderItem} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

//api/orders/
const Op = Sequelize.Op

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({
      where: {
        status: {
          [Op.ne]: 'cart'
        }
      }
    })
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})

router.get('/all', async (req, res, next) => {
  try {
    const allOrderItems = await OrderItem.findAll({
      include: [
        {
          model: Order,
          where: {
            status: {[Op.ne]: 'cart'}
          }
        },
        {
          model: Product
        }
      ]
    })
    res.json(allOrderItems)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const allOrderItems = await OrderItem.findAll({
      include: [
        {
          model: Order,
          where: {
            status: {[Op.ne]: 'cart'},
            id: req.params.orderId
          }
        },
        {
          model: Product
        }
      ]
    })
    res.json(allOrderItems)
  } catch (err) {
    next(err)
  }
})

//change status of an order
router.put('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findOne({where: {id: req.params.orderId}})
    await order.update({status: req.body.status})
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
