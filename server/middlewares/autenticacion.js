const jwt = require('jsonwebtoken');

//========================
//Verificar token
//=======================

let verificaToken = (req, res, next) => {

    let token = req.get('token');
    console.log(token);
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
            let usuario = req.usuario;
            console.log('············=>' + decoded.payload);
            next();

        }

    });



};

let verificarAdminRole = (req, res, next) => {
    let usuario = req.usuario.Usuario;



    if (usuario.role === 'ADMIN_ROLE') {
        console.log(req.usuario._id);
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


let verificarEmpresaRole = (req, res, next) => {
    let usuario = req.usuario.Usuario;

    if (usuario.role === 'EMPLOYEER_ROLE' || usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es empresa'
            }
        });
    }

};

let verificarTokenUrl = (req, res, next) => {
    let token = req.query.token;

    res.json({
        token
    })


};
module.exports = {
    verificaToken,
    verificarAdminRole,
    verificarEmpresaRole

}