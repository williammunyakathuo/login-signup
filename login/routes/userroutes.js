const router = require('express').Router()

const {getUsers, createUser, getAUser, userLogin} = require('../controllers/controllers')

router.get('/users', getUsers)
router.post('/signup', createUser)
router.get('/user/:id', getAUser)

router.post('/login', userLogin )

  module.exports = router