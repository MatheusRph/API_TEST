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
router.get('/:cidade', async (req, res) => { // Corrigido para usar 'router.get' em vez de 'api.get'
    const city = req.params.cidade;

    try {
        // Requisição para a API de clima
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`); // Corrigido para usar 'appid' em vez de 'serverid'
        
        // Verifica se a resposta da API foi bem-sucedida
        if (response.status === 200) {
            // Tradução do tipo de clima (se disponível)
            const clima = traducaoClima[response.data.weather[0].description] || response.data.weather[0].description;
            
            // Dados do clima a serem enviados como resposta
            

            // Envio da resposta com os dados do clima
            res.status(200).json(forcast);
        } else {
            // Se a resposta da API não for bem-sucedida, envia uma mensagem de erro
            res.status(response.status).send({ erro: "Erro ao obter dados" });
        }
    } catch (error) {
        // Em caso de erro durante a solicitação à API
        console.error("Erro ao obter dados do clima:", error);
        if (error.response) {
            res.status(error.response.status).send("Erro ao obter dados do clima");
        } else {
            res.status(500).send("Erro interno do servidor");
        }
    }
});

module.exports = router; // Corrigido para exportar 'router' em vez de 'api'