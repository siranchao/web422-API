const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//use middleware to replace try..catch.. block
const asyncHandler = require('express-async-handler');

const UserModel = require('../models/userModel')


//@controller: fetch all user data
//@route GET /api/users
const allUsers = asyncHandler(async (req, res) => {
    const query = await UserModel.find().exec()

    if (query.length === 0) {
        res.status(400)
        throw new Error('No user data found')
    }

    const list = query.map((user) => {
        const { _id, name, email } = user
        return {
            _id,
            name,
            email
        }
    })

    res.status(200).json({
        message: "fetching all user data",
        data: list
    })
})


//@controller: fetch one user data by id
//@route GET /api/users/:id
const getUserById = asyncHandler(async (req, res) => {
    const query = await UserModel.findById(req.params.id).exec()

    if (!query) {
        res.status(400)
        throw new Error('No user data found')
    }

    res.status(200).json({
        message: "fetching user data by id",
        data: { name: query.name, email: query.email }
    })
})


//@controller: register a new user
//@route POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400)
        throw new Error('Please check request body')
    }

    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please check user info')
    }

    //check if user exist
    const userExist = await UserModel.findOne({ email }).exec()
    if (userExist) {
        res.status(400)
        throw new Error('user already exist')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    //create new user
    const newUser = await UserModel.create({
        name: name,
        email: email,
        password: hashed
    })

    if (newUser) {
        res.status(201).json({
            message: "new user added",
            data: { name: newUser.name, email: newUser.email }
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})


//@controller: user login
//@route POST /api/users/login
const userLogin = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400)
        throw new Error('Please check request body')
    }
    const { email, password } = req.body

    //check user email
    const user = await UserModel.findOne({ email }).exec()

    //check password
    const checkPassword = await bcrypt.compare(password, user.password)

    if (user && checkPassword) {
        res.json({
            message: "login successful",
            data: { name: user.name, email: user.email }
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid login data')
    }

})


module.exports = { allUsers, getUserById, registerUser, userLogin }