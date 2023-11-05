/**
 * src/middlewares/uuidAndIdMiddleware.js
 * Data: 27/10/2023
 * Autor: http://github.com/lucasffa/
 * Descrição: Middleware responsável por verificar o UUID e o ID da solicitação do usuário.
 * 
 * Este middleware tem as seguintes responsabilidades:
 * - Permitir que usuários com funções 'MOD' e 'ADMIN' acessem rotas independentemente de UUID ou ID.
 * - Verificar se o UUID na requisição corresponde ao UUID no token JWT do usuário (para usuários com função 'USER').
 * - Verificar se o ID na rota corresponde ao ID no token JWT do usuário (para usuários com função 'USER').
 * 
 * As verificações de UUID e ID garantem que os usuários só possam agir sobre os seus próprios recursos, a menos que tenham funções privilegiadas.
 * 
 * @module uuidAndIdMiddleware.js
 */
const logger = require('../logs/logger');
class UUIDAndIdMiddleware {
    verifyUUIDandID(req, res, next) {
        
        // Permitir MOD e ADMIN independente do UUID/ID
        if ([1, 2].includes(req.userData.roleId)) {
            return next();
        }

        if (req.body.uuid && req.body.uuid !== req.userData.uuid) {
            logger.log({
                level: 'warn',
                msg: `Tentativa de acesso não autorizado ao UUID ${req.body.uuid} por ID: ${req.userData.id}`,
                reqId: req.rId
            })
            return res.status(403).json({ message: "Ação não permitida para este UUID" });
        }

        if (req.params.id && parseInt(req.params.id) !== req.userData.id) {
            logger.log({
                level: 'warn',
                msg: `Tentativa de acesso não autorizado ao ID ${req.params.id} por ID: ${req.userData.id}`,
                reqId: req.rId
            })
            return res.status(403).json({ message: "Ação não permitida para este ID" });
        }

        return next();
    }
}

module.exports = new UUIDAndIdMiddleware();
