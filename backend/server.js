const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter, authLimiter } = require('./middleware/rateLimiter');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/restaurants', require('./routes/restaurants'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/delivery', require('./routes/delivery'));

// WebSocket for real-time tracking
io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('trackOrder', (orderId) => {
        // Join a room specific to this order
        socket.join(`order_${orderId}`);
    });

    socket.on('updateLocation', (data) => {
        // Broadcast location update to specific order room
        io.to(`order_${data.orderId}`).emit('locationUpdate', data);
    });
});

// Rate limiting
app.use('/api/', apiLimiter);
app.use('/api/auth/', authLimiter);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error handling middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));