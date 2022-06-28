const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../modelos/usuario');
const { getenerarJWT } = require('../helpers/jwt');

const getUsuario= async (req,resp)=>{

    const deste = Number(req.query.desde) || 0; 
   const [usuario, total] = await Promise.all([
        await Usuario.find({},'nombre email role img').skip(deste).limit(5),
        await Usuario.count()
    ])
    
    resp.json({
        ok:true,
        usuario,
        total
    });
}

const crearUsuario= async (req,resp=response)=>{
    
    const {email, nombre, password} = req.body;


    try { 
        const usuario = new Usuario(req.body);

        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return resp.status(400).json({
                ok:false,
                msg:'El correo ya existe'
            });
        }


        //encriptar clave

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        
        const token = await getenerarJWT(usuario.id);
        
        resp.json({
            ok:true,
            msg:'Crear usuario',
            usuario,token
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg:"Error inesperado reviosar log"
        });
    }

}
const actualizarUsuario = async (req=request,resp=response)=>{

    const uid = req.params.id;
    

    try {  

        const existeEmail = await Usuario.findById(uid);

        if(!existeEmail){
            return resp.status(400).json({
                ok:false,
                msg:'El usuario no existe'
            });
        }

        //TODO: validar token


        const { password, google, email, ...campos } = req.body;

        if(existeEmail.email!=email){
            const existeEmail = await Usuario.findOne({email});

            if(existeEmail){
                return resp.status(400).json({
                    ok:false,
                    msg:'Ya existe uin usuario con ese email'
                });

            }
        }

        campos.email = email;

        const usuarioUpdate = await Usuario.findByIdAndUpdate( uid,campos,{new:true} );


        resp.json({
            ok:true,
            msg:'Crear usuario',
            usuario:usuarioUpdate
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg:"Error inesperado reviosar log"
        });
    }
}

const eliminarUsuarios = async (req, resp=response)=>{
    const uid = req.params.id;

    try {

        
        const existeEmail = await Usuario.findById(uid);

        if(!existeEmail){
            return resp.status(400).json({
                ok:false,
                msg:'El usuario no existe'
            });
        }


        await Usuario.findByIdAndDelete(uid);

        resp.json({
            ok:true,
            msg:"Usuario elimiando"
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg:"Error inesperado reviosar log"
        });
    }
}


module.exports = {
    getUsuario,crearUsuario,actualizarUsuario,eliminarUsuarios
}