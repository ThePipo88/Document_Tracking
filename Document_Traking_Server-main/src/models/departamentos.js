const mongoose = require("mongoose");

const DepartamentosSchema = mongoose.Schema({
    nombre_dep: String,
    jefe_dep: String,
    descripcion_dep: String,
    tel_dep: Number,
    correo_dep: String,
    organizacion_id: String
});

module.exports = mongoose.model("departamentos", DepartamentosSchema);