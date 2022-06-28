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
    resp.json({
        ok:true,
        msg:'actualizarHospital'
    });
}
const eliminarHospital= async (req,resp=response)=>{ 
    resp.json({
        ok:true,
        msg:'eliminarHospital'
    });
}

module.exports = {
    getHospitales,creaHospital,actualizarHospital,eliminarHospital
}
