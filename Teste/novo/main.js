document.addEventListener('DOMContentLoaded', function() {
  var conteudo = `
      <div class="top-text" id="topdiv">.</div>
    <div class="bottom-text" id="bottomdiv" style.bottom = "100px">.</div>
    <a-scene 
        vr-mode-ui='enabled: false' 
        embedded
        arjs='sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960; debugUIEnabled: false;'>
    <a-camera gps-camera="minDistance: 0; maxDistance: 200;" rotation-reader></a-camera>

    <!-- Localizações -->

    <a-entity id="object01" gltf-model="./assets/treasure/scene.gltf" gps-entity-place="latitude: -19.987079; longitude: -43.963870" scale="0.2 0.2 0.2" visible="false"></a-entity>
    
    </a-scene>
    <div  class="centered" >
    <button id="button" type="button" hidden="hidden" onclick="openWebsite()"></button>
</div>
<script>
        // Function to calculate distance between two coordinates
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

                //proximityText.setAttribute('text', 'value', 'You are close to a tip');
                //distanceText.setAttribute('text', 'value', 'Distance: ' + distance.toFixed(2) + ' meters');
            } else {
                topdiv.innerHTML = ('');
                bottomdiv.innerHTML = ('');
                
                //proximityText.setAttribute('text', 'value', '');
                //distanceText.setAttribute('text', 'value', '');
            }
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
                { latitude: -19.987079; longitude: -43.963870 },
                // Add coordinates for all 25 objects
            ];

            // Check distance for each object
            objectCoordinates.forEach(function(coord) {
                const distance = calculateDistance(userLatitude, userLongitude, coord.latitude, coord.longitude);
                

                if (distance <= 200) {
                    // Show button if user is 10 meters away
                    let element = document.getElementById("button")
                    let hidden = element.getAttribute("hidden");
                    if (distance <= 10) {
                    if (hidden) {
                        element.removeAttribute("hidden")
                    } else {
                        element.setAttribute("hidden", "hidden");
                    }
                    }
                    // Show proximity and distance text
                    updateProximity(distance);
                }
            });
        });
    </script>
      `;
  
  document.getElementById('conteudo').innerHTML = conteudo;
});