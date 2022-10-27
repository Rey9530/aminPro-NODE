# NodeJs - Basic

## Pasos para hacer levantar


## Instalar dependencias
```bash
$ yarn install
```

##  Levantar una imagen de base de datos de mysql
´´´bash
$ docker-compose up -d 
´´´

## Ejecutar las migraciones
´´´bash
$ npx prisma migrate dev --name init  
´´´


## Correr la aplicacion
´´´bash
$ yarn start:dev
´´´