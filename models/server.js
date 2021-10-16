const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");



class Server{

   constructor(){
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.path ={
      users:"/api/users"
    };

    //base de datos
    this.connectionDB();
    //middlewares
    this.middlewares();
    //rutas de mi app
     this.routes();

   }

   async connectionDB(){
       await dbConnection();
   }

   middlewares(){
    //cors
    this.app.use(cors());

    //lectura y parseo del body
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));

   }


   routes(){
     this.app.use(this.path.users, require("../routes/users"));
   }

   listen(){
    this.app.listen(this.port, ()=>{
      console.log("servidor corriendo en puerto",this.port);
    });
   }

}

module.exports = Server;