const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const { getenerarJWT } = require('../helpers/jwt');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getUsuario= async (req,resp)=>{

    const deste = Number(req.query.desde) || 0;  
    const usuarios = await prisma.usuarios.findMany();
    const total = await usuarios.length;
    resp.json({
        ok:true,
        usuarios,
        total
    });
}

const crearUsuario= async (req,resp=response)=>{
    let {usuario, password} = req.body;
    try {  
        const existeEmail = await prisma.usuarios.findUnique({
            where:{
                usuario
            }
        });  
        if(existeEmail){
            return resp.status(400).json({
                ok:false,
                msg:'El  ya existe'
            });
        }
        //encriptar clave
        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(password, salt);

        const userSaved = await prisma.usuarios.create(
            {
                data:{
                    usuario, password
                }
            }
        );
 
        const token = await getenerarJWT(userSaved.id);
        
        resp.json({
            ok:true,
            msg:'Crear usuario',
            data:{...userSaved,token},
            
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

    let uid = req.params.id;
    uid = Number(uid);
    try {
        const existeEmail = await prisma.usuarios.findUnique({ where:{ id:uid } });  
        if(!existeEmail){
            return resp.status(400).json({
                ok:false,
                msg:'El usuario no existe'
            });
        }
 
        const { usuario, ...campos } = req.body;
        if(existeEmail.usuario!=usuario){ 
            const existeEmail = await prisma.usuarios.findUnique({ where:{ usuario } });  
            if(existeEmail){
                return resp.status(400).json({
                    ok:false,
                    msg:'Ya existe un registro con ese usuario'
                });
            }
        } 
        const usuarioUpdate = await prisma.usuarios.update({
            where:{ id:uid },
            data:{  usuario  }
        });
        resp.json({
            ok:true,
            msg:'Usuario Actualizado',
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
    
    let uid = req.params.id;
    uid = Number(uid);
    try {
 

        const existeEmail = await prisma.usuarios.findUnique({ where:{ id:uid } });
        if(!existeEmail){
            return resp.status(400).json({
                ok:false,
                msg:'El usuario no existe'
            });
        }
        await prisma.usuarios.delete({ where:{ id:uid } }); 
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