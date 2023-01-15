const bcrypt = require("bcrypt-nodejs");
const Tramites = require("../models/tramites");

function registrar(req, res) {
    const tramites = new Tramites(req.body);

    tramites.save((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El tramite ya existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error creando el tramite" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}

async function findAll(req, res) {

    const tramites = await Tramites.find((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "No existen tramites registrados" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los tramites" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}

async function findByIdOrg(req, res) {

    const tramites = await Tramites.find({ organizacion_id: req.params.id }, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "No existen tramites registrados" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los tramites" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}



async function getByIdDep(req, res) {

    await Tramites.find({ departamento_id: req.params.id }, (err, userStored) => {
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

async function findById(req, res) {

    const tramite = await Tramites.findById(req.params.id, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El tramite consultado no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando el tramite" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}

async function updateTramite(req, res) {

    await Tramites.findByIdAndUpdate(req.params.id, req.body, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El tramite a actualizar no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error actualizando el tramite" });
            } else {
                res.status(200).send({ status: 'Tramite actualizado' });
            }
        }
    }).clone().catch(function (err) { console.log(err) })

}

module.exports = {
    registrar,
    findAll,
    getByIdDep,
    findById,
    updateTramite,
    findByIdOrg
};