const { request, response } = require("express");
const jwt =require('jsonwebtoken');

const validarJWT = (req=request, resp=response, next)=>{

    const token = req.header('x-token');
    
    if(!token){
        return resp.status(401).json(
            {
                ok:false,
                msg:'No se detecta el token'
            }
        );
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        
        next();

    } catch (error) {
        return resp.status(401).json(
            {
                ok:false,
                msg:'No se detecta el token'
            }
        );
    }


}

module.exports = {
    validarJWT
}