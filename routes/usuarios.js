const { Router } = require("express");
const { check } = require("express-validator");
const { getUsuario, crearUsuario, actualizarUsuario, eliminarUsuarios } = require("../controlers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();


router.get('/',getUsuario);
router.post('/',
    [
        check('usuario','El usuario es obligatorio').not().isEmpty(),
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio').not().isEmpty(),
        // check('email','El email es obligatorio').isEmail(),
        validarCampos,
    ]
,crearUsuario);
router.put('/:id',
    [
        validarJWT,
        check('usuario','El usuario es obligatorio').not().isEmpty(),
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ]
,actualizarUsuario);

router.delete( '/:id' , eliminarUsuarios );

module.exports = router;