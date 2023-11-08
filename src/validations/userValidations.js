/**
 * userValidations.js
 * 
 * Data: 27/10/2023
 * Autor: http://github.com/lucasffa/
 * Descrição:   Define as validações para as operações relacionadas à entidade de usuário.
 *              Este módulo fornece um conjunto de classes de validação para operações relacionadas a usuários, utilizando a biblioteca `express-validator`. 
 *              Cada método da classe `UserValidations` retorna um conjunto de validações que pode ser usado como middleware em rotas Express para garantir
 *              que as entradas dos usuários atendam aos critérios especificados.
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
const ERROR_TYPES = {
    NAME_REQUIRED: {
        code: 2011,
        message: 'Nome é obrigatório',
        description: 'O nome não foi fornecido.'
    },
    EMAIL_INVALID: {
        code: 2012,
        message: 'E-mail inválido',
        description: 'O e-mail fornecido é inválido.'
    },
    EMAIL_REQUIRED: {
        code: 2013,
        message: 'E-mail é obrigatório',
        description: 'O e-mail não foi fornecido.'
    },
    PASSWORD_LENGTH: {
        code: 2014,
        message: 'A senha deve ter pelo menos 8 caracteres',
        description: 'A senha deve ter pelo menos 8 caracteres.'
    },
    ID_NOT_INTEGER_FOR_UPDATE: 
    {
        code: 2021,
        message: 'ID do usuário deve ser inteiro',
        description: 'O ID do usuário deve ser um número inteiro.'
    },
    NAME_REQUIRED_FOR_UPDATE: {
        code: 2022,
        message: 'Nome é obrigatório',
        description: 'O nome não foi fornecido.'
    },
    EMAIL_INVALID_FOR_UPDATE: {
        code: 2023,
        message: 'E-mail inválido',
        description: 'O e-mail fornecido é inválido.'
    },
    PASSWORD_LENGTH_FOR_UPDATE: {
        code: 2024,
        message: 'A senha deve ter pelo menos 8 caracteres',
        description: 'A senha deve ter pelo menos 8 caracteres.'
    },
    IS_ACTIVE_INVALID_FOR_UPDATE: {
        code: 2025,
        message: 'isActive deve ser true ou false',
        description: 'isActive deve ser true ou false.'
    },
    IS_DELETED_INVALID_FOR_UPDATE: {
        code: 2026,
        message: 'isDeleted deve ser true ou false',
        description: 'isDeleted deve ser true ou false.'
    },
    ID_NOT_INTEGER_FOR_DELETE: {
        code: 2031,
        message: 'ID do usuário deve ser inteiro',
        description: 'O ID do usuário deve ser um número inteiro.'
    },
    ID_REQUIRED_FOR_DELETE: {
        code: 2032,
        message: 'ID do usuário é obrigatório',
        description: 'O ID do usuário não foi fornecido.'
    },
    ID_NOT_INTEGER_FOR_GET: {
        code: 2041,
        message: 'ID do usuário deve ser um número inteiro',
        description: 'O ID do usuário deve ser um número inteiro.'
    },
    ID_REQUIRED_FOR_GET: {
        code: 2042,
        message: 'ID do usuário é obrigatório',
        description: 'O ID do usuário não foi fornecido.'
    },
    UUID_REQUIRED_FOR_GET: {
        code: 2051,
        message: 'UUID do usuário é obrigatório',
        description: 'O UUID do usuário não foi fornecido.'
    }
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
            body('name').custom(validateWithErrorCode(value => value && value.trim() !== '', ERROR_TYPES.NAME_REQUIRED.code, ERROR_TYPES.NAME_REQUIRED.message)),
            body('email')
                .custom(validateWithErrorCode(value => value && value.trim() !== '', ERROR_TYPES.EMAIL_REQUIRED.code, ERROR_TYPES.EMAIL_REQUIRED.message))
                .custom(validateWithErrorCode(value => typeof value === 'string' && value.includes('@'), ERROR_TYPES.EMAIL_INVALID.code, ERROR_TYPES.EMAIL_INVALID.message)),
            body('password').custom(validateWithErrorCode(value => value && value.length >= 8, ERROR_TYPES.PASSWORD_LENGTH.code, ERROR_TYPES.PASSWORD_LENGTH.message))
        ];
    }

    // Validações para a atualização de um usuário
    static update() {
        return [
            param('id')
                .custom(validateWithErrorCode(value => !isNaN(parseInt(value)), ERROR_TYPES.ID_NOT_INTEGER_FOR_UPDATE.code, ERROR_TYPES.ID_NOT_INTEGER_FOR_UPDATE.message)),
            body('name').optional().custom(validateWithErrorCode(value => value && value.trim() !== '', ERROR_TYPES.NAME_REQUIRED_FOR_UPDATE.code, ERROR_TYPES.NAME_REQUIRED_FOR_UPDATE.message)),
            body('email').optional().custom(validateWithErrorCode(value => typeof value === 'string' && value.includes('@'), ERROR_TYPES.EMAIL_INVALID_FOR_UPDATE.code, ERROR_TYPES.EMAIL_INVALID_FOR_UPDATE.message)),
            body('password').optional().custom(validateWithErrorCode(value => value && value.length >= 8, ERROR_TYPES.PASSWORD_LENGTH_FOR_UPDATE.code, ERROR_TYPES.PASSWORD_LENGTH_FOR_UPDATE.message)),
            body('isActive').optional().custom(validateWithErrorCode(value => value === true || value === false, ERROR_TYPES.IS_ACTIVE_INVALID_FOR_UPDATE.code, ERROR_TYPES.IS_ACTIVE_INVALID_FOR_UPDATE.message)),
            body('isDeleted').optional().custom(validateWithErrorCode(value => value === true || value === false, ERROR_TYPES.IS_DELETED_INVALID_FOR_UPDATE.code, ERROR_TYPES.IS_DELETED_INVALID_FOR_UPDATE.message))
        ];
    }

    // Validações para a exclusão de um usuário
    static delete() {
        return [
            param('id')
                .custom(validateWithErrorCode(value => !isNaN(parseInt(value)), ERROR_TYPES.ID_NOT_INTEGER_FOR_DELETE.code, ERROR_TYPES.ID_NOT_INTEGER_FOR_DELETE.message))
                .custom(validateWithErrorCode(value => value && value.trim() !== '', ERROR_TYPES.ID_REQUIRED_FOR_DELETE.code, ERROR_TYPES.ID_REQUIRED_FOR_DELETE.message))
        ];
    }

    // Validações para a busca de um usuário
    static getById() {
        return [
            param('id')
                .custom(validateWithErrorCode(value => !isNaN(parseInt(value)), ERROR_TYPES.ID_NOT_INTEGER_FOR_GET.code, ERROR_TYPES.ID_NOT_INTEGER_FOR_GET.message))
                .custom(validateWithErrorCode(value => value && value.trim() !== '', ERROR_TYPES.ID_REQUIRED_FOR_GET.code, ERROR_TYPES.ID_REQUIRED_FOR_GET.message))
        ];
    }

    // Validações para a busca de todos os usuários
    static getAll() {
        return [];
    }

    // Validações para a atualização de um usuário
    static toggleUserActivity() {
        return [
            param('id')
                .custom(validateWithErrorCode(value => !isNaN(parseInt(value)), ERROR_TYPES.ID_NOT_INTEGER_FOR_UPDATE.code, ERROR_TYPES.ID_NOT_INTEGER_FOR_UPDATE.message)),
        ];
    }

    
    // Validações para a busca de um usuário
    static getByUUID() {
        return [
            body('uuid')
                .custom(validateWithErrorCode(value => value && value.trim() !== '', ERROR_TYPES.UUID_REQUIRED_FOR_GET.code, ERROR_TYPES.UUID_REQUIRED_FOR_GET.message))
        ];
    }

    // Validações para a atualização de um usuário
    static updateByUUID() {
        return [
            body('uuid')
                .custom(validateWithErrorCode(value => value && value.trim() !== '', ERROR_TYPES.UUID_REQUIRED_FOR_GET.code, ERROR_TYPES.UUID_REQUIRED_FOR_GET.message))
        ];
    }
    
    // Validações para a atualização de um usuário
    static toggleUserActivityByUUID() {
        return [
            body('uuid')
                .custom(validateWithErrorCode(value => value && value.trim() !== '', ERROR_TYPES.UUID_REQUIRED_FOR_GET.code, ERROR_TYPES.UUID_REQUIRED_FOR_GET.message))
        ];
    }

    // Validações para a atualização de um usuário
    static deleteByUUID() {
        return [
            body('uuid')
                .custom(validateWithErrorCode(value => value && value.trim() !== '', ERROR_TYPES.UUID_REQUIRED_FOR_GET.code, ERROR_TYPES.UUID_REQUIRED_FOR_GET.message))
        ];
    }
    
}

module.exports = UserValidations;