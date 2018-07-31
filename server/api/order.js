const router = require('express').Router()
const {User, Order, Product, OrderItem} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

const Op = Sequelize.Op

//get all past orders for a user
router.get('/:userId', async (req, res, next) => {
  try {
    console.log('HITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT' + req.params.userId)
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


//change status of an order
router.put('/:orderId', async (req, res, next) => {

  try {
    const order = await Order.findOne({where: {id: req.params.orderId}})
    console.log("STUFF:", req.body.status)
    await    order.update({status: req.body.status})


    res.sendStatus(200)
  } catch (err) {
    next(err)
  }

})


