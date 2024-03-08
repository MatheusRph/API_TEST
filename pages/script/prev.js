function prev(city){
    fetch(`/prev/${city}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Erro ao buscar dados climáticos: ' + response.status);
    })
    .then(data => {
        const mediasTemp = data.mediasTemp;
        // const probabilidadeClima = data.probabilidadeClima;

        // // Agora você pode usar essas informações como desejar
        // console.log('Médias de temperatura:', mediasTemp);
        // console.log('Probabilidade de clima:', probabilidadeClima);
        
        for(let i = 0; i < 5; i++) {
            // console.log(`Média dia${i+1}: ` + data.mediasTemp[i])
            const tempDia = document.getElementById(`tempD${i}`);
            // const temperature = data.mediasTemp[i];
            // const clima = document.getElementById(`weatherPng${i}`);
            
            // for (let b = 0; i<=32; i+=8){
            //     const climaDescri = data.probabilidadeClima[`${b}`]
            //     console.log(climaDescri);
                
            //     if (climaDescri === "Tempo nublado") {
            //         document.getElementById('climaPng').src = "img/clima/nublado.gif";
            //     } else if (climaDescri === "Poucas Nuvens" || climaDescri === "Nuvens Quebradas" || climaDescri === "Nuvens Esparsas") {
            //         document.getElementById('climaPng').src = "img/clima/nublado.gif";
            //     } else if (climaDescri === "Chuva leve" || climaDescri === "Chuva moderada") {
            //         document.getElementById('climaPng').src = "img/clima/chuva.gif";
            //     } else if (climaDescri === "Nevoeiro" || climaDescri === "Nevoeiro") {
            //         document.getElementById('climaPng').src = "img/clima/enevoado.gif";
            //     } else if (climaDescri === "Céu Limpo") {
            //         document.getElementById('climaPng').src = "img/clima/sol.gif";
            //     } else if (climaDescri === "Chuvisco de Baixa Intensidade" || climaDescri === "Chuvisco" || climaDescri === "Chuvisco de Alta Intensidade" || climaDescri === "Chuva Fraca" || climaDescri === "Chuva" || climaDescri === "Chuva Forte" || climaDescri === "Chuva Muito Forte" || climaDescri === "Chuva Extrema" || climaDescri === "Chuva Congelante") {
            //         document.getElementById('climaPng').src = "img/clima/chuva.gif";
            //     } else if (climaDescri === "Neve Fraca" || climaDescri === "Neve" || climaDescri === "Neve Forte" || climaDescri === "Aguaneve" || climaDescri === "Aguaceiro com Neve" || climaDescri === "Chuva e Neve Fraca" || climaDescri === "Chuva e Neve" || climaDescri === "Neve Fraca" || climaDescri === "Neve" || climaDescri === "Neve Forte") {
            //         document.getElementById('climaPng').src = "img/clima/neve.gif";
            //     } else if (climaDescri === "Tempestade com Chuva Fraca" || climaDescri === "Tempestade com Chuva" || climaDescri === "Tempestade com Chuva Forte" || climaDescri === "Trovoada Fraca" || climaDescri === "Trovoada" || climaDescri === "Trovoada Forte" || climaDescri === "Trovoada Irregular" || climaDescri === "Trovoada com Chuvisco Fraco" || climaDescri === "Trovoada com Chuvisco" || climaDescri === "Trovoada com Chuvisco Forte") {
            //         document.getElementById('climaPng').src = "img/clima/tempestade.gif";
            //     } else {
            //         // Se não houver correspondência, defina uma imagem padrão
            //         document.getElementById('climaPng').src = "img/clima/sol.jpg";
            //     }      

            //     clima.src = climaDescri
            // }

            // if (i != 0) {
            //     tempDia.innerHTML = `${temperature}<sub class="displayflex" style="font-size: 10px;">C</sub>`;
            // }

            if (tempDia) {
                tempDia.innerHTML = `${temperature}<sub id="celcius">C</sub>
                <img id="temperaturePng" class="displayflex center-start" src="img/temperature2.png" alt="">`;
            }

        }

        hideLoading();
    })
    .catch(error => {
        hideLoading();
    });
}