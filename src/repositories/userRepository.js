const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserRepository {
    async create(userData) {
        try {
            const user = await prisma.user.create({
                data: userData
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: parseInt(id) }
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            throw error;
        }
    }

    async update(id, updateData) {
        try {
            const user = await prisma.user.update({
                where: { id: parseInt(id) },
                data: updateData
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const user = await prisma.user.delete({
                where: { id: parseInt(id) }
            });
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserRepository;
