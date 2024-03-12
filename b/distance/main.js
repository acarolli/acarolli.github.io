// Define your 25 object locations here with latitude, longitude, and website URL
const objectLocations = [
    { latitude: -19.973222, longitude: -43.969979, website: "https://www.invisio360.com" },
    // Define other object locations similarly
];

// Initialize AR scene
const scene = document.querySelector('#ar-scene-container');
const arScene = Argon.init(document.body);
const entity = arScene.entities.add(new Argon.Cesium.Entity);

// Initialize user's current location
let userLocation;

// Function to calculate distance between two coordinates in meters
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2-lat1) * Math.PI / 180;
    const Δλ = (lon2-lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}

// Function to update user's location
function updateUserLocation() {
    navigator.geolocation.getCurrentPosition(position => {
        userLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude };
    });
}

// Function to update the AR scene based on user's distance from objects
function updateARScene() {
    if (!userLocation) return;

    let closestDistance = Infinity;
    let closestObject = null;

    objectLocations.forEach(location => {
        const distance = calculateDistance(userLocation.latitude, userLocation.longitude, location.latitude, location.longitude);
        
        if (distance < closestDistance) {
            closestDistance = distance;
            closestObject = location;
        }
    });

    if (closestDistance <= 200) {
        document.getElementById('info-text').innerText = "You are close to a tip.\nDistance: " + closestDistance.toFixed(2) + " meters";
        document.getElementById('info-text').style.display = 'block';
    } else {
        document.getElementById('info-text').style.display = 'none';
    }

    if (closestDistance <= 10) {
        document.getElementById('treasure-button').style.display = 'block';
        document.getElementById('treasure-button').onclick = function() {
            window.location.href = closestObject.website;
        };
    } else {
        document.getElementById('treasure-button').style.display = 'none';
    }
}

// Update user location and AR scene every second
setInterval(() => {
    updateUserLocation();
    updateARScene();
}, 1000);
