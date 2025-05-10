const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');

// Get available deliveries
router.get('/available', auth, async (req, res) => {
    try {
        const orders = await Order.find({
            status: 'confirmed',
            'delivery.partner': { $exists: false }
        });
        res.json(orders);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Accept delivery
router.post('/accept/:orderId', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        order.delivery.partner = req.user.id;
        order.status = 'out_for_delivery';
        await order.save();

        res.json(order);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;