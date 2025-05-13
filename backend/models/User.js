const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['customer', 'restaurant', 'delivery'],
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    profileImage: {
        type: String,
        default: ''
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);