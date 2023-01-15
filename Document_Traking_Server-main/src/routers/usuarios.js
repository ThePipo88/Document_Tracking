const express = require("express");
const UsuariosController = require("../controller/usuarios");

const api = express.Router();

api.post("/usuarios/registrar/usuario", UsuariosController.registrar);
api.get("/usuarios/obtener/usuario/login/:nombre/:contrasena", UsuariosController.findByNameAndPassword);
api.get("/usuarios/obtener/usuario/:id", UsuariosController.findById);
api.put("/usuarios/actualizar/usuario/:id", UsuariosController.updateUsuario);

//Exportar el api

module.exports = api;