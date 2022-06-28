const { Router } = require("express");
const { check } = require("express-validator"); 
const { getHospitales, creaHospital, eliminarHospital, actualizarHospital } = require("../controlers/hospitales");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();


router.get('/',getHospitales);
router.post('/', 
    [ 
        validarJWT,
        check('nombre','El nombre es necesario').not().isEmpty(),
        validarCampos
    ]
,creaHospital);
router.put('/:id',
    [ validarJWT
    ]
,actualizarHospital);

router.delete( '/:id' , eliminarHospital );

module.exports = router;