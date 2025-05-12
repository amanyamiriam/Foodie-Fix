// Define separate classes first
class RouteOptimizer {
    async optimizeDeliveryRoute(deliveryPoints) {
        try {
            const response = await fetch('/api/ai/route-optimize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(deliveryPoints)
            });
            return await response.json();
        } catch (error) {
            console.error('Route optimization failed:', error);
        }
    }
}

class RecommendationEngine {
    async getPersonalizedRecommendations(userId) {
        try {
            const response = await fetch(`/api/ai/recommendations/${userId}`);
            const recommendations = await response.json();
            this.displayRecommendations(recommendations);
        } catch (error) {
            console.error('Failed to get recommendations:', error);
        }
    }

    displayRecommendations(recommendations) {
        const recommendationsSection = document.getElementById('personalizedRecommendations');
        recommendationsSection.innerHTML = recommendations.map(item => `
            <div class="recommendation-card">
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="match-score">${item.matchScore}% Match</span>
            </div>
        `).join('');
    }
}

class FinancialAnalytics {
    async analyzeTransactions() {
        try {
            const response = await fetch('/api/ai/financial-analysis');
            const analysis = await response.json();
            this.updateDashboard(analysis);
        } catch (error) {
            console.error('Financial analysis failed:', error);
        }
    }

    updateDashboard(analysis) {
        const dashboard = document.getElementById('financialDashboard');
        dashboard.innerHTML = `
            <div class="financial-metrics">
                <div class="metric">
                    <h3>Revenue Forecast</h3>
                    <p>${analysis.revenueForecast}</p>
                </div>
                <div class="metric">
                    <h3>Cost Optimization</h3>
                    <p>${analysis.costOptimization}</p>
                </div>
            </div>
        `;
    }
}

// Main AIServices class
class AIServices {
    constructor() {
        this.chatbot = document.getElementById('chatbot');
        this.routeOptimizer = new RouteOptimizer();
        this.recommendationEngine = new RecommendationEngine();
        this.financialAnalytics = new FinancialAnalytics();
    }
}

const aiServices = new AIServices();