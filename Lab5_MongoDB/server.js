require("dotenv").config();
const express = require("express");
const path = require("path");
const handleBars = require("handlebars");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const app = express();

//-------------MIDDLEWARE-------------------
app.use(
    express.urlencoded({
        extended: true,
    })
);

//-------------TEMPLATE ENGINE-------------------
app.set("views", path.join(__dirname, "/"));
app.engine(
    "hbs",
    exphbs.engine({
        handlebars: allowInsecurePrototypeAccess(handleBars),
        extname: "hbs",
        defaultLayout: "layout",
        layoutsDir: __dirname,
    })
);
app.set("view engine", "hbs");

//----------------DATABASE------------------
mongoose
    .connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true })
    .then((result) => {
        console.log("Połączono z bazą");
    })
    .catch((err) => {
        console.log("Nie można połączyć się z MongoDB. Błąd: " + err);
    });

//-------------------STARTUP---------------------
app.listen(3000, () => {
    console.log("Serwer nasłuchuje na porcie 3000");
});
