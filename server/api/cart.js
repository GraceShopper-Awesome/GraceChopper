const router = require('express').Router()
const {User, Order, Product, OrderItem} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

const Op = Sequelize.Op

//send all products in a given order to client
router.get('/:userId', async (req, res, next) => {
  try {
    let cart = await Order.findOne({where: {userId: req.params.userId, status: 'cart'}})
    let orderItems = await OrderItem.findAll({where: {orderId: cart.dataValues.id}, order: [['createdAt', 'DESC']], include: [Product]})
    res.json(orderItems)
  } catch (err) {
    next(err)
  }
})


//remove a product from an order
router.delete('/:orderId', async (req, res, next) => {

  try {

    let orderItem = await OrderItem.findOne({
      where: {id: req.params.orderId}
    })

    orderItem.destroy()
    res.send(200)

  } catch (err) {

    next(err)
  }

})


//changing quantity of a product in a given order or adding a product to an order


router.put('/increment/', async (req, res, next) => {

  try {
    let orderitem  = await OrderItem.findById(req.body.orderitemId)
    await orderitem.incrementQuantity()
    res.send(orderitem)
  } catch (err) {
    next(err)
  }

})


//changing quantity of a product in a given order or adding a product to an order
router.put('/decrement/', async (req, res, next) => {
  try {
    let orderitem  = await OrderItem.findById(req.body.orderitemId)
    await orderitem.decrementQuantity()
    res.send(orderitem)
  } catch (err) {
    next(err)
  }

})

router.put('/', async (req, res, next) => {
    try {
    let cart = await Order.findOrCreate({where: {userId: req.body.userId, status:"cart"}})
    let orderitem  = await OrderItem.findOrCreate({where: {orderId: cart[0].dataValues.id, productId: req.body.productId}, include: [Product]})
    await orderitem[0].update({quantity: req.body.quantity})
    res.send(orderitem)
    } catch(error){
        console.log(error)
    }

})
//checkout a cart which sets fixed price on its OrderItems, changes its status to an order and creates a new db cart instance for the given user
router.post('/:orderId', async (req, res, next) => {

  try {
    let cart = await Order.findOne({where: {id: req.params.orderId}, include: [OrderItem]})

    cart.changeCartToOrder(cart)


    res.send(200)
  } catch (err) {
    next(err)
  }

})
