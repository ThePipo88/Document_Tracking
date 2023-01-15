const express = require("express");
const DepartamentosController = require("../controller/departamentos");

const api = express.Router();

api.post("/departamento/registrar", DepartamentosController.registrar);
api.get("/departamento/obtener/:id", DepartamentosController.findById);
api.get("/departamento/getAll", DepartamentosController.findAll);
api.get("/departamento/getByIdOrg/:id", DepartamentosController.getByIdOrg);
api.put("/departamento/actualizar/:id", DepartamentosController.updateDepartamento);
api.delete("/departamento/eliminar/:id", DepartamentosController.deleteDepartamento);

module.exports = api;