var visibilityred = document.getElementById(red);
var visibilitygreen = document.getElementById(green);
    
    function click() {
            alert("Botão Clicado!");        
        if (visibilityred === "true") {
            visibilityred = "false";
            visibilitygreen = "true";
            alert("Condição 01");
        } else {
            visibilityred = "true";
            visibilitygreen = "false";
            alert("Condição 02");
        }
    }


// Function to open website
        function openWebsite() {
            // Implement your logic to open a different website for each object
            window.open("https://www.invisio360.com", "_blank");
            //alert('Opening website...');
        }