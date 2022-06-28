const { response } = require("express");

const Hospital = require('../modelos/hospital');

const getHospitales= async (req,resp=response)=>{ 

    
    const hospital = await Hospital.find()
                        .populate('usuario','nombre img')

    resp.json({
        ok:true, 
        hospital
    });
}

const creaHospital= async (req,resp=response)=>{ 

    const uid = req.uid;
    const hospital = new Hospital( {  usuario:uid, ...req.body} ); 

    try {

        await hospital.save();

        
        resp.json({
            ok:true,
            hospital: hospital
        });
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }



}

const actualizarHospital= async (req,resp=response)=>{ 

    const id = req.params.id;
    const usuario = req.uid
    try {

        const hospital = await Hospital.findById(id) 
        if(!hospital){
            return resp.status(404).json({
                ok:false,
                msg:'Hospital no encontrado'
            });
        }

        const cambios = {
            ...req.body,usuario
        }

        // hospital.nombre = req.body.nombre;

        const hospitalUpdate = await Hospital.findByIdAndUpdate(id, cambios, {new:true} );
        
        resp.json({
            ok:true,
            hospital: hospitalUpdate 
        });
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }
}
const eliminarHospital= async (req,resp=response)=>{ 
    const id = req.params.id;
    const usuario = req.uid
    try {

        const hospital = await Hospital.findById(id) 
        if(!hospital){
            return resp.status(404).json({
                ok:false,
                msg:'Hospital no encontrado'
            });
        }
        
        await Hospital.findByIdAndDelete(id);

        
        resp.json({
            ok:true,msg:'Hospital Eliminado' 
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
    getHospitales,creaHospital,actualizarHospital,eliminarHospital
}
