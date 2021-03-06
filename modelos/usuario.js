const { Schema, model } = require("mongoose");


const usuarioSchema = Schema({
    nombre:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true

    },
    password:{

        type:String,
        require:true,
    },
    img:{
        type:String

    },
    role:{

        type:String,
        require:true,
        default:'USER_ROLE'
    },
    google:{
        
        type:Boolean,
        default:false
    }
});



usuarioSchema.method('toJSON',function(){
    const { __v, _id,password, ...objects }=this.toObject();
    objects.uid = _id;
    return objects;

});

module.exports = model('Usuario', usuarioSchema);