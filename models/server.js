require("dotenv").config();
const cors = require("cors");
const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Middelwares
    this.middlewares();
    //rutas de mi app

    this.routes();
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
  }
}

module.exports = Server;
