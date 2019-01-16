const router = require('express').Router()
const {User} = require('../db/models')
const Sequelize = require('sequelize')

const Op = Sequelize.Op
module.exports = router

//authenticate admin
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.sendStatus(403)
  } else {
    next()
  }
}

router.get('/', async (req, res, next) => {
  try {
    let users
    if (req.user.isAdmin) {
      users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email', 'firstName', 'lastName', 'isAdmin'],
        where: {
          id: {
            [Op.ne]: req.user.id
          }
        }
      })
    } else {
      users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email']
      })
    }
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const userId = +req.params.id
    const {isAdmin} = req.body
    let isUpdated
    isUpdated = await User.update(
      {isAdmin},
      {
        where: {
          id: userId
        }
      }
    )
    res.json(isUpdated)
  } catch (err) {
    next(err)
  }
})
router.delete('/:id', isAdmin, (req, res, next) => {
  try {
    const userId = req.params.id
    User.destroy({
      where: {
        id: userId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
