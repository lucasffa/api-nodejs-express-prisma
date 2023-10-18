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
 * Observações:
 * - Este controlador depende do `UserService` para realizar operações relacionadas ao usuário no banco de dados ou outras lógicas de negócio.
 * 
 */

const UserService = require('../services/userService');
const userService = new UserService();

// Classe de controller para gerenciar as requisições HTTP relacionadas à entidade de usuário
class UserController {
    
    // - Recebe a requisição HTTP
    // - Chama o método apropriado do service de acordo com os dados recebidos para criar o usuário
    // - Retorna a resposta HTTP adequada
    async createUser(req, res) {
        try {
            console.log("req.body em try de createUser em userController: ", req.body)
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            if (error.message === 'Este e-mail já está em uso. Por favor, escolha outro.') {
                res.status(400).json({ message: error.message });
            } else {
                
                console.log("req.body em catch de createUser em userController: ", req.body)
                // Para erros desconhecidos, retorne um erro 500 (Internal Server Error)
                res.status(500).json({ message: 'Ocorreu um erro ao criar o usuário.' });
            }
        }
    }

    // - Recebe a requisição HTTP
    // - Chama o método apropriado do service de acordo com o ID recebido para buscar o usuário
    // - Retorna a resposta HTTP adequada
    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            return res.status(200).json({ user });
        } catch (error) {
            if (error.message === 'User not found') {
                res.status(400).json({ message: "Ocorreu um erro ao encontrar o usuário." });
            } else {
                
                // Para erros desconhecidos, retorne um erro 500 (Internal Server Error)
                res.status(500).json({ message: 'Ocorreu um erro ao trazer dados do usuário.' });
            }
        }
    }

    // - Recebe a requisição HTTP
    // - Chama o método apropriado do service de acordo com os dados recebidos para buscar todos os usuários
    // - Retorna a resposta HTTP adequada
    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.status(200).json({ users });
        } catch (error) {
            if (error.message === 'User not found') {
                res.status(400).json({ message: "Ocorreu um erro ao encontrar o usuário." });
            } else {
                
                // Para erros desconhecidos, retorne um erro 500 (Internal Server Error)
                res.status(500).json({ message: 'Ocorreu um erro ao trazer dados dos usuários.' });
            }
        }
    }

    
    // - Recebe a requisição HTTP
    // - Chama o método apropriado do service de acordo com os dados recebidos para atualizar o usuário
    // - Retorna a resposta HTTP adequada
    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const user = await userService.updateUser(id, updateData);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ user });
        } catch (error) {
            if (error.message === 'User not found') {
                next(error);
                //res.status(400).json({ message: "Ocorreu um erro ao encontrar o usuário." });
            } else {
                next(error);
                // Para erros desconhecidos, retorne um erro 500 (Internal Server Error)
                //res.status(500).json({ message: 'Ocorreu um erro ao atualizar o usuário.' });
            }
        }
    }

    
    // - Recebe a requisição HTTP
    // - Chama o método apropriado do service de acordo com os dados recebidos para deletar o usuário
    // - Retorna a resposta HTTP adequada
    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.deleteUser(id);

            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            
            if (error.message === 'User not found') {
                next(error);
            } else {
                
                // Para erros desconhecidos, retorne um erro 500 (Internal Server Error)
                next(error);
            }
        }
    }
}

// Exportando o controller
module.exports = new UserController();
