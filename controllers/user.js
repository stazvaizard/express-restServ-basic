const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { Promise } = require("mongoose");

const userGet = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  const usuarios = await Usuario.find()
    .skip(parseInt(desde))
    .limit(parseInt(limite));
  const total = await Usuario.countDocuments();
  res.json({
    msg: "apis metodo get",
    total_registros_BD: total,
    total_usuarios_Consulta: usuarios.length,
    usuarios,
  });
};
const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { password, google, ...resto } = req.body;
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json({ msg: "apis metodo put", usuario });
};

const userPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  //verfificar si el correo exsite
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya esta registrado",
    });
  }
  //encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  await usuario.save();
  res.json({ usuario });
};
const userDelete = async (req, res = response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndDelete(id);
  res.json({ msg: "apis metodo delete", usuario });
};

module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete,
};
