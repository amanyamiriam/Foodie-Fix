const testConfig = require('./config');

async function runTests() {
    console.log('Starting test suite...');
    
    // Run unit tests
    await require('./auth.test.js');
    await require('./restaurant.test.js');
    
    // Run E2E tests
    await require('./e2e.test.js');
    
    console.log('Test suite completed');
}

runTests().catch(console.error);