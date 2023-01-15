const mongoose = require("mongoose");

const TramitesSchema = mongoose.Schema({
    tipo_tra: String,
    organizacion_id: String,
    departamento_id: String,
    descripcion_tra: String,
    ciclo_tra:
        [
            {
                id_departamento: String,
                estado_cic: Boolean
            }
        ],
    documentos: [
        {
            nombre_documento: String,
            descripcion_documento: String,
            estado_documento: Boolean,
            tipo_documento: String
        }
    ]
});

module.exports = mongoose.model("tramite", TramitesSchema);