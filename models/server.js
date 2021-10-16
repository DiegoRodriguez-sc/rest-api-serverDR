const express = require("express");
const cors = require("cors");



class Server{

   constructor(){
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.path ={
      //path-e:"endpoint"
    };

    //base de datos

    //middlewares

    //rutas de mi app


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
    // this.app.use(this.path.path-e, require("route"));
   }

   listen(){
    this.app.listen(this.port);
   }

}

module.exports = Server;