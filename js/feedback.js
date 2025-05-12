class FeedbackSystem {
    constructor() {
        this.initFeedbackForm();
        this.setupAnalytics();
    }

    initFeedbackForm() {
        const feedbackButton = document.createElement('button');
        feedbackButton.id = 'feedbackBtn';
        feedbackButton.className = 'feedback-button';
        feedbackButton.innerHTML = 'Give Feedback';
        document.body.appendChild(feedbackButton);

        feedbackButton.addEventListener('click', () => this.showFeedbackModal());
    }

    showFeedbackModal() {
        const modal = document.createElement('div');
        modal.className = 'feedback-modal modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Help Us Improve!</h2>
                <form id="feedbackForm">
                    <select name="feedbackType" required>
                        <option value="general">General Feedback</option>
                        <option value="bug">Report a Bug</option>
                        <option value="feature">Feature Request</option>
                        <option value="experience">User Experience</option>
                    </select>
                    <textarea placeholder="Tell us your thoughts..." required></textarea>
                    <div class="rating">
                        <span>Rate your experience:</span>
                        <div class="stars">
                            ${Array(5).fill().map((_, i) => 
                                `<span class="star" data-rating="${i + 1}">★</span>`
                            ).join('')}
                        </div>
                    </div>
                    <button type="submit">Submit Feedback</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    }

    setupAnalytics() {
        // User behavior tracking
        document.addEventListener('click', (e) => {
            if (e.target.closest('.restaurant-card')) {
                this.logUserAction('restaurant_view');
            } else if (e.target.closest('.menu-item')) {
                this.logUserAction('menu_item_view');
            }
        });
    }

    async logUserAction(action) {
        try {
            await fetch('/api/analytics/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action,
                    timestamp: new Date().toISOString(),
                    sessionId: this.getSessionId()
                })
            });
        } catch (error) {
            console.error('Analytics logging failed:', error);
        }
    }

    getSessionId() {
        return localStorage.getItem('sessionId') || this.generateSessionId();
    }

    generateSessionId() {
        const sessionId = Date.now().toString(36);
        localStorage.setItem('sessionId', sessionId);
        return sessionId;
    }
}

const feedbackSystem = new FeedbackSystem();