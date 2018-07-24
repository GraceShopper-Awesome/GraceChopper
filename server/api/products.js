const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await User.findAll();
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req,res,next) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product)
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {  // ADMIN ACCOUNT ONLY
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch(err) {
    next(err)
  }
})
