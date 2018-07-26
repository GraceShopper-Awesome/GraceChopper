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
    const product = await Product.findAll({
      where: {
        id: req.params.productId
      },
      include: [Category]
    })
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
})

// ADMIN ACCOUNT ONLY
router.post('/admin/add', async (req, res, next) => {
  try {
    // console.log('req.body.imageUrl', req.body.imageUrl)
    console.log(req.body)
    const {title, description, price, stock, imageUrl, categories} = req.body
    const newProduct = await Product.create({ title, description, price, stock, imageUrl})

    let categoriesArr = []
    for(let i = 0; i < categories.length; i++) {
      const resCat = await Category.findById(categories[i])
      categoriesArr.push(resCat)
    }

    const newProductCategories = await newProduct.addCategories(categoriesArr)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})
