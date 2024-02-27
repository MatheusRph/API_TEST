// Função para mostrar o elemento de carregamento
function showLoading(){
    const div = document.createElement('div');
    div.classList.add("loading", "centralize");

    const img = document.createElement("img"); // Corrigido: use 'img' em vez de 'label'
    img.src = "img/loading.gif"; // Corrigido: atribui 'src' à variável 'img'

    div.appendChild(img); // Corrigido: adiciona a imagem ao div

    document.body.appendChild(div);
}

// Função para ocultar o elemento de carregamento
function hideLoading(){
    const loadings = document.getElementsByClassName("loading");
    if (loadings.length) {
        loadings[0].remove();
    }
}

// Ouve o evento 'load' no objeto window para esconder o elemento de carregamento quando a página terminar de carregar completamente
window.addEventListener('load', function() {
    // Define um tempo mínimo de 4 segundos antes de ocultar o elemento de carregamento
    setTimeout(hideLoading, 3000);
});
