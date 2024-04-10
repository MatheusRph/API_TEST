// Define a function called 'prev' that takes a 'city' parameter
function prev(city) {

    // Fetch weather data for the specified city from the '/prev/${city}' endpoint
    fetch(`/prev/${city}`)
     .then(response => {
  
        // Check if the response status is OK (2xx range)
        if (response.ok) {
  
          // Parse the response as JSON
          return response.json();
        }
  
        // Throw an error with a custom error message if the response status is not OK
        throw new Error('Erro ao buscar dados climáticos: ' + response.status);
      })
  
      // Process the JSON response and extract the 'mediasTemp' and 'probabilidadeClima' arrays
     .then(data => {
        const mediasTemp = data.mediasTemp;
        const probabilidadeClima = data.probabilidadeClima;
  
        // Iterate through the 'mediasTemp' and 'probabilidadeClima' arrays and update the user interface accordingly
        for (let i = 0; i < 5; i++) {
          const temperature = mediasTemp[i];
          const climaDescri = probabilidadeClima[i];
  
          // Update the temperature
          const tempDia = document.getElementById(`tempD${i}`);
          if (tempDia) {
            tempDia.innerHTML = `${temperature}<sub class="displayflex" style="font-size: 10px;">C</sub>`;
          }
  
          // Update the weather icon
          const clima = document.getElementById(`clima${i}`);
          if (clima) {
            if (climaDescri === "Tempo nublado" || climaDescri === "Poucas Nuvens" || climaDescri === "Nuvens Quebradas" || climaDescri === "Nuvens Esparsas") {
              clima.src = "img/clima/nublado.gif";
            } else if (climaDescri === "Chuva leve" || climaDescri === "Chuva moderada" || climaDescri === "Chuvisco de Baixa Intensidade" || climaDescri === "Chuvisco" || climaDescri === "Chuvisco de Alta Intensidade" || climaDescri === "Chuva Fraca" || climaDescri === "Chuva" || climaDescri === "Chuva Forte" || climaDescri === "Chuva Muito Forte" || climaDescri === "Chuva Extrema" || climaDescri === "Chuva Congelante") {
              clima.src = "img/clima/chuva.gif";
            } else if (climaDescri === "Nevoeiro") {
              clima.src = "img/clima/enevoado.gif";
            } else if (climaDescri === "Céu Limpo") {
              clima.src = "img/clima/sol.gif";
            } else if (climaDescri === "Neve Fraca" || climaDescri === "Neve" || climaDescri === "Neve Forte" || climaDescri === "Aguaneve" || climaDescri === "Aguaceiro com Neve" || climaDescri === "Chuva e Neve Fraca" || climaDescri === "Chuva e Neve" || climaDescri === "Neve Fraca" || climaDescri === "Neve" || climaDescri === "Neve Forte") {
              clima.src = "img/clima/neve.gif";
            } else if (climaDescri === "Tempestade com Chuva Fraca" || climaDescri === "Tempestade com Chuva" || climaDescri === "Tempestade com Chuva Forte" || climaDescri === "Trovoada Fraca" || climaDescri === "Trovoada" || climaDescri === "Trovoada Forte" || climaDescri === "Trovoada Irregular" || climaDescri === "Trovoada com Chuvisco Fraco" || climaDescri === "Trovoada com Chuvisco" || climaDescri === "Trovoada com Chuvisco Forte") {
              clima.src = "img/clima/tempestade.gif";
            } else {
              // Set a default weather icon if no match is found
              clima.src= "img/clima/sol.jpg";
            }
          }
        }
  
        // Hide the loading spinner
        hideLoading();
      })
  
      // Handle any errors that might occur during the fetch request or data processing
     .catch(error => {
        // Hide the loading spinner on error
        hideLoading();
     });
  }