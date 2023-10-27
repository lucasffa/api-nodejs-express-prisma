/**
 * validationErrorHandler.js
 * 
 * Middleware responsável por lidar com erros de validação originados da biblioteca `express-validator`.
 * 
 * Como funciona:
 * - O middleware faz uso da função `validationResult` fornecida pelo `express-validator` para obter os resultados da validação.
 * - Se houver erros de validação, eles são formatados e enviados na resposta como um array de erros com status 400 (Bad Request).
 * - Se não houver erros de validação, o middleware prossegue para o próximo middleware ou controlador.
 * 
 * Utilização:
 * Este middleware deve ser colocado após os middlewares de validação `express-validator` nas rotas, para garantir que os erros de validação, 
 * se existirem, sejam capturados e tratados de forma adequada.
 * 
 * Exemplo:
 * ```javascript
 * app.post('/user', UserValidations.create(), validationErrorHandler, UserController.create);
 * ```
 * 
 * @module validationErrorHandler
 */

const { validationResult } = require('express-validator');

const validationErrorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorCode = req.errorCode || 400; // Use 400 como padrão se o errorCode não estiver definido
        return res.status(400).json({
            message: errors.array()[0].msg,
            errorCode: errorCode
        });
    }
    next();
};



module.exports = validationErrorHandler;
