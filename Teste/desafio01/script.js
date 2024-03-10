window.onload = () => {
     let places = staticLoadPlaces();
     renderPlaces(places);
     calculateDistance();
};

function staticLoadPlaces() {
    return [
        {
            name: 'Treasure',
            location: {
                lat: -19.987079,
                lng: -43.963870,
                url: './assets/trasure/scene.gltf',
                scale: '0.05 0.05 0.05',
                id: 'objeto13d',
            }
        },
        /*{
            name: 'Placa',
            location: {
                lat: -19.987179,
                lng: -43.963970,
                url: './assets/sign/scene.gltf',
                scale: '0.08 0.08 0.08',
                id: 'objeto23d',
            }
        },*/
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
        let id = place.location.id;
        let gltf = place.location.url;
        let scale = place.location.scale;

        let model = document.createElement('a-entity');
        
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', `${gltf}`);
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', `${scale}`);
        model.setAttribute('id', `${id}`);
        

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}

 function calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371e3; // Radius of the earth in meters
            const φ1 = lat1 * Math.PI/180; // φ, λ in radians
            const φ2 = lat2 * Math.PI/180;
            const Δφ = (lat2-lat1) * Math.PI/180;
            const Δλ = (lon2-lon1) * Math.PI/180;

            const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            const d = R * c; // Distance in meters
            return d;
        }

        // Function to update proximity text and distance
        function updateProximity(distance) {
            const proximityText = document.getElementById('proximityText');
            const distanceText = document.getElementById('distanceText');
            
            const topdiv = document.getElementById('topdiv');
            const bottomdiv = document.getElementById('bottomdiv');

            if (distance <= 200) {
                topdiv.innerHTML = 'Dica Próxima!';
                bottomdiv.innerHTML = 'Distancia: '+ distance.toFixed(2) + ' metros';
            } else {
                topdiv.innerHTML = ('Nenhuma dica por perto.');
                bottomdiv.innerHTML = ('Desvende a charada!');
            
            }
         updateProximity(distance);
        }


        // Function to open website
        function openWebsite() {
            // Implement your logic to open a different website for each object
            window.open("https://www.invisio360.com", "_blank");
            //alert('Opening website...');
        }

        // Event listener for location update
        window.addEventListener('gps-camera-update-position', function(e) {
            const userLatitude = e.detail.position.latitude;
            const userLongitude = e.detail.position.longitude;

            // Coordinates for each object
            const objectCoordinates = [
                { latitude: -19.987079, longitude: -43.963870 },
                //{ latitude: -19.973211; longitude: -43.969754 },
                //{ latitude: -19.985079; longitude: -43.961870 },
                //{ latitude: -19.984079; longitude: -43.960870 },
                // Add coordinates for all 25 objects
            ];

            // Check distance for each object
            objectCoordinates.forEach(function(coord) {
                const distance = calculateDistance(userLatitude, userLongitude, coord.latitude, coord.longitude);
                

                if (distance <= 50) {
                    // Show button if user is 10 meters away
                    var x = document.getElementById("button");
                    var object3D = document.getElementById('object3d1');
                    object3D.setAttribute('visible', true);
                    if (distance <= 10) {
                        x.style.display = "block";
                      } else {
                        x.style.display = "none";
                      } 
                    // Show proximity and distance text
                    updateProximity(distance);
                } else {
                    object3D.setAttribute('visible', false)
                } 
            });
        });