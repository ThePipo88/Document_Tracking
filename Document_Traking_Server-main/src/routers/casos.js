const express = require("express");
const CasosController = require("../controller/casos");

const api = express.Router();

api.post("/casos/registrar/caso", CasosController.registrar);
api.get("/casos/obtener/:id", CasosController.findById);
api.get("/casos/getByIdOrganizacion/:id", CasosController.findByIdOrganizacion);
api.get("/casos/obtener/", CasosController.findAll);
api.put("/casos/actualizar/:id", CasosController.updateCaso);
api.delete("/casos/eliminar/:id", CasosController.deleteCaso);

module.exports = api;