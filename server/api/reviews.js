const router = require('express').Router()
const {Review} = require('../db/models')

module.exports = router

router.post('/add', async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    res.json(review)
  } catch (err) {
    next(err)
  }
})
