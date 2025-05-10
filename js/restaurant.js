class RestaurantManager {
    constructor() {
        this.menuItems = document.getElementById('menuItems');
        this.activeOrders = document.getElementById('activeOrders');
        this.addMenuItemBtn = document.getElementById('addMenuItem');
        this.salesChart = document.getElementById('salesChart');
        
        this.initializeEventListeners();
        this.loadDashboard();
    }

    initializeEventListeners() {
        this.addMenuItemBtn.addEventListener('click', () => this.showAddItemModal());
    }

    async loadDashboard() {
        await Promise.all([
            this.loadMenuItems(),
            this.loadActiveOrders(),
            this.loadAnalytics()
        ]);
    }

    async loadMenuItems() {
        // Fetch and display menu items
        const items = await this.fetchMenuItems();
        this.renderMenuItems(items);
    }

    renderMenuItems(items) {
        this.menuItems.innerHTML = items.map(item => `
            <div class="menu-item">
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span>$${item.price}</span>
                <button onclick="restaurantManager.editItem(${item.id})">Edit</button>
            </div>
        `).join('');
    }
}

const restaurantManager = new RestaurantManager();