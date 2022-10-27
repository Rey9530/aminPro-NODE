const { Router } = require("express"); 
const { check } = require("express-validator");
const { login, loginRenew } = require("../controlers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();


router.post('/',[
    check('usuario','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
] ,login );

// router.post('/google',[ 
//     check('token','El token de google debe ser valido').not().isEmpty(),
//     validarCampos
// ] ,loginGoogle );


router.get('/renew', validarJWT ,loginRenew );



module.exports = router;