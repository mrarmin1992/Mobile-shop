const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
    const secret = process.env.secret; // Preuzmi secret iz env varijable
    const api = process.env.API_URL;  // Preuzmi API URL iz env varijable

    // Vraća JWT middleware s postavljenim pravilima
    return jwt({
        secret,                      // Korištenje secret za verifikaciju tokena
        algorithms: ["HS256"],        // Algoritam za verifikaciju
        isRevoked: isRevoked          // Pozivanje funkcije za provjeru opoziva tokena
    }).unless({
        // Definiraj rute koje ne zahtijevaju autentifikaciju
        path: [
            { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /\/api\/v1\/users(.*)/, methods: ["POST", "OPTIONS"] },
            `${api}/users/login`,
            `${api}/users/register`,
        ],
    });
}

async function isRevoked(req, token) {
    return !token.payload.isAdmin; // Blokira ako korisnik NIJE admin
}

module.exports = authJwt;
