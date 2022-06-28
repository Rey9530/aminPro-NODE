const { response } = require("express");
const Medico = require('../modelos/medico');
const Hospital = require('../modelos/hospital');


const getMedico= async (req,resp=response)=>{ 
    const medico = await Medico.find()
                        .populate('usuario','nombre img')
                        .populate('hospital','nombre')

    resp.json({
        ok:true, 
        medico
    });
}

const creaMedico= async (req,resp=response)=>{ 

    const uid = req.uid;
    const tk_hospital = req.body.tk_hospital;

    try {
        const hospital = await Hospital.findById(tk_hospital) 

        if(!hospital){ 
            return resp.status(500).json({
                ok:false,
                msg:'hospital invalido'
            });
        }

        delete req.body.tk_hospital;
        const medico = new Medico({  usuario:uid, hospital: tk_hospital, ...req.body }); 
        await medico.save();  
        resp.json({
            ok:true,
            medico
        });
        
    } catch (error) { 
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    } 

}

const actualizarMedico= async (req,resp=response)=>{ 
    const usuario = req.uid;
    const tk_hospital = req.body.tk_hospital;
    const id = req.params.id;

    try {
        const medicodb = await Medico.findById(id) ;
        if(!medicodb){ 
            return resp.status(404).json({
                ok:false,
                msg:'Medico invalido'
            });
        }
        const hospital = await Hospital.findById(tk_hospital) ;
        if(!hospital){ 
            return resp.status(500).json({
                ok:false,
                msg:'hospital invalido'
            });
        }

        delete req.body.tk_hospital;
        
        const cambios = {
            ...req.body,usuario
        }
        const medico = await Medico.findByIdAndUpdate(id, cambios, {new:true} ); 
        resp.json({
            ok:true,
            medico
        });
        
    } catch (error) { 
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    } 
}
const eliminarMedico= async (req,resp=response)=>{ 
    const id = req.params.id;
    const usuario = req.uid
    try {

        const data = await Medico.findById(id) 
        if(!data){
            return resp.status(404).json({
                ok:false,
                msg:'Datos no encontrados'
            });
        }
        
        await Medico.findByIdAndDelete(id);

        
        resp.json({
            ok:true,msg:'Medico Eliminado' 
        });
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }
}

module.exports = {
    getMedico,creaMedico,actualizarMedico,eliminarMedico
}
