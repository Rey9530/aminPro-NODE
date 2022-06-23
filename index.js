require('dotenv').config();

const expres =require('express');
const cors = require('cors');
const { dbConnect } = require('./database/config');

const app = expres();
app.use(cors())
app.use(expres.json())

dbConnect();


app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));



app.listen(process.env.PORT,()=>{
    console.log('Servidor corriendo: ',process.env.PORT)
});