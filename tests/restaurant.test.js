describe('Restaurant Features', () => {
    test('Menu Management', async () => {
        const menuItems = document.getElementById('menuItems');
        const addMenuItem = document.getElementById('addMenuItem');
        
        const initialCount = menuItems.children.length;
        await addMenuItem.click();
        
        expect(menuItems.children.length).toBe(initialCount + 1);
    });
});