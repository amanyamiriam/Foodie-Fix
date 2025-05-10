class AdminManager {
    constructor() {
        this.usersList = document.getElementById('usersList');
        this.promotionsList = document.getElementById('promotionsList');
        this.addPromotionBtn = document.getElementById('addPromotion');
        
        this.initializeEventListeners();
        this.loadDashboard();
    }

    initializeEventListeners() {
        this.addPromotionBtn.addEventListener('click', () => this.showAddPromotionModal());
    }

    async loadDashboard() {
        await Promise.all([
            this.loadUsers(),
            this.loadPromotions()
        ]);
    }

    async loadUsers() {
        const users = await this.fetchUsers();
        this.renderUsers(users);
    }

    renderUsers(users) {
        this.usersList.innerHTML = users.map(user => `
            <div class="user-card">
                <h3>${user.name}</h3>
                <p>Type: ${user.type}</p>
                <p>Email: ${user.email}</p>
                <button onclick="adminManager.toggleUserStatus(${user.id})">
                    ${user.active ? 'Deactivate' : 'Activate'}
                </button>
            </div>
        `).join('');
    }
}

const adminManager = new AdminManager();