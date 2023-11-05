/**
 * src/middlewares/roleMiddleware.js
 * Data: 27/10/2023
 * Autor: http://github.com/lucasffa/
 * Descrição: Middleware responsável por verificar a função (role) do usuário.
 * 
 * Este middleware tem as seguintes responsabilidades:
 * - Comparar a função do usuário com as funções exigidas para uma determinada rota.
 * - Permitir o acesso do usuário se a sua função estiver na lista de funções autorizadas.
 * - Negar o acesso e retornar uma resposta de "Acesso não autorizado" caso contrário.
 * 
 * Este middleware é especialmente útil para restringir o acesso a rotas específicas 
 * com base nas funções dos usuários, garantindo que apenas os usuários com as funções 
 * adequadas possam executar determinadas ações.
 * 
 * @module roleMiddleware.js
 */


class RoleMiddleware {
    requireRole(requiredRoles) {
        return (req, res, next) => {
            const userRoleId = req.userData.roleId;
            if (requiredRoles.includes(userRoleId)) {
                return next();
            } else {
                return res.status(403).json({ message: "Acesso não autorizado." });
            }
        };
    }
}

module.exports = new RoleMiddleware();
