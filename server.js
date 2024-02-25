const express = require('express');
const axios = require('axios');
const path = require("path");
const cors = require("cors");

const server = express();

// Middleware para permitir solicitações de diferentes origens (CORS)
server.use(cors());

// Middleware para análise de solicitações JSON
server.use(express.json());

// Middleware para servir arquivos estáticos
server.use(express.static(path.join(__dirname, 'pages')));

// Rota para exibir o arquivo HTML
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/home.html'), (err) => {
        if (err) {
            res.status(500).send("Erro ao enviar o arquivo HTML");
        }
    });
});

server.use("/contato", require('./api/api.js')); // Corrigido para usar '/api' como prefixo para as rotas da API

server.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/contato.html'), (err) => {
        if (err) {
            res.status(500).send("Erro ao enviar o arquivo HTML");
        }
    });
});

server.use("/", require('./api/api.js')); // Corrigido para usar '/api' como prefixo para as rotas da API

// Configuração do servidor Express
const PORT = process.env.PORT || 2535;

// Iniciar o servidor
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = server;