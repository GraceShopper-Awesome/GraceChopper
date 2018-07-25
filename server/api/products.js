const router = require('express').Router()
const {Product} = require('../db/models')
const {Category} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

router.get('/allproducts', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [Category]
    });
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/search', async (req, res, next) => {
<<<<<<< HEAD
//search in the bar as /search?searchTerm='searchKey'
  //separate spaces using '%'
  try {
    const products = await Product.findAll({where: {title: {[Sequelize.Op.iLike]: '%' + req.query.searchTerm + '%'}}})
=======
  //search in the bar as /search?term='searchKey'
  //separate spaces using '%'
  try {
    const products = await Product.findAll({
      where: {title: {[Sequelize.Op.iLike]: '%' + req.query.term + '%'}}
    })
>>>>>>> f74fe2203721072ef582bc511fad05e5c24396bf
    res.json(products)
  } catch (err) {
    next(err)
  }
<<<<<<< HEAD




  router.get('/:productId', async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.productId)
      res.json(product)
    } catch (err) {
      next(err)
    }
  })


=======
>>>>>>> f74fe2203721072ef582bc511fad05e5c24396bf
})

router.post('/', async (req, res, next) => {
  // ADMIN ACCOUNT ONLY
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})
