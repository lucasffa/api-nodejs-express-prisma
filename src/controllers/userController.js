/**
 * src/controllers/userController.js
 * Data: 17/10/2023
 * Autor: http://github.com/lucasffa/
 * Descrição: Controlador que gerencia as requisições relacionadas à entidade de usuário.
 * 
 * Responsabilidades:
 * - Receber as requisições HTTP.
 * - Chamar os métodos apropriados do serviço (`UserService`).
 * - Retornar respostas HTTP adequadas.
 * 
 * Métodos:
 * 
 * 1. createUser(req, res):
 *    - Descrição: Cria um novo usuário.
 *    - Requisição: Espera receber no corpo da requisição os dados necessários para criar um usuário.
 *    - Resposta: Retorna o usuário criado com status 201 (Created) ou um erro adequado.
 * 
 * 2. getUserById(req, res):
 *    - Descrição: Busca um usuário pelo seu ID.
 *    - Requisição: Espera receber o ID do usuário como parâmetro na URL.
 *    - Resposta: Retorna o usuário encontrado com status 200 (OK) ou um erro adequado.
 * 
 * 3. getAllUsers(req, res):
 *    - Descrição: Retorna uma lista de todos os usuários.
 *    - Requisição: Não espera receber nenhum parâmetro específico.
 *    - Resposta: Retorna a lista de usuários com status 200 (OK) ou um erro adequado.
 * 
 * 4. updateUser(req, res):
 *    - Descrição: Atualiza os detalhes de um usuário específico.
 *    - Requisição: Espera receber o ID do usuário como parâmetro na URL e os dados atualizados no corpo da requisição.
 *    - Resposta: Retorna o usuário atualizado com status 200 (OK) ou um erro adequado.
 * 
 * 5. deleteUser(req, res):
 *    - Descrição: Exclui um usuário pelo seu ID.
 *    - Requisição: Espera receber o ID do usuário como parâmetro na URL.
 *    - Resposta: Retorna uma mensagem de sucesso com status 200 (OK) ou um erro adequado.
 * 
 * 6. toggleUserActivity(req, res):
 *    - Descrição: Atualiza o status de atividade de um usuário específico.
 *    - Requisição: Espera receber o ID do usuário como parâmetro na URL.
 *    - Resposta: Retorna uma mensagem de sucesso com status 200 (OK) ou um erro adequado.
 * 
 * 7. getUserByUUID(req, res):
 *    - Descrição: Busca um usuário pelo seu UUID.
 *    - Requisição: Espera receber o UUID do usuário como parâmetro na URL.
 *    - Resposta: Retorna o usuário encontrado com status 200 (OK) ou um erro adequado.
 * 
 * 8. updateUserByUUID(req, res):
 *    - Descrição: Atualiza os detalhes de um usuário específico.
 *    - Requisição: Espera receber o UUID do usuário como parâmetro na URL e os dados atualizados no corpo da requisição.
 *    - Resposta: Retorna o usuário atualizado com status 200 (OK) ou um erro adequado.
 * 
 * 9. toggleUserActivityByUUID(req, res):
 *    - Descrição: Atualiza o status de atividade de um usuário específico.
 *    - Requisição: Espera receber o UUID do usuário como parâmetro na URL.
 *    - Resposta: Retorna uma mensagem de sucesso com status 200 (OK) ou um erro adequado.
 * 
 * 10. deleteUserByUUID(req, res):
 *  - Descrição: Exclui um usuário pelo seu UUID.
 * - Requisição: Espera receber o UUID do usuário como parâmetro na URL.
 * - Resposta: Retorna uma mensagem de sucesso com status 200 (OK) ou um erro adequado.
 * 
 * Observações:
 * - Este controlador depende do `UserService` para realizar operações relacionadas ao usuário no banco de dados ou outras lógicas de negócio.
 * 
 */

const UserService = require('../services/userService');
const userService = new UserService();
const logger = require('../logs/logger');
const e = require('express');
const { log } = require('winston');

// Classe de controller para gerenciar as requisições HTTP relacionadas à entidade de usuário
class UserController {
    
