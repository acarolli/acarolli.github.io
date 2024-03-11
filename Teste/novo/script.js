var visibilityred = document.querySelector("idred");
var visibilitygreen = document.querySelector("idgreen");
    
    function clickChange() {
            alert("Botão Clicado!");        
        if (visibilityred === true) {
            visibilityred.setAttribute("visible",false);
            visibilitygreen.setAttribute("visible",true);
            alert("Condição 01");
        } else {
            visibilityred.setAttribute("visible",true);
            visibilitygreen.setAttribute("visible",false);
            alert("Condição 02");
        }
    }


// Function to open website
        function openWebsite() {
            // Implement your logic to open a different website for each object
            window.open("https://www.invisio360.com", "_blank");
            alert('Opening website...');
        }