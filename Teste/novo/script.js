var visibilityred = document.getElementById(red);
var visibilitygreen = document.getElementById(green);
    
    function click() {
        if (visibilityred === "true") {
            visibilityred = "false";
            visibilitygreen = "true";
            alert("Condição 01");
        } else {
            visibilityred = "true";
            visibilitygreen = "false";
            alert("Condição 02");
        }
    };
