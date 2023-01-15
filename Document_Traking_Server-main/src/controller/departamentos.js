const bcrypt = require("bcrypt-nodejs");
const Departamentos = require("../models/departamentos");


async function registrar(req, res) {
    const departamentos = new Departamentos(req.body);

    await departamentos.save((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El departamento ya existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error creando el departamento" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}


async function findById(req, res) {

    const departamento = await Departamentos.findById(req.params.id, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El departamento consultado no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando el departamento" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}


async function findAll(req, res) {

    const departamentos = await Departamentos.find((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "No existen departamentos registrados" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los departamentos" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}

async function getByIdOrg(req, res) {

    await Departamentos.find({ organizacion_id: req.params.id }, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "No existen departamentos registrados" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los departamentos" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}

async function updateDepartamento(req, res) {

    await Departamentos.findByIdAndUpdate(req.params.id, req.body, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El departamento a actualizar no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error actualizando el departamento" });
            } else {
                res.status(200).send({ status: 'Departamento actualizado' });
            }
        }
    }).clone().catch(function (err) { console.log(err) })

}


async function deleteDepartamento(req, res) {

    await Departamentos.findByIdAndDelete(req.params.id, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El Departamento a eliminar no existe" });
        } else {
            res.status(200).send({ status: 'Departamento eliminado' });
        }
    }).clone().catch(function (err) { console.log(err) })


}

module.exports = {
    registrar,
    findById,
    findAll,
    updateDepartamento,
    deleteDepartamento,
    getByIdOrg
};