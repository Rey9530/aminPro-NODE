const { response, request } = require('express'); 
const bcrypt = require('bcryptjs');
// const Usuario = require('../modelos/usuario');
const { getenerarJWT } = require('../helpers/jwt');
// const { googlewVerify } = require('../helpers/google-verify');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const login= async (req=request,resp=response)=>{

    const { usuario, password } = req.body;    
    try { 

        const usaurioDB = await prisma.usuarios.findUnique({
            where:{
                usuario
            }
        });  
        
        if(!usaurioDB){
            return resp.status(400).json({
                ok:false,
                msg:'El usuario o clave no existe'
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
            data:{ ...usaurioDB, token }, 
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:true,
            msg:'Error revise logs'
        });
    }
}


// const loginGoogle= async (req=request,resp=response)=>{
//     const tokenGoogle = req.body.token;

//     try {
        
//         const { email, name, picture } = await googlewVerify(tokenGoogle);

//         const usuariodb = await Usuario.findOne({ email });
//         let usuario;
//         if(!usuariodb){
//             usuario = new Usuario({
//                 nombre:name,
//                 email,
//                 password:'@@@',
//                 img:picture,
//                 google:true
//             });
//         }else{
//             usuario = usuariodb;
//             usuario.google = true;
//             usuario.password = "@@@";
//         }
//         await usuario.save();
        
//         const token = await getenerarJWT(usuario.id);
//         resp.json({
//             ok:true, email, name, picture,
//             token
//         });
//     } catch (error) {
//         console.log(error)
//         resp.status(400).json({
//             ok:false,
//             msg:'El token no es valido'
//         });
//     } 
// }

const loginRenew= async (req=request,resp=response)=>{
     
    const token = await getenerarJWT( req.uid );
 

    const usaurioDB = await prisma.usuarios.findUnique({
        where:{
            id:Number(req.uid)
        }
    }); 

    resp.json({
        ok:true,
        data:{ ...usaurioDB,token }
    });
}

module.exports = {
    login,loginRenew
}