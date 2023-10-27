/**
 * authValidations.js
 * Data: 27/10/2023
 * Autor: http://github.com/lucasffa/
 * Descrição:   Define as validações para as operações relacionadas à autenticação e autorização de usuários.
 *              Este módulo fornece um conjunto de classes de validação para operações relacionadas a validação, utilizando a biblioteca `express-validator`.
 * 
 * Métodos:
 * 
 * - `login()`: 
 *   - 
 *   - Campos validados:
 *     - `email`: Deve ser um e-mail válido e não estar vazio.
 *     - `password`: Deve ter pelo menos 8 caracteres.
 * 
 *  Documentação dos códigos de erros (todos com Status HTTP 400):
 *  - `3011`: E-mail inválido.
 *  - `3012`: E-mail é obrigatório.
 *  - `3021`: Senha inválida.
 *  - `3022`: Senha é obrigatória.
 * 
 * @module authValidations
 */


const { body, param, validationResult } = require('express-validator');


// Definindo os códigos de erro como um Enum
const ERROR_CODES = {
    EMAIL_INVALID: 3011,
    EMAIL_REQUIRED: 3012,
    PASSWORD_INVALID: 3021,
    PASSWORD_REQUIRED: 3022,
};


// Função de construção que envolve a validação com um errorCode
function validateWithErrorCode(validation, errorCode, errorMessage) {
    return (value, { req, location, path }) => {
        const result = validation(value);
        if (!result) {
            req.errorCode = errorCode;
            throw new Error(errorMessage);
        }
        return result;
    };
}

// Classe de validação para operações relacionadas a usuários
class AuthValidations {
    // Validações para a criação de um usuário
    
    static login() {
        return [
            body('email')
                .custom(validateWithErrorCode(value => typeof value === 'string' && value.includes('@'), ERROR_CODES.EMAIL_INVALID, 'E-mail inválido'))
                .custom(validateWithErrorCode(value => value && value.trim() !== '', ERROR_CODES.EMAIL_REQUIRED, 'E-mail é obrigatório')),
                
            body('password')
                .custom(validateWithErrorCode(value => typeof value === 'string' && value.length >= 8, ERROR_CODES.PASSWORD_INVALID, 'Senha inválida'))
        ];
    }

}

module.exports = AuthValidations;