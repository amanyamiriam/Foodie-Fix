const testConfig = {
    baseUrl: 'http://localhost:3000',
    apiEndpoint: '/api',
    timeout: 5000,
    viewport: {
        mobile: { width: 375, height: 667 },
        tablet: { width: 768, height: 1024 },
        desktop: { width: 1920, height: 1080 }
    }
};

module.exports = testConfig;