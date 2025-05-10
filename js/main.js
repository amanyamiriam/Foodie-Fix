// Sample restaurant data
const restaurants = [
    {
        id: 1,
        name: "Pizza Palace",
        cuisine: "Italian",
        rating: 4.5,
        deliveryTime: "30-45 min",
        minimumOrder: 15,
        image: "images/pizza-palace.jpg"
    },
    // Add more restaurants here
];

// Function to create restaurant cards
function createRestaurantCard(restaurant) {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.innerHTML = `
        <img src="${restaurant.image}" alt="${restaurant.name}">
        <h3>${restaurant.name}</h3>
        <p>${restaurant.cuisine}</p>
        <div class="restaurant-info">
            <span>⭐ ${restaurant.rating}</span>
            <span>🕒 ${restaurant.deliveryTime}</span>
        </div>
        <button onclick="viewRestaurant(${restaurant.id})">View Menu</button>
    `;
    return card;
}

// Function to load restaurants
// API Configuration
const API_URL = 'https://api.foodiefix.com';

// Auth State
let currentUser = null;
let cart = [];

// Authentication Functions
async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            currentUser = data.user;
            localStorage.setItem('token', data.token);
            updateUIForAuth();
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
}

// Cart Functions
function addToCart(item) {
    cart.push(item);
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartCount.textContent = cart.length;
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>$${item.price}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
}

// Restaurant Functions
async function loadRestaurants() {
    try {
        const response = await fetch(`${API_URL}/restaurants`);
        const data = await response.json();
        const restaurantsGrid = document.querySelector('.restaurants-grid');
        data.forEach(restaurant => {
            restaurantsGrid.appendChild(createRestaurantCard(restaurant));
        });
    } catch (error) {
        console.error('Failed to load restaurants:', error);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const cartBtn = document.getElementById('cartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.elements[0].value;
        const password = e.target.elements[1].value;
        login(email, password);
    });

    cartBtn.addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.toggle('hidden');
    });

    checkoutBtn.addEventListener('click', initiateCheckout);
    
    loadRestaurants();
});

// Payment Integration
async function initiateCheckout() {
    if (!currentUser) {
        alert('Please login to checkout');
        return;
    }

    try {
        const stripe = Stripe('your_publishable_key');
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ items: cart })
        });
        
        const { clientSecret } = await response.json();
        const result = await stripe.confirmCardPayment(clientSecret);
        
        if (result.error) {
            alert(result.error.message);
        } else {
            // Handle successful payment
            clearCart();
            alert('Payment successful!');
        }
    } catch (error) {
        console.error('Payment failed:', error);
    }
}
function viewRestaurant(id) {
    // Implement restaurant view functionality
    console.log(`Viewing restaurant ${id}`);
}