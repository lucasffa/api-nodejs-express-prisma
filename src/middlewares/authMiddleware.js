/**
 * src/middlewares/authMiddleware.js
 * Data: 27/10/2023
 * Autor: http://github.com/lucasffa/
 * Descrição: Middleware responsável por verificar se o usuário está autenticado.
 * 
 * Este middleware é responsável por:
 * - Extrair e verificar o token JWT do cabeçalho de autorização da solicitação.
 * - Decodificar o token para obter os dados do usuário (ID, UUID e função).
 * - Anexar os dados decodificados ao objeto de solicitação para uso nos controladores.
 * 
 * As verificações de ID e UUID garantem que o usuário só possa agir sobre os recursos que possui permissão.
 * 
 * @module authMiddleware.js
 */
const jwt = require('jsonwebtoken');
const logger = require('../logs/logger');

const NodeCache = require('node-cache');
const tokenBlacklistCache = new NodeCache({ stdTTL: 600, checkperiod: 120 }); // Cache com TTL de 10 minutos
const {
    HeaderNotFoundError,
    MalformedLoginError,
    TokenBlacklistedError,
    InvalidTokenError
} = require('../errors/authErrors.js');  // ajuste o caminho conforme necessário


class AuthMiddleware {
    constructor(tokenBlacklist) {
        this.tokenBlacklist = tokenBlacklist;
    }

    async verifyToken(req, res, next) {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            logger.log({
                level: 'error',
                msg: `Não logado.`,
                reqId: req.rId
            })
            // Se não houver um cabeçalho de autorização, o usuário não está logado
            return next(new HeaderNotFoundError());

        }

        // Verificar se o formato do header é "Bearer [TOKEN]"
        const parts = authHeader.split(' ');

        if (parts.length !== 2) {
            logger.log({
                level: 'error',
                msg: `Erro no login.`,
                reqId: req.rId
            })
            // Se não houver um cabeçalho de autorização, há um erro no login
            return next(new HeaderNotFoundError());
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            logger.log({
                level: 'error',
                msg: `Login mal feito.`,
                reqId: req.rId
            })
            // Se Bearer não estiver presente, o login foi mal feito
            return next(new MalformedLoginError());
        }

        // Acessar a blacklist de tokens
        const tokenBlacklist = req.app.get('tokenBlacklist');

        // Verificar se o token está na blacklist
        
        const cachedResult = tokenBlacklistCache.get(token);
        if (cachedResult !== undefined) {
            if (cachedResult) {
                // Se o token estiver na blacklist, o usuário não será autorizado
                return next(new TokenBlacklistedError());
            }
        } else {
            const isBlacklisted = await tokenBlacklist.isTokenBlacklisted(token);
            console.log('isBlacklisted', isBlacklisted)
            tokenBlacklistCache.set(token, isBlacklisted);
            if (isBlacklisted) {
                // Se o token estiver na blacklist, o usuário não será autorizado
                return next(new TokenBlacklistedError());
            }
        }
        
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                logger.log({
                    level: 'error',
                    msg: `Login inválido.`,
                    reqId: req.rId
                })
                // Se o token não for válido, o usuário não será autorizado
                return next(new InvalidTokenError());
            }

            // Se necessário, você pode adicionar o ID do usuário ao objeto req para uso posterior
            req.userId = decoded.userId;
            


            // Anexando os dados do usuário ao objeto req para uso posterior
            req.userData = {
                uuid: decoded.userUuid,
                id: decoded.userId,
                roleId: decoded.roleId
            };

            return next();
        });
    }
}


module.exports = (tokenBlacklist) => new AuthMiddleware(tokenBlacklist);
module.exports.tokenBlacklistCache = tokenBlacklistCache;