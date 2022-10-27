# NodeJs - Basic

## Pasos para hacer levantar


## Instalar dependencias
```bash
$ yarn install
```

##  Levantar una imagen de base de datos de mysql
´´´
docker-compose up -d 
´´´

## Ejecutar las migraciones
´´´
 npx prisma migrate dev --name init  
´´´


## Correr la aplicacion
´´´
 yarn start:dev
´´´