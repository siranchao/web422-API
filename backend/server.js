/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Siran Cao   |   Student ID: 159235209    |     Date: Jan 14 2023
*  Cyclic Link: https://misty-mite-purse.cyclic.app/
*
********************************************************************************/

const express = require('express')
const app = express()

const HTTP_PORT = process.env.PORT || 8080

const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// Middleware: CORS-enabled
const cors = require('cors')
app.use(cors())

// Middleware: Add support for incoming JSON entities
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// add passport as application-level middleware
const passport = require('passport')
const { strategy } = require('./middlewares/passportStrategy')

passport.use(strategy);
app.use(passport.initialize());


app.get('/', (req, res) => {
    res.status(200).json({
        message: "API Listening"
    })
});


// Setup api routes
app.use('/api/movies', require('./routes/movieRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


// Middleware: catching error routing request
app.use((req, res) => {
    res.status(404).send("Resource not found!")
})


// MongoDB connection
mongoose.set("strictQuery", false)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('---- MongoDB is Connected ----')
        app.listen(HTTP_PORT, () => {
            console.log('Server started on port ' + HTTP_PORT)
        });
    })
    .catch(err => {
        console.err('---- MongoDB Connection Failed ----' + err)
    })



