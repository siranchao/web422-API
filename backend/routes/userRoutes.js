const express = require('express')
const router = express.Router()
const { allUsers, getUserById, registerUser } = require('../controller/userController')


//fetch all user data
router.get('/', allUsers)

//fetch one user data by id
router.get('/:id', getUserById)

//register a new user
router.post('/register', registerUser)

module.exports = router