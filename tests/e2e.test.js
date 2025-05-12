describe('End-to-End Order Flow', () => {
    test('Complete Order Process', async () => {
        // Search restaurant
        const searchInput = document.querySelector('.search-section input');
        searchInput.value = 'Italian';
        await searchInput.dispatchEvent(new Event('input'));
        
        // Select restaurant
        const restaurant = document.querySelector('.restaurant-card');
        await restaurant.click();
        
        // Add items to cart
        const menuItem = document.querySelector('.menu-item');
        await menuItem.querySelector('button').click();
        
        // Checkout process
        const cartBtn = document.getElementById('cartBtn');
        await cartBtn.click();
        
        const checkoutBtn = document.getElementById('checkoutBtn');
        await checkoutBtn.click();
        
        // Verify order confirmation
        const orderStatus = document.querySelector('.order-status');
        expect(orderStatus.textContent).toContain('confirmed');
    });
});