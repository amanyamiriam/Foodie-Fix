class AuthManager {
    constructor() {
        this.loginForm = document.getElementById('loginForm');
        this.registerForm = document.getElementById('registerForm');
        this.loginModal = document.getElementById('loginModal');
        this.registerModal = document.getElementById('registerModal');
        this.loginBtn = document.getElementById('loginBtn');
        this.registerBtn = document.getElementById('registerBtn');
        this.logoutBtn = document.getElementById('logoutBtn');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        this.loginBtn.addEventListener('click', () => this.showModal('login'));
        this.registerBtn.addEventListener('click', () => this.showModal('register'));
        this.logoutBtn.addEventListener('click', () => this.handleLogout());
    }

    async handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userType = formData.get('userType');
        
        try {
            const response = await this.loginUser(Object.fromEntries(formData));
            if (response.success) {
                this.showDashboard(userType);
                this.hideModal('login');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    showDashboard(userType) {
        const dashboards = {
            customer: 'customerDashboard',
            restaurant: 'restaurantDashboard',
            delivery: 'deliveryDashboard',
            admin: 'adminDashboard'
        };
        
        Object.values(dashboards).forEach(id => {
            document.getElementById(id).classList.add('hidden');
        });
        
        document.getElementById(dashboards[userType]).classList.remove('hidden');
    }
}

const authManager = new AuthManager();

// Login form handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const response = await this.loginUser(Object.fromEntries(formData));
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('userType', data.userType);
            
            // Redirect to home page
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Login error:', error);
    }
});

// Registration form handler
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const response = await this.loginUser(Object.fromEntries(formData));
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('userType', data.userType);
            
            // Redirect to home page
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Registration error:', error);
    }
});

// Close modal after successful auth
function closeAuthModal() {
    document.getElementById('loginModal').classList.add('hidden');
    document.getElementById('registerModal').classList.add('hidden');
}