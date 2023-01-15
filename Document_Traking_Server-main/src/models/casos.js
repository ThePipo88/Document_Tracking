const mongoose = require("mongoose");

const CasosSchema = mongoose.Schema({
    nombre_caso: String,
    fecApertura_cas: Date,
    fecFinalizacion_cas: Date,
    nume_cas: String,
    formato_cas: String,
    isAbierto_cas: Boolean,
    id_tramite: String,
    id_departamento: String,
    id_organizacion: String
});

module.exports = mongoose.model("casos", CasosSchema);