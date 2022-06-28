const { response, request } = require('express'); 
const bcrypt = require('bcryptjs');
const Usuario = require('../modelos/usuario');
const Medico = require('../modelos/medico');
const Hospital = require('../modelos/hospital');
const { getenerarJWT } = require('../helpers/jwt');



const buscarTodo= async (req=request,resp=response)=>{
    const param = req.params.parametro;
    
    const regex = new RegExp(param, 'i');

 
    const [usuario,medico,hospital ] = await Promise.all([
        await Usuario.find({ nombre: regex }),
        await Medico.find({ nombre: regex }),
        await Hospital.find({ nombre: regex })
    ]);

    resp.json({
        ok:true, usuario,medico,hospital
    });
}

const buscarPorTabla= async (req=request,resp=response)=>{
    const param = req.params.parametro;
    const tabla = req.params.tabla;
    
    const regex = new RegExp(param, 'i');
 
    let data;

    switch (tabla) {
        case 'usuarios':
            data  = await Usuario.find({ nombre: regex }); 
            break;
        case 'hospitales': 
            data  = await Hospital.find({ nombre: regex }); 
            break;
        case 'medicos': 
            data  = await Medico.find({ nombre: regex }); 
            break; 
        default: 
            return resp.status(400).json({
                ok:false,
                msg:'debe seleccionar coleccion usuarios/hospitales/medicos'
            });
            break;
    }
  
    resp.json({
        ok:true, data
    });
}

module.exports = {
    buscarTodo,buscarPorTabla
}