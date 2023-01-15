const express = require("express");
const EmpleadosController = require("../controller/empleados");

const api = express.Router();

api.post("/empleados/registrar/empleados", EmpleadosController.registrar);
api.get("/empleados/obtener/:id", EmpleadosController.findById);
api.get("/empleados/obtener/empleados", EmpleadosController.findAll);
api.get("/empleados/obtener/empleadosPorDepartamento/:id", EmpleadosController.getAllByIdDepartamento);
api.put("/empleados/actualizar/:id", EmpleadosController.updateEmpleado);
api.delete("/empleados/eliminar/:id", EmpleadosController.deleteEmpleado);

module.exports = api;