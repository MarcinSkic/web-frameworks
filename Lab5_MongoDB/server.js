require("dotenv").config();
const express = require("express");
const path = require("path");
const handleBars = require("handlebars");
const exphbs = require("express-handlebars");
require("./db.js");
const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const studentsRouter = require("./routes/student.js");

const app = express();

//-------------MIDDLEWARE-------------------
app.use(
    express.urlencoded({
        extended: true,
    })
);

//-------------TEMPLATE ENGINE-------------------
const viewsPath = path.join(__dirname, "/views");
app.set("views", viewsPath);
app.engine(
    "hbs",
    exphbs.engine({
        handlebars: allowInsecurePrototypeAccess(handleBars),
        extname: "hbs",
        defaultLayout: "layout",
        layoutsDir: path.join(viewsPath, "/layouts"),
    })
);
app.set("view engine", "hbs");

//----------------DATABASE------------------

//---------------ROUTES----------------------
app.use("/", studentsRouter);

//-------------------STARTUP---------------------
app.listen(3000, () => {
    console.log("Serwer nasłuchuje na porcie 3000");
});
