const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    passoword: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('user', userSchema)