    // - Recebe a requisição HTTP
    // - Chama o método apropriado do service de acordo com os dados recebidos para criar o usuário
    // - Retorna a resposta HTTP adequada
    async createUser(req, res, next) {
        try {
            logger.log({
                level: 'debug',
                msg: 'Iniciando criação de usuário.',
                reqId: req.rId
            });
            const user = await userService.createUser(req.body);
            logger.log({
                level: 'info',
                msg: 'Usuário criado com sucesso. UUID do usuário: ' + user.uuid + '.',
                reqId: req.rId
            });
            res.status(201).json(user);
        } catch (error) {            
            logger.log({
                level: 'error',
                msg: error.message || 'Erro ao criar usuário.',
                errC: error.errorCode,
                reqId: req.rId
            });
            next(error);
        }
    }

    // - Recebe a requisição HTTP
    // - Chama o método apropriado do service de acordo com o ID recebido para buscar o usuário
    // - Retorna a resposta HTTP adequada
    async getUserById(req, res, next) {
        try {
            logger.log({
                level: 'debug',
                msg: 'Iniciando busca de usuário por ID.',
                reqId: req.rId
            });
            const { id } = req.params;
            const user = await userService.getUserById(id);
            logger.log({
                level: 'info',
                msg: 'Usuário encontrado com sucesso. UUID do usuário: ' + user.uuid + '.',
                reqId: req.rId
            });
            return res.status(200).json({ user });
        } catch (error) {
            logger.log({
                level: 'error',
                msg: error.message || 'Erro ao buscar usuário por ID.',
                errC: error.errorCode,
                reqId: req.rId
            });
            next(error)
        }
    }

    // - Recebe a requisição HTTP
    // - Chama o método apropriado do service de acordo com os dados recebidos para buscar todos os usuários
    // - Retorna a resposta HTTP adequada
    async getAllUsers(req, res, next) {
        try {
            logger.log({
                level: 'debug',
                msg: 'Iniciando busca de todos os usuários.',
                reqId: req.rId
            });
            const users = await userService.getAllUsers();
            logger.log({
                level: 'info',
                msg: 'Busca de todos os usuários realizada com sucesso.',
                reqId: req.rId
            });
            return res.status(200).json({ users });
        } catch (error) {
            logger.log({
                level: 'error',
                msg: error.message || 'Erro ao buscar todos os usuários.',
                errC: error.errorCode,
                reqId: req.rId
            });
            next(error);
        }
    }

    
    // - Recebe a requisição HTTP
    // - Chama o método apropriado do service de acordo com os dados recebidos para atualizar o usuário
    // - Retorna a resposta HTTP adequada
    async updateUser(req, res, next) {
        try {
            logger.log({
                level: 'debug',
                msg: 'Iniciando atualização de usuário por ID.',
                reqId: req.rId
            });
            const { id } = req.params;
            const updateData = req.body;
            const user = await userService.updateUser(id, updateData);
            logger.log({
                level: 'info',
                msg: 'Usuário atualizado com sucesso. UUID do usuário: ' + user.uuid + '.',
                reqId: req.rId
            });
            return res.status(200).json({ user });
        } catch (error) {
            logger.log({
                level: 'error',
                msg: error.message || 'Erro ao atualizar usuário por ID.',
                errC: error.errorCode,
                reqId: req.rId
            });
            next(error);
        }
    }

    
    // - Recebe a requisição HTTP
    // - Chama o método apropriado do service de acordo com os dados recebidos para atualizar o usuário
    // - Retorna a resposta HTTP adequada
    async updateUserByUUID(req, res, next) {
        try {
            logger.log({
                level: 'debug',
                msg: 'Iniciando atualização de usuário por UUID.',
                reqId: req.rId
            });
            const { uuid, ...updateData } = req.body;
            const user = await userService.updateUserByUUID(uuid, updateData);
            logger.log({
                level: 'info',
                msg: 'Usuário atualizado com sucesso. UUID do usuário: ' + user.uuid + '.',
                reqId: req.rId
            });
            return res.status(200).json({ user });
        } catch (error) {
            logger.log({
                level: 'error',
                msg: error.message || 'Erro ao atualizar usuário por UUID.',
                errC: error.errorCode,
                reqId: req.rId
            });
            next(error);
        }
    }
    

    
    // - Recebe a requisição HTTP
    // - Chama o método apropriado do service de acordo com os dados recebidos para deletar o usuário
    // - Retorna a resposta HTTP adequada
    async deleteUser(req, res, next) {
        try {
            logger.log({
                level: 'debug',
                msg: 'Iniciando exclusão de usuário por ID.',
                reqId: req.rId
            });
            const { id } = req.params;
            const user = await userService.deleteUser(id);
            logger.log({
                level: 'info',
                msg: 'Usuário excluído com sucesso. UUID do usuário: ' + user.uuid + '.',
                reqId: req.rId
            });
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            logger.log({
                level: 'error',
                msg: error.message || 'Erro ao excluir usuário por ID.',
                errC: error.errorCode,
                reqId: req.rId
            });
            next(error);
        }
    }
    
