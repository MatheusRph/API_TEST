document.addEventListener("DOMContentLoaded", function() {

    showLoading();

    meuValor = 'Marília'
    fetch(meuValor)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao buscar dados climáticos: ' + response.status);
        })
        .then(data => {
            document.getElementById('city').innerHTML = meuValor;
            document.getElementById('C').innerHTML = 'C';
            document.getElementById('temperature').innerHTML = parseInt(data.Temperatura);
            // document.getElementById('humidity').textContent = data.Umidade;
            // document.getElementById('windSpeed').textContent = data.VelocidadeDoVento;
            document.getElementById('weather').textContent = data.Clima;


            if (data.Clima === "Tempo nublado") {
                document.getElementById('chuva').src = "img/clima/nublado.gif";
            } else if (data.Clima === "Poucas Nuvens" || data.Clima === "Nuvens Quebradas" || data.Clima === "Nuvens Esparsas") {
                document.getElementById('chuva').src = "img/clima/nublado.gif";
            } else if (data.Clima === "Chuva leve" || data.Clima === "Chuva moderada") {
                document.getElementById('chuva').src = "img/clima/chuva.gif";
            } else if (data.Clima === "Nevoeiro" || data.Clima === "Nevoeiro") {
                document.getElementById('chuva').src = "img/clima/enevoado.gif";
            } else if (data.Clima === "Céu Limpo") {
                document.getElementById('chuva').src = "img/clima/sol.gif";
            } else if (data.Clima === "Chuvisco de Baixa Intensidade" || data.Clima === "Chuvisco" || data.Clima === "Chuvisco de Alta Intensidade" || data.Clima === "Chuva Fraca" || data.Clima === "Chuva" || data.Clima === "Chuva Forte" || data.Clima === "Chuva Muito Forte" || data.Clima === "Chuva Extrema" || data.Clima === "Chuva Congelante") {
                document.getElementById('chuva').src = "img/clima/chuva.gif";
            } else if (data.Clima === "Neve Fraca" || data.Clima === "Neve" || data.Clima === "Neve Forte" || data.Clima === "Aguaneve" || data.Clima === "Aguaceiro com Neve" || data.Clima === "Chuva e Neve Fraca" || data.Clima === "Chuva e Neve" || data.Clima === "Neve Fraca" || data.Clima === "Neve" || data.Clima === "Neve Forte") {
                document.getElementById('chuva').src = "img/clima/neve.gif";
            } else if (data.Clima === "Tempestade com Chuva Fraca" || data.Clima === "Tempestade com Chuva" || data.Clima === "Tempestade com Chuva Forte" || data.Clima === "Trovoada Fraca" || data.Clima === "Trovoada" || data.Clima === "Trovoada Forte" || data.Clima === "Trovoada Irregular" || data.Clima === "Trovoada com Chuvisco Fraco" || data.Clima === "Trovoada com Chuvisco" || data.Clima === "Trovoada com Chuvisco Forte") {
                document.getElementById('chuva').src = "img/clima/tempestade.gif";
            } else {
                // Se não houver correspondência, defina uma imagem padrão
                document.getElementById('chuva').src = "img/clima/imagem_padrao.jpg";
            }                
        })
        .catch(error => {
            document.getElementById('city').textContent = 'Erro ao buscar dados';
            console.error(error.message);
        });
});