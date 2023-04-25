import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
import { check, validationResult } from "express-validator";
import users from "./users.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
            .withMessage("Wiek powinnien być w przedziale 0 - 110"),
    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(402).json({ errors: errors.array() });
        }

        let username = req.body.username;
        let email = req.body.email;
        let age = req.body.age;

        res.send(
            `Użytkownik: ${username} <br /> Email: ${email} <br/> Wiek: ${age}`
        );
    }
);
//--------------------BASIC API----------------------
app.get("/api/users", (req, res) => {
    res.json(users);
});

app.get("/api/users/:id", (req, res) => {
    const found = users.filter((user) => user.id === parseInt(req.params.id));
    if (found.length !== 0) {
        res.json(found);
    } else {
        res.status(400).json({
            msg: `Użytkownik o id ${req.params.id} nie został odnaleziony`,
        });
    }
});

app.post("/api/users/create", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        status: "aktywny",
    };
    if (!newUser.name || !newUser.email) {
        return res
            .status(400)
            .json({ msg: "Wprowadź poprawne imię i nazwisko oraz email!" });
    }
    users.push(newUser);
    res.json(users);
});

app.patch("/api/users/:id", (req, res) => {
    const found = users.some((user) => user.id === parseInt(req.params.id));
    if (found) {
        const updUser = req.body;
        users.forEach((user) => {
            if (user.id === parseInt(req.params.id)) {
                user.name = updUser.name ? updUser.name : user.name;
                user.email = updUser.email ? updUser.email : user.email;
                res.json({ msg: "Dane użytkownika zaktualizowane", user });
            }
        });
    } else {
        res.status(400).json({
            msg: `Użytkownik o id ${req.params.id} nie istnieje!`,
        });
    }
});

//--------------------MIDDLEWARE--------------------------

app.listen(PORT, () => {
    console.log("Serwer działa na http://localhost:3000");
});
