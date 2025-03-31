const fs = require("fs");
const DATOS = require("../datos.json");

function usuarioYaRegistrado(idUsuario) {
    return DATOS[idUsuario] !== undefined;
}

function crearUsuario(autor) {
    DATOS[autor.id] = {
        nick: autor.username,
        id: autor.id,
        puntos: 1000,
        totalPartidas: 0,
        totalGanadas: 0
    };
    fs.writeFileSync("./datos.json", JSON.stringify(DATOS, null, 4));
}

function obtenerUsuario(usuario) {
    if (usuarioYaRegistrado)
        return DATOS[usuario.id]
    else
        return null;
}

module.exports = { usuarioYaRegistrado, crearUsuario, obtenerUsuario };