/**
 * src/middlewares/errorHandlerMiddleware.js
 * Data: 17/10/2023
 * Autor: http://github.com/lucasffa/
 * Descrição: Middleware para tratamento de erros em requisições Express. 
 *            Captura erros lançados em outros middlewares ou rotas e 
 *            envia uma resposta formatada ao cliente.
 * 
 * Funcionalidade:
 * - Este middleware é utilizado para capturar e tratar erros que possam ocorrer durante 
 *   o processamento de uma requisição no Express.
 * 
 * - Se um erro é lançado em qualquer middleware ou rota anterior a este, 
 *   o Express passará o erro para este middleware.
 * 
 * - O erro capturado é registrado no console e, em seguida, uma resposta é enviada 
 *   ao cliente com o status HTTP correspondente e uma mensagem de erro. 
 *   A resposta inclui também um código de erro, se estiver presente no erro capturado.
 * 
 * Como usar:
 * 1. Importe o `errorHandlerMiddleware` no arquivo principal do Express (geralmente `app.js` ou `server.js`).
 * 2. Adicione este middleware no final da pilha de middlewares e rotas, 
 *    para garantir que ele capture quaisquer erros lançados.
 * 
 * Exemplo:
 * ```javascript
 * const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
 * // ... [Outros middlewares e rotas]
 * app.use(errorHandlerMiddleware);
 * ```
 * 
 * Detalhes do Middleware:
 * 
 * @param {Error} err - O erro lançado por algum middleware ou rota anterior.
 * @param {Request} req - O objeto de requisição do Express.
 * @param {Response} res - O objeto de resposta do Express.
 * @param {Function} next - Função callback para passar a execução para o próximo middleware.
 * 
 * @returns {Response} Uma resposta formatada contendo a mensagem de erro e, se disponível, um código de erro.
 * 
 * Observações:
 * - O middleware depende da propagação de erros usando o método `next` dos middlewares/rotas anteriores.
 * - Se o erro não tiver um código de status HTTP definido, o padrão será `500` (Internal Server Error).
 * 
 */

const errorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message,
        errorCode: err.errorCode
    });
};

module.exports = errorHandlerMiddleware;
