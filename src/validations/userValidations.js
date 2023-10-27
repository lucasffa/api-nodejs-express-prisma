/**
 * userValidations.js
 * 
 * Este módulo fornece um conjunto de classes de validação para operações relacionadas a usuários, utilizando a biblioteca `express-validator`. 
 * Cada método da classe `UserValidations` retorna um conjunto de validações que pode ser usado como middleware em rotas Express para garantir
 * que as entradas dos usuários atendam aos critérios especificados.
 * 
 * Métodos:
 * 
 * - `create()`: 
 *   - Valida os campos necessários para a criação de um novo usuário.
 *   - Campos validados:
 *     - `name`: Não deve estar vazio.
 *     - `email`: Deve ser um e-mail válido e não estar vazio.
 *     - `password`: Deve ter pelo menos 8 caracteres.
 * 
 * - `update()`: 
 *   - Valida os campos que podem ser atualizados em um usuário existente.
 *   - Campos validados:
 *     - `name`: (Opcional) Se fornecido, não deve estar vazio.
 *     - `email`: (Opcional) Se fornecido, deve ser um e-mail válido.
 *     - `password`: (Opcional) Se fornecido, deve ter pelo menos 8 caracteres.
 * 
 * - `delete()`: 
 *   - Valida os campos necessários para excluir um usuário.
 *   - Campos validados:
 *     - `id`: Não deve estar vazio.
 * 
 * - `getById()`: 
 *   - Valida os campos necessários para buscar um usuário pelo ID.
 *   - Campos validados:
 *     - `id`: Deve ser um número inteiro e não estar vazio.
 * 
 * - `getAll()`: 
 *   - Neste método, não há validações específicas, pois é usado para buscar todos os usuários. Retorna uma lista vazia.
 * 
 *  Documentação dos códigos de erros (todos com Status HTTP 400):
 *  - `2011`: Nome é obrigatório.
 *  - `2012`: E-mail inválido.
 *  - `2013`: E-mail é obrigatório.
 *  - `2014`: A senha deve ter pelo menos 8 caracteres.
 *  - `2021`: ID do usuário deve ser inteiro (na atualização).
 *  - `2022`: Nome é obrigatório (na atualização).
 *  - `2023`: E-mail inválido (na atualização).
 *  - `2024`: A senha deve ter pelo menos 8 caracteres (na atualização).
 *  - `2031`: ID do usuário deve ser inteiro (na exclusão).
 *  - `2032`: ID do usuário é obrigatório (na exclusão).
 *  - `2041`: ID do usuário deve ser um número inteiro (na busca por ID).
 *  - `2042`: ID do usuário é obrigatório (na busca por ID).
 * 
 * @module userValidations
 */


const { body, param, validationResult } = require('express-validator');


// Definindo os códigos de erro como um Enum
const ERROR_CODES = {
    NAME_REQUIRED: 2011,
    EMAIL_INVALID: 2012,
    EMAIL_REQUIRED: 2013,
    PASSWORD_LENGTH: 2014,
    ID_NOT_INTEGER_FOR_UPDATE: 2021,
    NAME_REQUIRED_FOR_UPDATE: 2022,
    EMAIL_INVALID_FOR_UPDATE: 2023,
    PASSWORD_LENGTH_FOR_UPDATE: 2024,
    IS_ACTIVE_INVALID_FOR_UPDATE: 2025,
    IS_DELETED_INVALID_FOR_UPDATE: 2026,
    ID_NOT_INTEGER_FOR_DELETE: 2031,
    ID_REQUIRED_FOR_DELETE: 2032,
    ID_NOT_INTEGER_FOR_GET: 2041,
    ID_REQUIRED_FOR_GET: 2042
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
class UserValidations {
    // Validações para a criação de um usuário
    static create() {
        return [
            body('name').custom(validateWithErrorCode(value => value && value.trim() !== '', ERROR_CODES.NAME_REQUIRED, 'Nome é obrigatório')),
            body('email')
                .custom(validateWithErrorCode(value => typeof value === 'string' && value.includes('@'), ERROR_CODES.EMAIL_INVALID, 'E-mail inválido'))
                .custom(validateWithErrorCode(value => value && value.trim() !== '', ERROR_CODES.EMAIL_REQUIRED, 'E-mail é obrigatório')),
            body('password').custom(validateWithErrorCode(value => value && value.length >= 8, ERROR_CODES.PASSWORD_LENGTH, 'A senha deve ter pelo menos 8 caracteres'))
        ];
    }

    // Validações para a atualização de um usuário
    static update() {
        return [
            param('id')
                .custom(validateWithErrorCode(value => !isNaN(parseInt(value)), ERROR_CODES.ID_NOT_INTEGER_FOR_UPDATE, 'ID do usuário deve ser inteiro')),
            body('name').optional().custom(validateWithErrorCode(value => value && value.trim() !== '', ERROR_CODES.NAME_REQUIRED_FOR_UPDATE, 'Nome é obrigatório')),
            body('email').optional().custom(validateWithErrorCode(value => typeof value === 'string' && value.includes('@'), ERROR_CODES.EMAIL_INVALID_FOR_UPDATE, 'E-mail inválido')),
            body('password').optional().custom(validateWithErrorCode(value => value && value.length >= 8, ERROR_CODES.PASSWORD_LENGTH_FOR_UPDATE, 'A senha deve ter pelo menos 8 caracteres')),
            body('isActive').optional().custom(validateWithErrorCode(value => value === true || value === false, ERROR_CODES.IS_ACTIVE_INVALID_FOR_UPDATE, 'isActive deve ser true ou false')),
            body('isDeleted').optional().custom(validateWithErrorCode(value => value === true || value === false, ERROR_CODES.IS_DELETED_INVALID_FOR_UPDATE, 'isDeleted deve ser true ou false'))
        ];
    }

    // Validações para a exclusão de um usuário
    static delete() {
        return [
            param('id')
                .custom(validateWithErrorCode(value => !isNaN(parseInt(value)), ERROR_CODES.ID_NOT_INTEGER_FOR_DELETE, 'ID do usuário deve ser inteiro'))
                .custom(validateWithErrorCode(value => value && value.trim() !== '', ERROR_CODES.ID_REQUIRED_FOR_DELETE, 'ID do usuário é obrigatório'))
        ];
    }

    // Validações para a busca de um usuário
    static getById() {
        return [
            param('id')
                .custom(validateWithErrorCode(value => !isNaN(parseInt(value)), ERROR_CODES.ID_NOT_INTEGER_FOR_GET, 'ID do usuário deve ser um número inteiro'))
                .custom(validateWithErrorCode(value => value && value.trim() !== '', ERROR_CODES.ID_REQUIRED_FOR_GET, 'ID do usuário é obrigatório'))
        ];
    }

    // Validações para a busca de todos os usuários
    static getAll() {
        return [];
    }

    static toggleUserActivity() {
        return [
            param('id')
                .custom(validateWithErrorCode(value => !isNaN(parseInt(value)), ERROR_CODES.ID_NOT_INTEGER_FOR_UPDATE, 'ID do usuário deve ser inteiro')),
        ];
    }
}

module.exports = UserValidations;