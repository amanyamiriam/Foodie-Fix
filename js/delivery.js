class DeliveryManager {
    constructor() {
        this.map = null;
        this.deliveryList = document.getElementById('deliveryList');
        this.earningsStats = document.getElementById('earningsStats');
        
        this.initializeMap();
        this.loadActiveDeliveries();
    }

    initializeMap() {
        this.map = new google.maps.Map(document.getElementById('deliveryMap'), {
            zoom: 12,
            center: { lat: 0, lng: 0 }
        });
    }

    async loadActiveDeliveries() {
        const deliveries = await this.fetchActiveDeliveries();
        this.renderDeliveries(deliveries);
        this.updateMap(deliveries);
    }

    updateMap(deliveries) {
        deliveries.forEach(delivery => {
            new google.maps.Marker({
                position: delivery.location,
                map: this.map,
                title: `Order #${delivery.id}`
            });
        });
    }
}

const deliveryManager = new DeliveryManager();