    // - Recebe a requisição HTTP
    // - Chama o método apropriado do service de acordo com os dados recebidos para deletar o usuário
    // - Retorna a resposta HTTP adequada
    async deleteUserByUUID(req, res, next) {
        try {
            logger.log({
                level: 'debug',
                msg: 'Iniciando exclusão de usuário por UUID.',
                reqId: req.rId
            });
            const { uuid } = req.body;
            const user = await userService.deleteUserByUUID(uuid);
            logger.log({
                level: 'info',
                msg: 'Usuário excluído com sucesso. UUID do usuário: ' + user.uuid + '.',
                reqId: req.rId
            });
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            logger.log({
                level: 'error',
                msg: error.message || 'Erro ao excluir usuário por UUID.',
                errC: error.errorCode,
                reqId: req.rId
            });
            next(error);
        }
    }

    // - Recebe a requisição HTTP
    // - Chama o método apropriado do service de acordo com os dados recebidos para deletar o usuário
    // - Retorna a resposta HTTP adequada
    async toggleUserActivity(req, res, next) {
        try {
            logger.log({
                level: 'debug',
                msg: 'Iniciando atualização de status de atividade de usuário por ID.',
                reqId: req.rId
            });
            const { id } = req.params;
            const user = await userService.toggleUserActivity(id);
            logger.log({
                level: 'info',
                msg: 'Status de atividade de usuário atualizado com sucesso. UUID do usuário: ' + user.uuid + '.',
                reqId: req.rId
            });

            return res.status(200).json({ message: 'User activity toggled successfully' });
        } catch (error) {
            logger.log({
                level: 'error',
                msg: error.message || 'Erro ao atualizar status de atividade de usuário por ID.',
                errC: error.errorCode,
                reqId: req.rId
            });
            next(error);
        }
    }
    
    // - Recebe a requisição HTTP
    // - Chama o método apropriado do service de acordo com os dados recebidos para deletar o usuário
    // - Retorna a resposta HTTP adequada
    async toggleUserActivityByUUID(req, res, next) {
        try {
            logger.log({
                level: 'debug',
                msg: 'Iniciando atualização de status de atividade de usuário por UUID.',
                reqId: req.rId
            });
            const { uuid } = req.body;
            const user = await userService.toggleUserActivityByUUID(uuid);
            logger.log({
                level: 'info',
                msg: 'Status de atividade de usuário atualizado com sucesso. UUID do usuário: ' + user.uuid + '.',
                reqId: req.rId
            });
            return res.status(200).json({ message: 'User activity toggled successfully' });
        } catch (error) {
            logger.log({
                level: 'error',
                msg: error.message || 'Erro ao atualizar status de atividade de usuário por UUID.',
                errC: error.errorCode,
                reqId: req.rId
            });
            next(error);
        }
    }

    // - Recebe a requisição HTTP
    // - Chama o método apropriado do service de acordo com os dados recebidos para deletar o usuário
    // - Retorna a resposta HTTP adequada
    async getUserByUUID(req, res, next) {
        try {
            logger.log({
                level: 'debug',
                msg: 'Iniciando busca de usuário por UUID.',
                reqId: req.rId
            });
            const { uuid } = req.body;
            const user = await userService.getByUUID(uuid);
            logger.log({
                level: 'info',
                msg: 'Usuário encontrado com sucesso. UUID do usuário: ' + user.uuid + '.',
                reqId: req.rId
            });
            return res.status(200).json({ user });
        } catch (error) {
            logger.log({
                level: 'error',
                msg: error.message || 'Erro ao buscar usuário por UUID.',
                errC: error.errorCode,
                reqId: req.rId
            });
            next(error);
        }
    }
}

// Exportando o controller
module.exports = new UserController();
