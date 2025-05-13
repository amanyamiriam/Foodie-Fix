const jwt = require('jsonwebtoken');

const verifyAdminToken = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }
        req.admin = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = { verifyAdminToken };