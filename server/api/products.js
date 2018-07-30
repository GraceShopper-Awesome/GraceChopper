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

  //search in the bar as /search?term='searchKey'
  //separate spaces using '%'
router.get('/availableproducts', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        available: true
      },
      include: [Category]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    console.log('in search')
    const products = await Product.findAll({
      where: {title: {[Sequelize.Op.iLike]: '%' + req.query.term + '%'}}
    })
    console.log('search products', products)
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

// ADMIN ACCOUNT ONLY
router.post('/admin/add', async (req, res, next) => {
  try {
    const {title, description, price, stock, imageUrl, categories} = req.body
    const newProduct = await Product.create({
      title,
      description,
      price,
      stock,
      imageUrl
    })

    let categoriesArr = []
    for (let i = 0; i < categories.length; i++) {
      const resCat = await Category.findById(categories[i])
      categoriesArr.push(resCat)
    }
    const newProductCategories = await newProduct.addCategories(categoriesArr)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/admin/available/:productId', async (req, res, next) => {
  try{
    const [numberOfAffectedRow, affectedRows] = await Product.update({
      available: req.body.available
    },
    {
      where: {id: req.params.productId},
      returning: true,
      plain: true
    })
    res.json(affectedRows)
  } catch(err) {
    next(err)
  }
})

router.put('/admin/:productId', async (req, res, next) => {
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
    const productCategories = await Product.findAll({
      where: {
        id: req.body.id
      },
      include: [Category]
    })

    const removeCat = productCategories[0].dataValues.categories
      .map(x => x.dataValues)
      .map(a => a.id)

    let categoriesArrToRemove = []
    for (let i = 0; i < removeCat.length; i++) {
      const resCat = await Category.findById(removeCat[i])
      categoriesArrToRemove.push(resCat)
    }
    affectedRows.removeCategories(categoriesArrToRemove)

    const {categories} = req.body
    let categoriesArr = []
    for (let i = 0; i < categories.length; i++) {
      const resCat = await Category.findById(categories[i])
      categoriesArr.push(resCat)
    }
    const newProductCategories = await affectedRows.addCategories(categoriesArr)

    res.json(affectedRows)
  } catch (err) {
    next(err)
  }
})
