const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Order = require('../models/Order');

// Create new order
router.post('/', [
    auth,
    [
        check('items', 'Items are required').not().isEmpty(),
        check('restaurantId', 'Restaurant ID is required').not().isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const order = new Order({
            customer: req.user.id,
            restaurant: req.body.restaurantId,
            items: req.body.items,
            totalAmount: req.body.totalAmount
        });

        await order.save();
        res.json(order);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.user.id })
            .populate('restaurant', 'name')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;