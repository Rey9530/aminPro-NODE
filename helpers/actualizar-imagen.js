
const fs = require('fs');

const Usuario = require('../modelos/usuario');
const Medico = require('../modelos/medico');
const Hospital = require('../modelos/hospital');
const medico = require('../modelos/medico');


const borrarImage = (pathViejo)=>{ 
    if(fs.existsSync(pathViejo)){
        fs.unlinkSync(pathViejo);
    }
}

const actualizarImagen = async (tipo,id,path,nombreArchivo)=>{
    let pathViejo ='';
    switch (tipo) {
        case 'usuarios':
            const usuarios = await Usuario.findById(id);
            if(!usuarios){
                console.log('No es un usuarios')
                return false;
            }
            pathViejo= `./uploads/usuarios/${ usuarios.img }`;
            borrarImage(pathViejo); 
            usuarios.img = nombreArchivo
            await usuarios.save();
            return true;
            
            break;
        case 'hospitales': 
            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log('No es un hospital')
                return false;
            }
            pathViejo= `./uploads/hospitales/${ hospital.img }`;
            borrarImage(pathViejo); 
            hospital.img = nombreArchivo
            await hospital.save();
            return true;
            break;  
        case 'medicos': 
            const medico = await Medico.findById(id);
            if(!medico){
                console.log('No es un medico')
                return false;
            }
            pathViejo= `./uploads/medicos/${ medico.img }`;
            borrarImage(pathViejo); 
            medico.img = nombreArchivo
            await medico.save();
            return true;
            break; 
        default: 
            return resp.status(400).json({
                ok:false,
                msg:'debe seleccionar coleccion usuarios/hospitales/medicos'
            });
            break;
    }
    
}

module.exports = {
    actualizarImagen
}