
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

    res.status(200).json({
        message: "fetching all user data",
        data: query
    })
})


//@controller: fetch one user data by id
//@route GET /api/users/id
const getUserById = asyncHandler(async (req, res) => {
    const query = await UserModel.findById(req.params.id).exec()

    if (!query) {
        res.status(400)
        throw new Error('No user data found')
    }

    res.status(200).json({
        message: "fetching user data by id",
        data: query
    })
})


//@controller: register a new user
//@route POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400)
        throw new Error('Please check request body')
    }
    const userData = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password
    }

    const newUser = new UserModel(userData)
    await newUser.save()

    res.status(200).json({
        message: "new user added",
        data: null
    })
})


module.exports = { allUsers, getUserById, registerUser }