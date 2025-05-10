const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    items: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    totalAmount: Number,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'],
        default: 'pending'
    },
    delivery: {
        partner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        location: {
            lat: Number,
            lng: Number
        },
        estimatedTime: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);