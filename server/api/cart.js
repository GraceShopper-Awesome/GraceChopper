const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

router.get('/allproducts', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})


router.post('/', async (req, res, next) => {  // BULK POST
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})