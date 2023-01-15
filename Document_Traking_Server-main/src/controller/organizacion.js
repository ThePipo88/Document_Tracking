const bcrypt = require("bcrypt-nodejs");
const Organizacion = require("../models/organizacion");


async function crearOrganizacion(req, res) {

    const organizacion = new Organizacion(req.body);

    //Guardar usuario en base de datos
    organizacion.save((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El usuario ya existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error creandon el usuario" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}

async function findById(req, res) {

    const organizacion = await Organizacion.findById(req.params.id, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "Organizacion consultada no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando la organizacion" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}


async function updateOrganizacion(req, res) {

    await Organizacion.findByIdAndUpdate(req.params.id, req.body, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "La organizacion a actualizar no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error actualizando la organizacion" });
            } else {
                res.status(200).send({ status: 'Organizacion actualizada' });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}

module.exports = {
    crearOrganizacion,
    findById,
    updateOrganizacion
};

/*
async function signUp(req, res) {

    const organizacion = new Organizacion(req.body);

    bcrypt.hash(organizacion.clave_org, null, null, function (err, hash) {
        if (err) {
            res.status(500).send({ message: "Error enciptando la contrasena." });
        } else {
            organizacion.clave_org = hash;

            //Guardar usuario en base de datos
            organizacion.save((err, userStored) => {
                if (err) {
                    res.status(500).send({ message: "El usuario ya existe" });
                } else {
                    if (!userStored) {
                        res.status(404).send({ message: "Error creandon el usuario" });
                    } else {
                        res.status(200).send({ user: userStored });
                    }
                }
            })
        }
    })
} */