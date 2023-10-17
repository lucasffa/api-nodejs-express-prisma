const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository();

// - Recebe as requisições HTTP de acordo com os controllers e métodos apropriados definidos em src/controllers/userController.js
// - Chama os métodos apropriados do repository
// - Retorna a resposta HTTP adequada
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
