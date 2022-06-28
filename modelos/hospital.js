const { Schema, model } = require("mongoose");


const HospitalSchema = Schema({
    nombre:{
        type:String,
        require:true,
    }, 
    usuario:{
        require:true,
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }, 
    img:{
        type:String
    }
},{ collection:'hospitales' });



HospitalSchema.method('toJSON',function(){
    const { __v,  ...objects }=this.toObject(); 
    return objects;

});

module.exports = model('Hospital', HospitalSchema);