const express = require('express')
const router = express.Router()
const { allUsers, getUserById, registerUser, userLogin } = require('../controller/userController')

const passport = require('passport')

//fetch all user data
router.get('/', passport.authenticate('jwt', { session: false }), allUsers)

//fetch one user data by id
router.get('/:id', passport.authenticate('jwt', { session: false }), getUserById)

//register a new user
router.post('/register', registerUser)

//user login
router.post('/login', userLogin)

module.exports = router