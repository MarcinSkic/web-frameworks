import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
import { check, validationResult } from "express-validator";
import apiRouter from "./api/routes.js";
import metoda, { ex16 } from "./middleware/metoda.js";
import isAuthorized from "./middleware/autoryzacja.js";
import getDate from "./server-files/getDate.js";
import basicAuth from "express-basic-auth";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//--------------------MIDDLEWARE--------------------------

app.use(ex16);

//------------------AUTHORIZATION------------------------------
// app.use(
//     basicAuth({
//         authorizer: (user, password) => {
//             return password === "secretpaswd";
//         },
//         unauthorizedResponse: () => {
//             return { msg: "You are unathorized to access this" };
//         },
//     })
// );

//----------------BASICS-------------------------
app.get("/", function (req, res) {
    res.send("Prosty serwer oparty na Express");
});
app.get("/about", function (req, res) {
    res.send("Stworzył Marcin Skic");
});
//---------------READING GET PARAMS------------------
app.get("/name/:name1/:name2", function (req, res) {
    res.status(200)
        .type(".html")
        .send(`<h1>Witaj ${req.params.name1} i ${req.params.name2}</h1>`);
});
//----------------BASIC FORM------------------------
app.get("/form", function (req, res) {
    res.sendFile(path.join(__dirname, "form.html"));
});

app.post("/result", isAuthorized);

app.post("/result", (req, res) => {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
        res.send("Uzupełnij dane!");
    } else res.send("Użytkownik: " + username + "<br>Hasło: " + password);
});
//-------------------READING ARRAY FROM FORM------------------
app.get("/languageForm", (req, res) => {
    res.sendFile(path.join(__dirname, "languageForm.html"));
});

app.post("/languageForm", (req, res) => {
    const fullname = req.body.fullname;
    let languages;
    if (Array.isArray(req.body.language)) {
        languages = req.body.language;
    } else if (req.body.language) {
        languages = [req.body.language];
    } else {
        languages = [];
    }

    res.send(`Użytkownik ${fullname}</br>
    Znajomość języków:</br>
    <ul>
    ${languages.reduce((acc, value) => {
        return (acc += `<li>${value}</li>`);
    }, "")}
    </ul>`);
});

//-----------------VALIDATION----------------------
app.get("/validationForm", function (req, res) {
    res.sendFile(path.join(__dirname, "validationForm.html"));
});

app.post(
    "/validationForm",
    [
        check("username")
            //.withMessage("Użyto niedozwolonych znaków, użyj tylko a-z,A-Z")
            .bail()
            .isLength({ min: 3, max: 25 })
            .withMessage("Niepoprawna długość nazwy, powinno być: 3 - 25")
            .trim()
            .stripLow()
            .customSanitizer((value) => {
                const split = value.split(" ");
                return `${split[0].charAt(0)}.${split[1]?.charAt(0) ?? ""}`;
            }),
        check("email").isEmail().withMessage("To nie email").normalizeEmail(),
        check("age")
            .isInt({ min: 0, max: 110 })
            .withMessage("Wiek powinnien być liczbą w przedziale 0 - 110"),
    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(402).json({ errors: errors.array() });
        }

        let username = req.body.username;
        let email = req.body.email;
        let age = req.body.age;

        res.render("info", { username, email, age });
    }
);

//--------------------BASIC API----------------------
app.use("/api/users", apiRouter);

//---------------------START--------------------
app.listen(PORT, () => {
    console.log(getDate() + " === Serwer zostaje uruchomiony na porcie 3000");
});
