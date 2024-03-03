// Get user's location using geolocation API
navigator.geolocation.getCurrentPosition(position => {
    const userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };

    // Calculate distance between two points
    function getDistance(lat1, lon1, lat2, lon2) {
        // Haversine formula to calculate distance
        // Implementation omitted for brevity
    }

    // Array of AR object locations
    const arObjectLocations = [
        { latitude: -19.973222, longitude: -43.969979, gltf: './assets/treasure/scene.gltf' },
        // Define other AR object locations
    ];

    // Check distance to each AR object
    arObjectLocations.forEach(object => {
        const distance = getDistance(userLocation.latitude, userLocation.longitude, object.latitude, object.longitude);

        if (distance <= 200) {
            // Show proximity message
            document.getElementById('proximity-message').innerText = 'You are close to a tip';

            // Show distance from the object
            document.getElementById('distance-message').innerText = `Distance: ${distance} meters`;

            if (distance <= 10) {
                // Show open website button
                document.getElementById('open-website-button').style.display = 'block';

                // Handle button click event
                document.getElementById('open-website-button').addEventListener('click', () => {
                    // Open website
                    window.open('https://example.com', '_blank');
                });
            }
        }
    });
});

// AR.js code for displaying AR objects
// Implementation varies based on chosen AR library
