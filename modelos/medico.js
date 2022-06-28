const { Schema, model } = require("mongoose");


const MedicoSchema = Schema({
    nombre:{
        type:String,
        require:true,
    }, 
    img:{
        type:String

    }, 
    usuario:{
        require:true,
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }, 
    hospital:{
        require:true,
        type:Schema.Types.ObjectId,
        ref:'Hospital'
    }
});



MedicoSchema.method('toJSON',function(){
    const { __v,  ...objects }=this.toObject(); 
    return objects;

});

module.exports = model('Medico', MedicoSchema);