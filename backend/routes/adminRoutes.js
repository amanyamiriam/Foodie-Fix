const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const User = require('../models/User');
const Promotion = require('../models/Promotion');

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        if (!users) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Update user status
router.patch('/users/:id/status', async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.active = req.body.active;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error updating user status' });
    }
});

// Create promotion
router.post('/promotions', async (req, res) => {
    try {
        const { title, description, discountType, discountValue, startDate, endDate } = req.body;

        // Validate required fields
        if (!title || !description || !discountType || !discountValue || !startDate || !endDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const promotion = new Promotion({
            title,
            description,
            discountType,
            discountValue,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        });

        const newPromotion = await promotion.save();
        res.status(201).json(newPromotion);
    } catch (error) {
        res.status(400).json({ message: 'Error creating promotion' });
    }
});

// Get all promotions
router.get('/promotions', async (req, res) => {
    try {
        const promotions = await Promotion.find();
        if (!promotions) {
            return res.status(404).json({ message: 'No promotions found' });
        }
        res.json(promotions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching promotions' });
    }
});

// Update promotion
router.put('/promotions/:id', async (req, res) => {
    try {
        const promotion = await Promotion.findById(req.params.id);
        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found' });
        }

        const updates = req.body;
        Object.keys(updates).forEach(key => {
            promotion[key] = updates[key];
        });

        const updatedPromotion = await promotion.save();
        res.json(updatedPromotion);
    } catch (error) {
        res.status(400).json({ message: 'Error updating promotion' });
    }
});

// Delete promotion
router.delete('/promotions/:id', async (req, res) => {
    try {
        const promotion = await Promotion.findById(req.params.id);
        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found' });
        }

        await promotion.remove();
        res.json({ message: 'Promotion deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting promotion' });
    }
});

module.exports = router;