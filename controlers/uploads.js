const { response, request } = require('express');  
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const pathh = require('path');
const { actualizarImagen } = require('../helpers/actualizar-imagen');


const subirArchivo= async (req=request,resp=response)=>{
    const tipo = req.params.tipo;
    const id = req.params.id;
    
    const permitidos = ['hospitales','medicos','usuarios']

    if(!permitidos.includes(tipo)){ 
        return resp.status(400).json({
            ok:false,
            msg:'Error de tipo de coleccion'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) { 
        return resp.status(400).json({
            ok:false,
            msg:'No hay ningun archivo'
        });
    }

    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extencion = nombreCortado[ nombreCortado.length -1];

    let extencionesValidad = ['png','jpg','jpeg'];
    if(!extencionesValidad.includes(extencion)){ 
        return resp.status(400).json({
            ok:false,
            msg:'Extencion incorrecta'
        });
    } 
    const nombreArchivo = `${uuidv4()}.${extencion}`

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, function(err) {
        if (err) {
            console.log(err)
            return resp.status(500).json({
                ok:false,
                msg:'Error al mover la imagen'
            });
        }
        const data = actualizarImagen(tipo,id,path,nombreArchivo);
        resp.json({
            ok:true,
            id, 
            nombreArchivo,
            msg:'Archivo Subido'
        });
    });
}

const getArchivo= async (req=request,resp=response)=>{
    const tipo = req.params.tipo;
    const img = req.params.img;

    const path = pathh.join(__dirname, `../uploads/${tipo}/${img}`);
    if(fs.existsSync(path)){
        resp.sendFile(path); 
    }else{
        const path = pathh.join(__dirname, `../uploads/no-img.jpg`);
        resp.sendFile(path);  
    }
}
 
module.exports = {
    subirArchivo,getArchivo
}