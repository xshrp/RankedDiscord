const { ejecutarUnirse } = require("./unirse");
const { ejecutarAbandonar } = require("./abandonar");
const { ejecutarPerfil } = require("./perfil");
const { ejecutarTop } = require("./top");
const { ejecutarComandos } = require("./comandos");

const PREFIJO = "r/";

function handler(message) {
    const args = message.content.split(/ +/g);
    const command = args.shift().toLowerCase();

    switch (command) {
        case `${PREFIJO}unirse`:
            ejecutarUnirse(message);
            break;
        case `${PREFIJO}abandonar`:
            ejecutarAbandonar(message);
            break;
        case `${PREFIJO}perfil`:
            ejecutarPerfil(message);
            break;
        case `${PREFIJO}top`:
            ejecutarTop(message);
            break;
        case `${PREFIJO}comandos`:
            ejecutarComandos(message);
            break;
    }
}

module.exports = { handler };