document.addEventListener('DOMContentLoaded', function () {
    // Carrega o conteúdo do arquivo body-content.html
    fetch('body-content.html')
        .then(response => response.text())
        .then(data => {
            document.body.innerHTML = data;
        })
        .catch(error => console.error('Error loading body content:', error));
});