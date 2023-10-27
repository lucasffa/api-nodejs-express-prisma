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

class AuthMiddleware {
    verifyToken(req, res, next) {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({ message: 'Não logado.' });
        }

        // Verificar se o formato do header é "Bearer [TOKEN]"
        const parts = authHeader.split(' ');

        if (parts.length !== 2) {
            return res.status(401).json({ message: 'Erro no login.' });
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ message: 'Login mal feito.' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: 'Login inválido.' });
            }

            // Se necessário, você pode adicionar o ID do usuário ao objeto req para uso posterior
            req.userId = decoded.userId;
            

            /*
            // Adicionando as verificações para userUuid e role
            if (req.body.uuid && req.body.uuid !== decoded.userUuid) {
                return res.status(403).json({ message: "Ação não permitida para este UUID" });
            }

            if (req.params.id && parseInt(req.params.id) !== decoded.userId) {
                return res.status(403).json({ message: "Ação não permitida para este ID" });
            }*/

            // Anexando os dados do usuário ao objeto req para uso posterior
            req.userData = {
                uuid: decoded.userUuid,
                id: decoded.userId,
                role: decoded.role
            };

            return next();
        });
    }
}

module.exports = new AuthMiddleware();
