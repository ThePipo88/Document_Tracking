const express = require("express");
const OrganizacionController = require("../controller/organizacion");

const api = express.Router();

api.post("/organizacion/crearOrganizacion", OrganizacionController.crearOrganizacion);
api.get("/organizacion/getOrganizacion/:id", OrganizacionController.findById);
api.put("/organizacion/updateById/:id", OrganizacionController.updateOrganizacion);


//Exportar el api

module.exports = api;