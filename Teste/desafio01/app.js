document.addEventListener('DOMContentLoaded', function () {
    // Define o conteúdo do A-Scene dinamicamente
    const aSceneContent = `
    <div class="top-text" id="topdiv"> </div>

<a-scene 
        vr-mode-ui='enabled: false' 
        embedded
        arjs='sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960; debugUIEnabled: false;'>
<a-camera gps-camera="minDistance: 0; maxDistance: 200;" rotation-reader></a-camera>
    
</a-scene>

<div  class="centered" >
        <button id="button" type="button" onclick="openWebsite()"></button>
</div>

<div class="bottom-text" id="bottomdiv"> </div>
<script>
        // Function to calculate distance between two coordinates
       calculateDistance();
</script>`;

    // Adiciona o conteúdo do A-Scene ao elemento body
    document.body.innerHTML = aSceneContent;
});