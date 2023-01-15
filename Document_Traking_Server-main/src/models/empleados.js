const mongoose = require("mongoose");

const EmpleadosSchema = mongoose.Schema({
    nombre_emp: String,
    apellidos_emp: String,
    cedula_emp: {
        type: String,
        unique: true
    },
    fecNacimiento_emp: Date,
    tipoEmpleado: String,
    id_departamento: String
});

module.exports = mongoose.model("empleado", EmpleadosSchema);