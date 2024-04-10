function req(cidade) { // função para fazer uma requisição fetch à API de clima
    fetch(cidade)
   .then(response => {
        if (response.ok) {
            return response.json(); // se a resposta for ok, retorna o json
        }
        throw new Error('Erro ao buscar dados climáticos: ' + response.status); // se não, lança um erro com a mensagem e o status da resposta
    })
   .then(data => {
        // preenche os elementos do DOM com os dados do clima
        document.getElementById('city').textContent = data.Nome;
        document.getElementById('C').innerHTML = 'C';
        document.getElementById('temperature').innerHTML = Math.round(data.Temperatura);
        document.getElementById('humidity').textContent = data.Umidade + '%';
        document.getElementById('windSpeed').textContent = data.VelocidadeDoVento + 'km/h';
        document.getElementById('weather').textContent = data.Clima;

        // define a imagem do clima de acordo com o clima atual
        if (data.Clima === "Tempo nublado") {
            document.getElementById('climaPng').src = "img/clima/nublado.gif";
        } else if (data.Clima === "Poucas Nuvens" || data.Clima === "Nuvens Quebradas" || data.Clima === "Nuvens Esparsas") {
            document.getElementById('climaPng').src = "img/clima/nublado.gif";
        } else if (data.Clima === "Chuva leve" || data.Clima === "Chuva moderada") {
            document.getElementById('climaPng').src = "img/clima/chuva.gif";
        } else if (data.Clima === "Nevoeiro" || data.Clima === "Nevoeiro") {
            document.getElementById('climaPng').src = "img/clima/enevoado.gif";
        } else if (data.Clima === "Céu Limpo") {
            document.getElementById('climaPng').src = "img/clima/sol.gif";
        } else if (data.Clima === "Chuvisco de Baixa Intensidade" || data.Clima === "Chuvisco" || data.Clima === "Chuvisco de Alta Intensidade" || data.Clima === "Chuva Fraca" || data.Clima === "Chuva" || data.Clima === "Chuva Forte" || data.Clima === "Chuva Muito Forte" || data.Clima === "Chuva Extrema" || data.Clima === "Chuva Congelante") {
            document.getElementById('climaPng').src = "img/clima/chuva.gif";
        } else if (data.Clima === "Neve Fraca" || data.Clima === "Neve" || data.Clima === "Neve Forte" || data.Clima === "Aguaneve" || data.Clima === "Aguaceiro com Neve" || data.Clima === "Chuva e Neve Fraca" || data.Clima === "Chuva e Neve" || data.Clima === "Neve Fraca" || data.Clima === "Neve" || data.Clima === "Neve Forte") {
            document.getElementById('climaPng').src = "img/clima/neve.gif";
        } else if (data.Clima === "Tempestade com Chuva Fraca" || data.Clima === "Tempestade com Chuva" || data.Clima === "Tempestade com Chuva Forte" || data.Clima === "Trovoada Fraca" || data.Clima === "Trovoada" || data.Clima === "Trovoada Forte" || data.Clima === "Trovoada Irregular" || data.Clima === "Trovoada com Chuvisco Fraco" || data.Clima === "Trovoada com Chuvisco" || data.Clima === "Trovoada com Chuvisco Forte") {
            document.getElementById('climaPng').src = "img/clima/tempestade.gif";
        } else {
            // se não houver correspondência, defina uma imagem padrão
            document.getElementById('climaPng').src = "img/clima/sol.jpg";
        }
        setTimeout(hideLoading, 2100); // esconde o loading após 2,1 segundos
    })
    .catch(error => {
        hideLoading(); // esconde o loading
        // preenche os elementos do DOM com a mensagem de erro
        document.getElementById('temperature').textContent = 'Erro ao obter dados';
    });
}
