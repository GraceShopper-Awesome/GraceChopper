const router = require('express').Router()
const {User} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      where: {
        id: {
          [Sequelize.Op.ne]: req.session.passport.user
        }
      },
      attributes: ['id', 'userType', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.userId
      }
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, updatedUser] = await User.update(
      {
        userType: 'admin'
      },
      {
        where: {id: req.params.userId},
        attributes: ['id', 'userType', 'email'],
        returning: true,
        plain: true
      }
    )
    console.log(updatedUser)
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})
