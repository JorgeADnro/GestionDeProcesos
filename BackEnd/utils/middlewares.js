const jwt = require('jsonwebtoken');

function checkToken(allowedRoles) {
    return function(req, res, next) {
        // Obtener el token del encabezado de la solicitud
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
        }

        try {
            // Verificar el token
            const decoded = jwt.verify(token, 'si jala');

            // Comprobar si el usuario tiene el rol adecuado
            if (!allowedRoles.includes(decoded.user_role)) {
                return res.status(403).json({ error: 'No tienes permiso para acceder a esta ruta' });
            }

            // Si el token es válido y el usuario tiene el rol adecuado, continuar con la solicitud
            next();
        } catch (error) {
            // Si hay un error al verificar el token, responder con un error de autenticación
            return res.status(401).json({ error: 'Token de autenticación inválido' });
        }
    };
}

module.exports = {checkToken}