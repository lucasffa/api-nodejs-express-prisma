const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository();

class UserService {
    async createUser(userData) {
        try {
            const user = await userRepository.create(userData);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id) {
        try {
            const user = await userRepository.findById(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const users = await userRepository.findAll();
            return users;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id, updateData) {
        try {
            const user = await userRepository.update(id, updateData);
            return user;
        } catch (error) {
            throw error;
        }
    }

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
