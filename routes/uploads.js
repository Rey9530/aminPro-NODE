const { Router } = require("express"); 
const fileUpload = require('express-fileupload'); 
const { subirArchivo, getArchivo } = require("../controlers/uploads");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();


router.use(fileUpload());
router.put('/:tipo/:id',validarJWT,subirArchivo );
router.get('/:tipo/:img',getArchivo );



module.exports = router;