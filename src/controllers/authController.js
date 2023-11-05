/**
 * src/controllers/authController.js
 * Data: 27/10/2023
 * Autor: http://github.com/lucasffa/
 
 * Descrição: 
 * Este módulo é responsável por lidar com as requisições HTTP associadas à autenticação e autorização dos usuários.
 * Ele faz interface entre as requisições HTTP e a camada de serviço (`AuthService`).
 * 
 * Responsabilidades:
 * - Processar dados de entrada da requisição.
 * - Chamar os métodos apropriados do serviço (`AuthService`).
 * - Retornar respostas HTTP apropriadas ao cliente.
 * 
 * Métodos:
 * 
 * 1. login(req, res):
 *   - Descrição: Processa tentativas de login de um usuário. Se bem-sucedido, retorna um token JWT.
 *   - Requisição:
 *     - body: { email: String, password: String }
 *   - Resposta:
 *     - 200 OK: { token: JWT }
 *     - 400 Bad Request: { message: String, errorCode: Number }
 *     - 404 Not Found: { message: String, errorCode: Number }
 * 
 * Observações:
 * - Este controlador depende do `AuthService` para realizar as operações relacionadas à autenticação e autorização de usuários.
 * - Em caso de erro na autenticação, este controlador retornará um código de erro específico junto com uma mensagem de erro.
 * 
 *
 * 
 */

const AuthService = require('../services/authService');
const authService = new AuthService();
const logger = require('../logs/logger.js');

class AuthController {
    async login(req, res) {
        try {
            logger.log({
                level: 'debug',
                msg: 'Iniciando a autenticação de um usuário.',
                reqId: req.rId
            });
            const { email, password } = req.body;
            const login = await authService.login(email, password);
            logger.log({
                level: 'info',
                msg: 'Usuário autenticado com sucesso. UUID do usuário: ' + login.uuid + '.',
                reqId: req.rId
            });
            res.json({ login });
        } catch (error) {
            logger.log({
                level: 'error',
                msg: error.message,
                errC: error.errorCode,
                reqId: req.rId
            });
            res.status(error.statusCode || 400).json({ message: error.message, errorCode: error.errorCode });
        }
    }
}


module.exports = new AuthController();
