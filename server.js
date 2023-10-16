const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(express.json()); // Para poder receber e interpretar JSON nas requisições

// Rotas
app.use('/users', userRoutes);

// Middleware de tratamento de erros (colocar no final, após todas as outras rotas e middlewares)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
