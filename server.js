const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const errorHandlerMiddleware = require('./src/middlewares/errorHandler');

const app = express();

// Middlewares
app.use(express.json()); // Para poder receber e interpretar JSON nas requisições

// Rotas
app.use('/users', userRoutes);

// Middleware de tratamento de erros no final, depois de todas as outras rotas e middlewares.
app.use(errorHandlerMiddleware);


// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
