const jwt = require('jsonwebtoken');

//========================
//Verificar token
//=======================

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        } else {
            decoded = jwt.decode(token, { complete: true });
            req.usuario = decoded.payload;
            console.log(req.usuario);
            next();

        }

    });



};

let verificarAdminRole = (req, res, next) => {
    let usuario = req.usuario.Usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }

};


module.exports = {
    verificaToken,
    verificarAdminRole
}