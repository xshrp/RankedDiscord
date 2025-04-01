const { ejecutarUnirse } = require("./unirse");
const { ejecutarAbandonar } = require("./abandonar");
const { ejecutarPerfil } = require("./perfil");
const { ejecutarTop } = require("./top");
const { ejecutarComandos } = require("./comandos");
const { ejecutarBackupManual } = require("./backup");
const { ejecutarWin } = require("./win");

const PREFIJO = "r/";

function handler(message, client) {
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
        case `${PREFIJO}backup`:
            ejecutarBackupManual(message);
            break;
        case `${PREFIJO}win`:
            ejecutarWin(message, client);
            break;
    }
}

module.exports = { handler };