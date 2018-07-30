const router = require('express').Router()
const {Order, OrderItem} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

//api/order/

//get all past orders for a user
router.get('/:userId', async (req, res, next) => {
  try {
    let orders = await Order.findAll({
      where: {userId: req.params.userId, status: {[Sequelize.Op.ne]: 'cart'}},
      include: [OrderItem]
    })
    console.log(orders)

    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// delete an order from a user (admin)
router.delete('/:orderId', async (req, res, next) => {
  try {
    //destroy orderItem with orderId and set that field to null on its orderItems
    await Order.destroy({where: {id: req.params.orderId}, include: [OrderItem]})
    //destroy OrderItems with null orderId
    await OrderItem.destroy({where: {orderId: null}})
    res.send(200)
  } catch (err) {
    next(err)
  }
})
