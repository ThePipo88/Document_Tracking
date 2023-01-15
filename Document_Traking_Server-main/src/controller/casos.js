const bcrypt = require("bcrypt-nodejs");
const Casos = require("../models/casos");


async function registrar(req, res) {
    const casos = new Casos(req.body);

    await casos.save((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El caso ya existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error creando el caso" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}

async function findById(req, res) {

    const caso = await Casos.findById(req.params.id, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El caso consultado no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando el caso" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}

async function findByIdOrganizacion(req, res) {

    const caso = await Casos.find({ id_organizacion: req.params.id }, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El caso consultado no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando el caso" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}

async function findAll(req, res) {

    const casos = await Casos.find((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "No existen casos registrados" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los casos" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}


async function updateCaso(req, res) {

    const caso = await Casos.findByIdAndUpdate(req.params.id, req.body, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El caso a actualizar no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error actualizando el caso" });
            } else {
                res.status(200).send({ status: 'Caso actualizado' });
            }
        }
    }).clone().catch(function (err) { console.log(err) })


}


async function deleteCaso(req, res) {

    await Casos.findByIdAndDelete(req.params.id, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El caso a eliminar no existe" });
        } else {
            res.status(200).send({ status: 'Caso eliminado' });
        }
    }).clone().catch(function (err) { console.log(err) })


}

module.exports = {
    registrar,
    findByIdOrganizacion,
    findById,
    findAll,
    updateCaso,
    deleteCaso
};