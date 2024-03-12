    function toggleVisibility() {
      var elementoVermelho = document.getElementById('idred');
      var elementoAzul = document.getElementById('idblue');
      var elementoVerde = document.getElementById('idgreen');
      if (elementoVermelho.getAttribute('visible')) {
        elementoVermelho.setAttribute('visible', 'false'); // Se visível, torna não visível
        elementoAzul.setAttribute('visible', 'false'); // Se visível, torna não visível
        elementoVerde.setAttribute('visible', 'true'); // Se visível, torna não visível
      } else {
        elementoVermelho.setAttribute('visible', 'true'); // Se visível, torna não visível
        elementoAzul.setAttribute('visible', 'true'); // Se visível, torna não visível
        elementoVerde.setAttribute('visible', 'false'); // Se visível, torna não visível
      }
    }


// Function to open website
        function openWebsite() {
            // Implement your logic to open a different website for each object
            window.open("https://www.invisio360.com", "_blank");
            alert('Opening website...');
        }