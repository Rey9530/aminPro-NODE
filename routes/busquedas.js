const { Router } = require("express"); 
const { check } = require("express-validator"); 
const { buscarTodo, buscarPorTabla } = require("../controlers/buscar");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();


router.get('/:parametro',validarJWT,buscarTodo );
router.get('/coleccion/:tabla/:parametro',validarJWT,buscarPorTabla );



module.exports = router;