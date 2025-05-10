const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Foodie Fix API',
            version: '1.0.0',
            description: 'Food Delivery API Documentation'
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server'
            }
        ]
    },
    apis: ['./routes/*.js']
};

module.exports = swaggerJsDoc(swaggerOptions);