const { Router } = require("express");
const { check } = require("express-validator"); 
const { getMedico, creaMedico, eliminarMedico, actualizarMedico } = require("../controlers/medico");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();


router.get('/',getMedico);
router.post('/', 
    [ 
        validarJWT,
        check('nombre','El nombre es necesario').not().isEmpty(),
        check('tk_hospital','El hospital debe ser valido').isMongoId(),
        validarCampos
    ]
,creaMedico);
router.put('/:id',
    [ 
        validarJWT,
        check('nombre','El nombre es necesario').not().isEmpty(),
        check('tk_hospital','El hospital debe ser valido').isMongoId(),
        validarCampos
    ]
,actualizarMedico);

router.delete( '/:id' , validarJWT,eliminarMedico );

module.exports = router;