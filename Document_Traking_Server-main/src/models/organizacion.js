const mongoose = require("mongoose");

const OrganizacionSchema = mongoose.Schema({
    nombre_org: String,
    descripcion_org: String,
    tipo_org: String,
    correo_org: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model("organizacione", OrganizacionSchema);