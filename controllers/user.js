const { response } = require("express");

const userGet = (req, res = response) => {
  const params = req.query;
  res.json({ msg: "apis metodo get", params });
};
const userPut = (req, res = response) => {
  const id = parseInt(req.params.id);
  res.json({ msg: "apis metodo put", id });
};

const userPost = (req, res = response) => {
  const { email, password } = req.body;
  res.json({ msg: "apis metodo post", email, password });
};
const userDelete = (req, res = response) => {
  res.json({ msg: "apis metodo delete" });
};
const userPatch = (req, res = response) => {
  res.json({ msg: "apis metodo patch" });
};

module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch,
};
