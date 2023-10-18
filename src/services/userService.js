/**
 * src/services/userService.js
 * Data: 17/10/2023
 * Autor: http://github.com/lucasffa/
 * Descrição: Serviço que gerencia as operações relacionadas à entidade de usuário.
 * 
 * Responsabilidades:
 * - Processar as requisições recebidas dos controllers.
 * - Chamar os métodos apropriados do repositório (`UserRepository`).
 * - Retornar os dados processados ou erros, conforme necessário.
 * 
 * Métodos:
 * 
 * 1. createUser(userData):
 *    - Descrição: Cria um novo usuário.
 *    - Parâmetros: Recebe um objeto `userData` contendo os dados do usuário a ser criado.
 *    - Retorno: Retorna o usuário criado ou lança um erro, se aplicável.
 * 
 * 2. getUserById(id):
 *    - Descrição: Busca um usuário pelo seu ID.
 *    - Parâmetros: Recebe o ID do usuário.
 *    - Retorno: Retorna o usuário encontrado ou lança um erro, se aplicável.
 * 
 * 3. getAllUsers():
 *    - Descrição: Retorna uma lista de todos os usuários.
 *    - Parâmetros: Não recebe nenhum parâmetro.
 *    - Retorno: Retorna uma lista de usuários ou lança um erro, se aplicável.
 * 
 * 4. updateUser(id, updateData):
 *    - Descrição: Atualiza os detalhes de um usuário específico.
 *    - Parâmetros: Recebe o ID do usuário e um objeto `updateData` contendo os dados a serem atualizados.
 *    - Retorno: Retorna o usuário atualizado ou lança um erro, se aplicável.
 * 
 * 5. deleteUser(id):
 *    - Descrição: Exclui um usuário pelo seu ID.
 *    - Parâmetros: Recebe o ID do usuário.
 *    - Retorno: Retorna uma confirmação da exclusão ou lança um erro, se aplicável.
 * 
 * Observações:
 * - Este serviço depende do `UserRepository` para realizar operações relacionadas ao usuário no banco de dados.
 * 
 */

const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository();

// Classe de service para gerenciar as regras de negócio relacionadas à entidade de usuário
class UserService {

    // - Recebe os dados do usuário
    // - Chama o método apropriado do repository para criar o usuário
    // - Retorna o usuário criado
    async createUser(userData) {
        try {
            console.log("userData em try de createUser em userService: ", userData)
            const user = await userRepository.create(userData);
            return user;
        } catch (error) {
            if (error.message === 'Este e-mail já está registrado') {
                // Aqui você pode criar um objeto de erro personalizado, se quiser
                throw new Error('Este e-mail já está em uso. Por favor, escolha outro.');
            }
            // Para outros erros, apenas lance-os novamente
            throw error;
        }
    }
    
    // - Recebe o ID do usuário
    // - Chama o método apropriado do repository para buscar o usuário
    // - Retorna o usuário encontrado
    async getUserById(id) {
        try {
            const user = await userRepository.findById(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    // - Não recebe nenhum parâmetro
    // - Chama o método apropriado do repository para buscar todos os usuários
    // - Retorna todos os usuários encontrados
    async getAllUsers() {
        try {
            const users = await userRepository.findAll();
            return users;
        } catch (error) {
            throw error;
        }
    }

    // - Recebe o ID do usuário e os dados a serem atualizados
    // - Chama o método apropriado do repository para atualizar o usuário
    // - Retorna o usuário atualizado
    async updateUser(id, updateData) {
        try {
            const user = await userRepository.update(id, updateData);
            return user;
        } catch (error) {
            throw error;
        }
    }

    // - Recebe o ID do usuário
    // - Chama o método apropriado do repository para deletar o usuário
    // - Retorna o usuário deletado
    async deleteUser(id) {
        try {
            const user = await userRepository.delete(id);
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
