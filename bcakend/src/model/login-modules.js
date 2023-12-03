const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    type:{
        type:String,
        required: true,
    }

})

const LoginModel = mongoose.model("login", LoginSchema)

module.exports = LoginModel