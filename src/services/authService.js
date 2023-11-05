/**
 * src/services/authService.js
 * 
 * Data: 27/10/2023
 * Autor: http://github.com/lucasffa/
 * 
 * Descrição:
 * Este módulo é responsável por gerenciar a autenticação dos usuários, oferecendo funcionalidades como login.
 * Faz a ponte entre a camada de controladores e a camada de repositórios, sendo responsável pela lógica de negócio relacionada à autenticação.
 * 
 * Responsabilidades:
 * - Validar as credenciais dos usuários durante o login.
 * - Gerar tokens JWT para usuários autenticados.
 * - Comunicar-se com o repositório (`UserRepository`) para buscar dados de usuários.
 * 
 * Métodos:
 * 
 * 1. login(email, password):
 *   - Descrição: Valida as credenciais do usuário e, se bem-sucedido, gera um token JWT.
 *   - Parâmetros:
 *     - email: E-mail do usuário a ser autenticado.
 *     - password: Senha do usuário a ser autenticada.
 *   - Retorno:
 *     - Token JWT em caso de sucesso.
 *     - Lança uma exceção em caso de falha.
 * 
 * Dependências:
 * - Utiliza o `UserRepository` para buscar usuários pelo e-mail.
 * - Utiliza a biblioteca `bcrypt` para validar senhas.
 * - Utiliza a biblioteca `jsonwebtoken` para gerar tokens JWT.
 * 
 */

const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const logger = require('../logs/logger.js');

const userRepository = new UserRepository();
const {
    IdNotFoundError,
    UserNotFoundError,
    UserUpdateError,
    UserDeleteError,
    UserInfoRetrievalError,
    UsersInfoRetrievalError,
    UserCreateError,
    UserCreateEmailError,
    UserIncorrectPasswordError
} = require('../errors/userErrors.js');  // ajuste o caminho conforme necessário


class AuthService {
    async login(email, password) {
        try{
            const user = await userRepository.findByEmail(email);
            if (!user) {
                throw new UserNotFoundError();
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new UserIncorrectPasswordError();
            }
            
            const token = jwt.sign({ userUuid: user.uuid, userId: user.id, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
            return {
                token: token,   // Token JWT
                uuid: user.uuid // UUID do usuário
            };

        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthService;
