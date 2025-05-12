const prototypeConfig = {
    features: {
        auth: true,
        restaurants: true,
        orders: true,
        delivery: true,
        payments: false,
        analytics: false
    },
    mockData: {
        restaurants: [
            {
                id: 1,
                name: "Italian Delight",
                cuisine: "Italian",
                rating: 4.5,
                deliveryTime: "30-45"
            },
            // More mock restaurants...
        ],
        menuItems: [
            {
                id: 1,
                name: "Margherita Pizza",
                price: 12.99,
                description: "Fresh tomatoes, mozzarella, basil"
            },
            // More mock menu items...
        ]
    }
};

module.exports = prototypeConfig;