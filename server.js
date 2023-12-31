/**
 * server.js
 * Data: 17/10/2023
 * Autor: http://github.com/lucasffa/
 * Descrição: Configura e inicia o servidor Express para o projeto.
 * Objetivo: Atuar como ponto de entrada principal para a aplicação, configurando middlewares, rotas e inicializando o servidor.
 * Dependências: 
 * - express: Framework web para criação do servidor.
 * - userRoutes: Rotas relacionadas à entidade de usuário.
 * - errorHandlerMiddleware: Middleware para tratamento centralizado de erros.
 * 
 * Detalhes:
 * 1. Configuração de middlewares base como o 'express.json()' para interpretar corpos de requisição JSON.
 * 2. Definição das rotas para gerenciamento de usuários.
 * 3. Inicialização do servidor na porta definida.
 * 
 * Exemplo de Uso:
 * Para iniciar o servidor, execute o comando no terminal:
 * ```bash
 * node server.js
 * ```
 *
 */

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const userRoutes = require('./src/routes/userRoutes');
const errorHandlerMiddleware = require('./src/middlewares/errorHandler');
const TokenBlacklist = require('./src/models/tokenBlacklist.js'); // Importar a classe do modelo

const { MongoClient, ServerApiVersion } = require('mongodb');

const credentials = 'C:/codando/node/api-nodejs-express-prisma/certificates/mongodb.pem'; // Substitua pelo caminho correto do seu certificado .pem

const app = express();


const client = new MongoClient('mongodb+srv://cluster0.rvd6gcq.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1
});



// Conectar ao MongoDB
async function connectDB() {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
      const database = client.db("mymongodb"); // Substitua pelo nome do seu banco de dados
      const collection = database.collection("expiredtokens"); // Substitua pelo nome da sua coleção
  
      // Armazenar a coleção na instância do Express para uso futuro
      app.set('tokenBlacklist', new TokenBlacklist(collection));
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
      process.exit(1);
    }
  }
  
  connectDB().catch(console.error);
  
  


// Middlewares
app.use(helmet());
app.use(cors()); // Habilitando o CORS
app.use(express.json()); // Para poder receber e interpretar JSON nas requisições

// Rotas
app.use('/users', userRoutes);
app.get('/health', (req, res) => res.send('OK'));





// Middleware de tratamento de erros no final, depois de todas as outras rotas e middlewares.
app.use(errorHandlerMiddleware);





// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
