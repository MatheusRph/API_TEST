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
    "few clouds": "Poucas Nuvens"
};

// Rota para obter dados climáticos
router.get('/:cidade', async (req, res) => { // Corrigido para usar 'router.get' em vez de 'api.get'
    const city = req.params.cidade;

    try {
        // Requisição para a API de clima
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`); // Corrigido para usar 'appid' em vez de 'serverid'
        
        // Verifica se a resposta da API foi bem-sucedida
        if (response.status === 200) {
            // Tradução do tipo de clima (se disponível)
            const clima = traducaoClima[response.data.weather[0].description] || response.data.weather[0].description;
            
            // Dados do clima a serem enviados como resposta
            const weatherData = {
                Temperatura: response.data.main.temp,
                Umidade: response.data.main.humidity,
                VelocidadeDoVento: response.data.wind.speed,
                Clima: clima
            };

            // Envio da resposta com os dados do clima
            res.status(200).json(weatherData);
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
