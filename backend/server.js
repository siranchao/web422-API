const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const HTTP_PORT = process.env.PORT || 8080


const app = express()

// Middleware: CORS-enabled
app.use(cors())

// Middleware: Add support for incoming JSON entities
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


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



