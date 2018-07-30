const router = require('express').Router()
const {User, Order, Product, OrderItem} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

const Op = Sequelize.Op

// router.get('/allorderitems', async (req, res, next) => {
//   try {
//     const allOrderItems = await OrderItem.findAll({
//       where: {
//         order: {
//           [Op.ne]: 'cart'
//         }
//       }
//     })
//     res.json(allOrders)
//   } catch(err) {
//     next(err)
//   }
// })

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
  } catch(err) {
    next(err)
  }
})

router.get('/all', async (req, res, next) => {
  try {
    const allOrderItems = await OrderItem.findAll({
      include: [{
				model: Order,
				where: {
					status: { [Op.ne]: 'cart'}
				}
			},
			{
				model: Product
			}]
    })
    res.json(allOrderItems)
  } catch(err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const allOrderItems = await OrderItem.findAll({
      include: [{
				model: Order,
				where: {
          status: { [Op.ne]: 'cart'},
          id: req.params.orderId
				}
			},
			{
				model: Product
			}]
    })
    res.json(allOrderItems)
  } catch(err) {
    next(err)
  }
})
