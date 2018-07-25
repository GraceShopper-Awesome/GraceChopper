const router = require('express').Router() 
const {Product, ProductCategory, Category} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')


router.get('/:category', async (req, res, next) => {
  try {
    const category = await Category.findOne({where: {name: req.params.category}})


     const productIds = await ProductCategory.findAll({where: {categoryId: category.id}})
    console.log('prod' , productIds)

    let prodArr = []
    // prodArr.push(productIds.map(async(id) => {
    //   return  await Product.findOne({where: {id: id}})
    //
    // }))

    res.json(prodArr)
  } catch (err) {
    next(err)
  }

})


module.exports = router

router.get('/', async (req, res, next) => {
	try {
		const categories = await Category.findAll();
		res.json(categories)
	} catch(err) {
		next(err)
	}
})