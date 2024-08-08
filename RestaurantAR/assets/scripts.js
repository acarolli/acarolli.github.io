document.addEventListener("DOMContentLoaded", function() {
    const categories = [
        { id: "entradas", name: "Entradas", items: [
            { name: "Item 1", modelUrl: "modelos3d/default.html" },
            { name: "Item 2", modelUrl: "modelos3d/objeto2.html" },
            // Continue adicionando os itens aqui
        ] },
        { id: "porcoes", name: "Porções", items: [/* Adicione os itens aqui */] },
        { id: "guarnicoes", name: "Guarnições", items: [/* Adicione os itens aqui */] },
        // Outras categorias
    ];

    const menu = document.getElementById("menu");

    categories.forEach(category => {
        const section = document.createElement("section");
        section.className = "category";
        section.id = category.id;

        const title = document.createElement("h2");
        title.textContent = category.name;
        section.appendChild(title);

        category.items.forEach(item => {
            const div = document.createElement("div");
            div.className = "item";
            div.textContent = item.name;
            div.addEventListener("click", () => load3DModel(item.modelUrl));
            section.appendChild(div);
        });

        menu.appendChild(section);
    });
});

function load3DModel(modelUrl) {
    const iframe = document.getElementById('ar-view');
    iframe.src = modelUrl;
}
