function pesquisa_cidade_req(event) {
    if (event.key === "Enter") {
        showLoading();
        const inputElement = document.getElementById("pesquisa");
        const city = inputElement.value;
        
        req(city);
        prev(city);
    }
}

function pesquisa_cidade_prev(event) {
    if (event.key === "Enter") {
        showLoading();
        const inputElement = document.getElementById("pesquisa");
        const city = inputElement.value;
        
        prev(city);
    }
}
