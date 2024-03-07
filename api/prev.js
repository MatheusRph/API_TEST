// Importação dos módulos necessários
const express = require('express'); // Importa o módulo 'express' para criar o servidor
const axios = require('axios'); // Importa o módulo 'axios' para fazer requisições HTTP
const cors = require('cors'); // Importa o módulo 'cors' para lidar com a política de mesma origem (CORS)

// Inicialização do roteador do Express
const router = express.Router(); // Cria um roteador para as rotas

// Middleware para permitir solicitações de diferentes origens (CORS)
router.use(cors());

// Middleware para análise de solicitações JSON
router.use(express.json());

// Importação do arquivo de configuração
const config = require("./config.json"); // Importa as configurações, como a chave da API, do arquivo config.json

// Chave da API do arquivo de configuração
const API_KEY = config.API_KEY; // Armazena a chave da API obtida do arquivo de configuração

// Tradução dos tipos de clima
const traducaoClima = {
    // Mapeamento das descrições do tempo fornecidas pela API para suas traduções em português
    // Cada descrição original é mapeada para sua tradução correspondente
    "few clouds": "Poucas Nuvens",
    "overcast clouds": "Tempo nublado",
    "light rain": "Chuva leve",
    "moderate rain": "Chuva moderada",
    "haze": "Nevoeiro",
    "broken clouds": "Nuvens Quebradas",
    "scattered clouds": "Nuvens Esparsas",
    "clear sky": "Céu Limpo",
    "mist": "Nevoeiro",
    "fog": "Nevoeiro",
    "light intensity drizzle": "Chuvisco de Baixa Intensidade",
    "drizzle": "Chuvisco",
    "heavy intensity drizzle": "Chuvisco de Alta Intensidade",
    "light intensity shower rain": "Chuva Fraca",
    "shower rain": "Chuva",
    "heavy intensity rain": "Chuva Forte",
    "very heavy rain": "Chuva Muito Forte",
    "extreme rain": "Chuva Extrema",
    "freezing rain": "Chuva Congelante",
    "light snow": "Neve Fraca",
    "snow": "Neve",
    "heavy snow": "Neve Forte",
    "sleet": "Aguaneve",
    "shower sleet": "Aguaceiro com Neve",
    "light rain and snow": "Chuva e Neve Fraca",
    "rain and snow": "Chuva e Neve",
    "light shower snow": "Neve Fraca",
    "shower snow": "Neve",
    "heavy shower snow": "Neve Forte",
    "thunderstorm with light rain": "Tempestade com Chuva Fraca",
    "thunderstorm with rain": "Tempestade com Chuva",
    "thunderstorm with heavy rain": "Tempestade com Chuva Forte",
    "light thunderstorm": "Trovoada Fraca",
    "thunderstorm": "Trovoada",
    "heavy thunderstorm": "Trovoada Forte",
    "ragged thunderstorm": "Trovoada Irregular",
    "thunderstorm with light drizzle": "Trovoada com Chuvisco Fraco",
    "thunderstorm with drizzle": "Trovoada com Chuvisco",
    "thunderstorm with heavy drizzle": "Trovoada com Chuvisco Forte"
};

// Rota para obter dados climáticos
router.get('/:cidade', async (req, res) => {
    const city = req.params.cidade; // Obtém o nome da cidade a partir dos parâmetros da URL

    try {
        // Constrói a URL da API do OpenWeatherMap com base no nome da cidade e na chave da API
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&dt_txt=24h&units=metric`;

        // Faz uma requisição GET para a API do OpenWeatherMap para obter os dados climáticos da cidade especificada
        const response = await axios.get(url);

        if (response.status === 200) {
            // Se a resposta da API for bem-sucedida (status 200), processa os dados recebidos
            const forecastData = response.data.list.map(item => ({
                // Mapeia os dados recebidos para um formato mais conveniente
                Temp: item.main.temp, // Temperatura em graus Celsius
                Clima: item.weather[0].description, // Descrição do tempo (weather description)
            }));

            const mediasTemp = []; // Array para armazenar as temperaturas médias
            const probabilidadeClima = {}; // Objeto para armazenar a probabilidade das descrições do tempo

            // Loop para processar os dados por intervalos de 24 horas (8 amostras)
            for (let i = 0; i < forecastData.length; i += 8) {
                const subset = forecastData.slice(i, i + 8); // Obtém um subconjunto de dados para cada intervalo de 24 horas

                // Cálculo da probabilidade da descrição do tempo para o subconjunto atual
                const countByWeather = subset.reduce((acc, { Clima }) => {
                    acc[Clima] = (acc[Clima] || 0) + 1; // Conta o número de ocorrências de cada descrição do tempo
                    return acc;
                }, {});

                const totalSamples = subset.length; // Número total de amostras no subconjunto

                // Cálculo das probabilidades de cada descrição do tempo
                const probabilities = Object.entries(countByWeather).reduce((acc, [weather, count]) => {
                    acc[weather] = (count / totalSamples) * 100; // Calcula a porcentagem de ocorrência de cada descrição do tempo
                    return acc;
                }, {});

                // Encontra a descrição do tempo mais provável com base nas probabilidades calculadas
                const mostProbableWeather = Object.keys(probabilities).reduce((a, b) => probabilities[a] > probabilities[b] ? a : b);
                
                // Armazena a descrição do tempo mais provável para o intervalo de 24 horas atual
                probabilidadeClima[i] = traducaoClima[mostProbableWeather];

                // Calcula a temperatura média para o intervalo de 24 horas atual
                const totalTemperaturas = subset.reduce((acumulador, atual) => acumulador + atual.Temp, 0); // Soma todas as temperaturas
                const media = Math.round(totalTemperaturas / subset.length); // Calcula a média das temperaturas
                mediasTemp.push(media); // Adiciona a temperatura média ao array
            }

            // Retorna os dados processados como resposta da requisição
            res.status(200).json({ forecastData, mediasTemp, probabilidadeClima });
        } else {
            // Se a resposta da API não for bem-sucedida, retorna uma mensagem de erro
            res.status(response.status).json({ erro: "Erro ao obter previsão do tempo." });
        }
    } catch (error) {
        // Se ocorrer algum erro durante o processamento da requisição, trata o erro e retorna uma mensagem adequada
        console.error("Erro na requisição de previsão do clima:", error);
        if (error.response) {
            res.status(error.response.status).json({ erro: "Erro ao obter dados do clima." });
        } else {
            res.status(500).json({ erro: "Erro interno do servidor." });
        }
    }
});

module.exports = router; // Exporta o roteador do Express para ser utilizado em outros arquivos