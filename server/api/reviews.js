const router = require('express').Router()
const {Review} = require('../db/models')
// const {Category} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

router.post('/add', async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    res.json(review)
  } catch (err) {
    next(err)
  }
})
