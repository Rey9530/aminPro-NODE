require('dotenv').config();

const expres =require('express');
const cors = require('cors');
const { dbConnect } = require('./database/config');

const app = expres();
app.use(cors())

dbConnect();
// BVCspNkDHQPvL4Mn
// rey
// mongodb+srv://rey:BVCspNkDHQPvL4Mn@cluster0.tjtzp3n.mongodb.net/test

app.get('/',(req,resp)=>{
    resp.json({
        ok:true,
        msg:'todo bien'
    });
});


app.listen(process.env.PORT,()=>{
    console.log('Servidor corriendo: ',process.env.PORT)
});