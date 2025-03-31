const { ejecutarUnirse } = require("./unirse");
const { ejecutarAbandonar } = require("./abandonar");
const { ejecutarPerfil } = require("./perfil");

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
            ejecutarPerfil(message, args);
            break;
        case `${PREFIJO}top`:
            ejecutarTop(message, args);
            break;
    }
}

module.exports = { handler };