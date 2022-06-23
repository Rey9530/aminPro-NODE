const { Router } = require("express"); 
const { check } = require("express-validator");
const { login } = require("../controlers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();


router.post('/',[
    check('email','Email Invalido').isEmail(),
    check('password','Password Invalido').not().isEmpty(),
    validarCampos
] ,login );



module.exports = router;