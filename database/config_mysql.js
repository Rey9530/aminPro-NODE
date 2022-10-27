var mysql = require('mysql');


const dbConnect = async ()=>{

    var conexion= mysql.createConnection({
        host : process.env.DB_HOST,
        database : process.env.DB_NAME,
        user : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
    });
    
    conexion.connect(function(err) {
        if (err) {
            console.error('Error de conexion: ' + err.stack);
            return;
        }
        console.log('Conectado con el identificador ' + conexion.threadId);
    });
    conexion.query('SELECT * FROM empleados', function (error, results, fields) {
        if (error)
            throw error;
    
        results.forEach(result => {
            console.log(result);
        });
    });
    conexion.end();
}


module.exports = {
    dbConnect
}