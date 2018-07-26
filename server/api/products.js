const router = require('express').Router()
const {Product} = require('../db/models')
const {Category} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

router.get('/allproducts', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [Category]
    })
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
  //search in the bar as /search?term='searchKey'
  //separate spaces using '%'
  try {
    const products = await Product.findAll({
      where: {title: {[Sequelize.Op.iLike]: '%' + req.query.term + '%'}}
    })

    res.json(products)
  } catch (err) {
    next(err)
  }

  router.get('/:productId', async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.productId)
      res.json(product)
    } catch (err) {
      next(err)
    }
  })
})

// ADMIN ACCOUNT ONLY
router.post('/admin/add', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/admin/:productId', async (req, res, next) => {
  console.log('req.body', req.body)
  try {
    const [numberOfAffectedRow, affectedRows] = await Product.update(
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        imageUrl: req.body.imageUrl
      },
      {
        where: {id: req.body.id},
        returning: true,
        plain: true
      }
    )
    res.json(affectedRows)
  } catch (err) {
    next(err)
  }
})
