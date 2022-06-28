const { Router } = require("express"); 
const { check } = require("express-validator");
const { login, loginGoogle } = require("../controlers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();


router.post('/',[
    check('email','Email Invalido').isEmail(),
    check('password','Password Invalido').not().isEmpty(),
    validarCampos
] ,login );

router.post('/google',[ 
    check('token','El token de google debe ser valido').not().isEmpty(),
    validarCampos
] ,loginGoogle );



module.exports = router;