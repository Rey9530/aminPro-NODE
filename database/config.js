const mongoose = require('mongoose');


const dbConnect = async ()=>{

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB Online')
    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar con la db');
    }
}

module.exports = {
    dbConnect
}