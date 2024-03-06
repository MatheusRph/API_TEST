const express = require('express');
const axios = require('axios');
const cors = require('cors');
const router = express.Router(); // Corrigido para usar 'router' em vez de 'api'

// Middleware para permitir solicitações de diferentes origens (CORS)
router.use(cors());

// Middleware para análise de solicitações JSON
router.use(express.json());

// Importando config.json diretamente como um módulo
const config = require("./config.json"); // Corrigido o caminho para o arquivo config.json

// Chave da API do arquivo de configuração
const API_KEY = config.API_KEY;

// Tradução dos tipos de clima
const traducaoClima = {
    "few clouds": "Poucas Nuvens",
    "overcast clouds": "Tempo nublado",
    "light rain": "Chuva leve",
    "moderate rain": "Chuva moderada",
    "haze": "Nevoeiro",
    // Aqui adicionamos outras traduções com base na API
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
    const city = req.params.cidade;

    try {
        // A URL foi ajustada para usar o nome da cidade (`q`) em vez de coordenadas geográficas (`lat` e `lon`)
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=pt&appid=${API_KEY}&dt_txt=24h`;
        const response = await axios.get(url);

        if (response.status === 200) {

            res.status(200).json(response.data);
        } else {
            // Trata os casos em que a API responde com um status diferente de 200 OK
            res.status(response.status).json({ erro: "Erro ao obter previsão do tempo." });
        }
    } catch (error) {
        console.error("Erro na requisição de previsão do clima:", error);
        // Diferencia erros de resposta da API de outros tipos de erros
        if (error.response) {
            // Erros retornados pela API OpenWeatherMap
            res.status(error.response.status).json({ erro: "Erro ao obter dados do clima." });
        } else {
            // Outros erros (rede, configuração, etc.)
            res.status(500).json({ erro: "Erro interno do servidor." });
        }
    }
});

module.exports = router; // Corrigido para exportar 'router' em vez de 'api'