function pesquisa_cidade(event) {
    if (event.key === "Enter") {
        // showLoading();
        const inputElement = document.getElementById("pesquisa");
        const city = inputElement.value;
        
        // req(city);
        prev(city);
    }
}
