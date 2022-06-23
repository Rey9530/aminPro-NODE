const { response, request } = require('express'); 
const bcrypt = require('bcryptjs');
const Usuario = require('../modelos/usuario');
const { getenerarJWT } = require('../helpers/jwt');



const login= async (req=request,resp=response)=>{

    const { email, password } = req.body;    
    try { 

        const usaurioDB = await Usuario.findOne({email});
        
        if(!usaurioDB){
            return resp.status(400).json({
                ok:false,
                msg:'El email o clave no existe'
            });
        } 
        const validarPass = bcrypt.compareSync(password, usaurioDB.password);


        if(!validarPass){ 
            return resp.status(400).json({
                ok:false,
                msg:'El email o clave no existe'
            });
        }

        const token = await getenerarJWT(usaurioDB.id);


        resp.json({
            ok:true,
            usuario:'Hola mundoi logiun dd',token
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:true,
            msg:'Error revise logs'
        });
    }
}

module.exports = {
    login
}