const mongoose = require("mongoose");

const UsuariosSchema = mongoose.Schema({
    nombre_usuario: String,
    rol: String,
    contrasena: String,
    organizacion_id: Object
});

module.exports = mongoose.model("usuario", UsuariosSchema);