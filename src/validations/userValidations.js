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
 * @module userValidations
 */

const { body, param } = require('express-validator');

class UserValidations {
    
    // Validações para a criação de um usuário
    static create() {
        return [
            body('name').notEmpty().withMessage('Nome é obrigatório'),
            body('email').isEmail().withMessage('E-mail inválido').notEmpty().withMessage('E-mail é obrigatório'),
            body('password').isLength({ min: 8 }).withMessage('A senha deve ter pelo menos 8 caracteres')
        ];
    }

    // Validações para a atualização de um usuário
    static update() {
        return [
            body('name').optional().notEmpty().withMessage('Nome é obrigatório'),
            body('email').optional().isEmail().withMessage('E-mail inválido'),
            body('password').optional().isLength({ min: 8 }).withMessage('A senha deve ter pelo menos 8 caracteres')
        ];
    }

    // Validações para a exclusão de um usuário
    static delete() {
        return [
            body('id').notEmpty().withMessage('ID do usuário é obrigatório')
        ];
    }

    // Validações para a busca de um usuário
    static getById() {
        return [
            // Validação do ID do usuário
            param('id').isInt().withMessage('ID do usuário deve ser um número inteiro').notEmpty().withMessage('ID do usuário é obrigatório')
        ];
    }

    // Validações para a busca de todos os usuários
    static getAll() {
        return [];
    }
}

module.exports = UserValidations;
