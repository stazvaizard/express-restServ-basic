require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //conectar bd
    this.conectarDB();
    //Middelwares
    this.middlewares();
    //rutas de mi app

    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());

    //lectura y parse del body
    this.app.use(express.json());

    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use("/api/usuarios", require("../routes/user"));
  }
  listen() {
    this.app.listen(this.port);
    console.log("Corriendo en el puerto " + this.port);
  }
}

module.exports = Server;
