describe('Authentication Tests', () => {
    test('User Login', async () => {
        const loginForm = document.getElementById('loginForm');
        const emailInput = loginForm.querySelector('input[type="email"]');
        const passwordInput = loginForm.querySelector('input[type="password"]');
        
        emailInput.value = 'test@example.com';
        passwordInput.value = 'password123';
        
        await loginForm.submit();
        
        const userMenu = document.getElementById('userMenu');
        expect(userMenu.classList.contains('hidden')).toBeFalsy();
    });
});