'user strict';

// const path = require('path');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const execute = async () => {
    try {
        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync("1234", salt);

        //USUARIO DEMO
        await prisma.usuarios.create({
            data: {
                nombre: "Usuario Demo",
                usuario:"usuario",
                password:password
            }
        });
 
 
 
    } catch (err) {
        console.error(err);
        throw err;
    }
};

execute();
