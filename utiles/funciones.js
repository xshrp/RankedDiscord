const fs = require("fs");
const DATOS = require("../datos.json");

const EloRank = require("elo-js");
const elo = new EloRank(32);

// JSON

function usuarioYaRegistrado(idUsuario) {
    return DATOS[idUsuario] !== undefined;
}

function crearUsuario(autor) {
    DATOS[autor.id] = {
        nick: autor.username,
        elo: 1000,
        totalPartidas: 0,
        totalGanadas: 0,
        estaActivo: true,
        rango: "Bronce"
    };
    fs.writeFileSync("./datos.json", JSON.stringify(DATOS, null, 4));
}

function obtenerUsuario(usuario) {
    if (usuarioYaRegistrado)
        return DATOS[usuario.id]
    else
        return null;
}

// ELO

function calcularEloPartida(puntosGanador, puntosPerdedor) {
    let esperadoGanador = elo.getExpected(puntosGanador, puntosPerdedor);
    let esperadoPerdedor = elo.getExpected(puntosPerdedor, puntosGanador);

    let nuevoEloGanador = elo.updateRating(esperadoGanador, 1, puntosGanador);
    let nuevoEloPerdedor = elo.updateRating(esperadoPerdedor, 0, puntosPerdedor);

    return { nuevoEloGanador, nuevoEloPerdedor };
}

module.exports = { usuarioYaRegistrado, crearUsuario, obtenerUsuario, calcularEloPartida };