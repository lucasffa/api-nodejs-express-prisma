/**
 * src/repositories/userRepository.js
 * Data: 17/10/2023
 * Autor: http://github.com/lucasffa/
 * Descrição: Repositório que gerencia as operações relacionadas à entidade de usuário no banco de dados usando o Prisma.
 * 
 * Responsabilidades:
 * - Realizar operações CRUD (Criar, Ler, Atualizar e Deletar) no banco de dados.
 * - Lançar erros personalizados quando ocorrem problemas.
 * 
 * Métodos:
 * 
 * 1. create(userData):
 *    - Descrição: Adiciona um novo usuário ao banco de dados.
 *    - Parâmetros: `userData` - Dados do usuário a ser criado.
 *    - Retorno: Retorna o usuário criado ou lança um erro específico.
 * 
 * 2. findById(id):
 *    - Descrição: Busca um usuário pelo seu ID no banco de dados.
 *    - Parâmetros: `id` - ID do usuário.
 *    - Retorno: Retorna o usuário encontrado ou lança um erro específico.
 * 
 * 3. findAll():
 *    - Descrição: Busca todos os usuários no banco de dados.
 *    - Parâmetros: Não possui parâmetros.
 *    - Retorno: Retorna uma lista de usuários ou lança um erro específico.
 * 
 * 4. update(id, updateData):
 *    - Descrição: Atualiza um usuário no banco de dados pelo seu ID.
 *    - Parâmetros: `id` - ID do usuário; `updateData` - Dados a serem atualizados.
 *    - Retorno: Retorna o usuário atualizado ou lança um erro específico.
 * 
 * 5. delete(id):
 *    - Descrição: Deleta um usuário do banco de dados pelo seu ID.
 *    - Parâmetros: `id` - ID do usuário.
 *    - Retorno: Retorna o usuário deletado ou lança um erro específico.
 * 
 * 6. existingId(id):
 *    - Descrição: Verifica se um usuário com um ID específico existe no banco de dados.
 *    - Parâmetros: `id` - ID do usuário.
 *    - Retorno: Retorna verdadeiro se o usuário existir, caso contrário, lança um erro `IdNotFoundError`.
 * 
 * Observações:
 * - Utiliza o Prisma para realizar operações no banco de dados.
 * - Utiliza erros personalizados definidos em `userErrors.js` para tratar e informar problemas específicos.
 * 
 */

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

// Classe de repositório para gerenciar as operações relacionadas à entidade de usuário no banco de dados
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
    // - Retorna o usuário deletado PERMANENTEMENTE
    async permdelete(id) {
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

    // - Recebe o ID do usuário
    // - Chama o método apropriado do prisma para lidar com a "deleção" lógica do usuário
    // - Retorna o usuário com as novas alterações
    async delete(id) {
        try {
            // Verifica se o usuário existe antes de realizar toda a lógica abaixo
            await this.existingId(id);
            
            // Em vez de deletar o usuário, atualizamos os campos relevantes para indicar uma "deleção" lógica
            const user = await prisma.user.update({
                where: { id: parseInt(id) },
                data: {
                    isActive: false,
                    isDeleted: true,
                    deletedAt: new Date()
                }
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

    // - Recebe o ID do usuário
    // - Chama o método apropriado do prisma para alternar a atividade do usuário
    // - Retorna o usuário com a atividade alterada
    async toggleActivity(id) {
        try {
            // Verifica se o usuário existe antes de realizar toda a lógica abaixo
            const existingUser = await this.existingId(id);
            
            // Alterna a atividade do usuário
            const user = await prisma.user.update({
                where: { id: parseInt(id) },
                data: {
                    isActive: !existingUser.isActive,
                    isDeleted: false,
                    lastActivitySince: new Date()
                }
            });

            return user;

        } catch (error) {
            if(error instanceof IdNotFoundError){
                console.log("error em toggleActivity de userRepository: ", error)
                throw error;
            } else {
                throw new Error("Erro ao alternar a atividade do usuário.");
            }
        }
    }


    async existingId(id) {
        // Faz a verificação de existência do usuário no banco de dados utilizando o Prisma
        const existingUser = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });
          
        if (!existingUser) {
            throw new IdNotFoundError();
        }
        return existingUser; // Retorna o usuário encontrado
    }
    
}

module.exports = UserRepository;
