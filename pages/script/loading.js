// Função para mostrar o elemento de carregamento
function showLoading(){
    const div = document.createElement('div');
    div.classList.add("loading", "centralize");

    const img = document.createElement("img");
    img.src = "img/loading.gif"; 

    div.appendChild(img); 

    document.body.appendChild(div);
}

// Função para ocultar o elemento de carregamento
function hideLoading(){
    const loadings = document.getElementsByClassName("loading");
    if (loadings.length) {
        loadings[0].remove();
    }
}