const express = require("express");
const TramitesController = require("../controller/tramites");

const api = express.Router();

api.post("/tramites/registrartramites", TramitesController.registrar);
api.get("/tramites/getAll", TramitesController.findAll);
api.get("/tramites/getByIdDep/:id", TramitesController.getByIdDep);
api.get("/tramites/getByIdOrg/:id", TramitesController.findByIdOrg);
api.get("/tramites/obtener/:id", TramitesController.findById);
api.put("/tramites/actualizar/:id", TramitesController.updateTramite);


module.exports = api;