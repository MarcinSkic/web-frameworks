const mongoose = require("mongoose");
module.exports = mongoose
    .connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true })
    .then((result) => {
        console.log("Połączono z bazą");
    })
    .catch((err) => {
        console.log("Nie można połączyć się z MongoDB. Błąd: " + err);
    });
