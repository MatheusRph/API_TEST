function pesquisa_cidade(event) {
    if (event.key === "Enter") {
        const inputElement = document.getElementById("pesquisa");
        const meuValor = inputElement.value;
        
        // Agora você pode fazer a chamada fetch com o valor atualizado
        fetch(meuValor)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro ao buscar dados climáticos: ' + response.status);
            })
            .then(data => {
                document.getElementById('city').innerHTML = meuValor;
                document.getElementById('temperature').innerHTML = parseInt(data.Temperatura);
                // document.getElementById('humidity').textContent = data.Umidade;
                // document.getElementById('windSpeed').textContent = data.VelocidadeDoVento;
                document.getElementById('weather').textContent = data.Clima;
            })
            .catch(error => {
                document.getElementById('temperature').textContent = 'Não foi possível obter os dados';
                document.getElementById('humidity').textContent = 'Não foi possível obter os dados';
                document.getElementById('windSpeed').textContent = 'Não foi possível obter os dados';
                document.getElementById('weather').textContent = 'Não foi possível obter os dados';
                console.error(error.message);
            });
    }
}

// Adiciona um ouvinte de evento para capturar a tecla "Enter" pressionada no input
document.getElementById("pesquisa").addEventListener("keypress", pesquisa_cidade);
