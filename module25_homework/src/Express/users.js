const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        maxlength: 10,
        minlength: 10,
        required: true
    },
    mail: {
        type: String,
        match: /\w+@\w+\.\w+/,
        required: true
    },
    phone: {
        type: Number,
        maxlength: 15,
    },
    passport: {
        type: Number,
        required: true,
        maxlength: 10,
        minlength: 10,
    },
    passportDate: {
        type: String,
        required: true,
        maxlength: 10
    },
    passportOrgan: {
        type: String,
        required: true
    },
    passportCode: {
        type: Number,
        required: true
    },
    driver: {
        type: Number,
        required: true
    },
    driverDate: {
        type: String,
        required: true,
        maxlength: 10,
        minlength: 10
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;