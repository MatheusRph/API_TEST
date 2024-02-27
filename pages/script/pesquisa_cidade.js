function pesquisa_cidade(event) {
    if (event.key === "Enter") {
        showLoading();
        const inputElement = document.getElementById("pesquisa");
        const city = inputElement.value;
        
        req(city);
    }
}

// Adiciona um ouvinte de evento para capturar a tecla "Enter" pressionada no input
document.getElementById("pesquisa").addEventListener("keypress", pesquisa_cidade);
