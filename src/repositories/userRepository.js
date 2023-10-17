const {
    IdNotFoundError,
    UserNotFoundError,
    UserUpdateError,
    UserDeleteError,
    UserInfoRetrievalError,
    UsersInfoRetrievalError,
    UserCreateError,
    UserCreateEmailError
} = require('../errors/userErrors.js');  // ajuste o caminho conforme necessário

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// - Recebe os dados do usuário
// - Chama o método apropriado do prisma para lidar com a criação do usuário, a busca de um usuário, a busca de todos os usuários, a atualização de um usuário e a deleção de um usuário
class UserRepository {

    // - Recebe os dados do usuário
    // - Chama o método apropriado do prisma para lidar com a criação do usuário
    // - Retorna o usuário criado
    async create(userData) {
        try {
            // Cria o usuário no banco de dados e retorna o usuário criado utilizando o Prisma
            const user = await prisma.user.create({ data: userData });
            
            return user;
        } catch (error) {
            
            // Se o erro for de e-mail duplicado, lance um erro personalizado
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                throw new UserCreateEmailError;
            }
            throw new UserCreateError;
        }
    }
    
    // - Recebe o ID do usuário
    // - Chama o método apropriado do prisma para lidar com a busca de um usuário
    // - Retorna o usuário encontrado
    async findById(id) {
        try {
            // Faz a busca do usuário no banco de dados utilizando o Prisma
            const user = await prisma.user.findUnique({
                where: { id: parseInt(id) }
            });

            // Se o usuário não existir, lance um erro
            if (!user) {
                throw new UserNotFoundError;
            }

            return user;

        } catch (error) {
            if(error instanceof IdNotFoundError){
                throw error;
            }else{
                throw new UserInfoRetrievalError;
            }
        }
    }

    // - Não recebe nenhum parâmetro
    // - Chama o método apropriado do prisma para lidar com a busca de todos os usuários
    // - Retorna todos os usuários encontrados
    async findAll() {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            throw new UsersInfoRetrievalError;
        }
    }

    // - Recebe o ID do usuário e os dados a serem atualizados
    // - Chama o método apropriado do prisma para lidar com a atualização do usuário
    // - Retorna o usuário atualizado
    async update(id, updateData) {
        try {
            // Verifica se o usuário existe antes de realizar toda a lógica abaixo
            await this.existingId(id);

            // Atualiza o usuário no banco de dados e retorna o usuário atualizado utilizando o Prisma
            const user = await prisma.user.update({
                where: { id: parseInt(id) },
                data: updateData
            });

            return user;

        } catch (error) {
            if (error instanceof IdNotFoundError) {
                throw new UserNotFoundError;
              } else{
                    throw new UserUpdateError;
              } 
        }
    }

    // - Recebe o ID do usuário
    // - Chama o método apropriado do prisma para lidar com a deleção do usuário
    // - Retorna o usuário deletado
    async delete(id) {
        try {
            // Verifica se o usuário existe antes de realizar toda a lógica abaixo
            await this.existingId(id);
            
            // Deleta o usuário no banco de dados e retorna o usuário deletado utilizando o Prisma
            const user = await prisma.user.delete({
                where: { id: parseInt(id) }
            });

            return user;

        } catch (error) {
            if(error instanceof IdNotFoundError){
                console.log("error em delete de userRepository: ", error)
                throw error;
            }else{
                throw new UserDeleteError;
            }
        }
    }

    async existingId(id) {
        
        // Faz a verificação de existência do usuário no banco de dados utilizando o Prisma
        const existingUser = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });
          
        if (!existingUser) {
            throw new IdNotFoundError
        } else{
            return true;
        }
    }
}

module.exports = UserRepository;
