import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.send("Prosty serwer oparty na Express");
});
app.get("/form", function (req, res) {
    res.sendFile(path.join(__dirname, "form.html"));
});

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

app.get("/about", function (req, res) {
    res.send("Stworzył Marcin Skic");
});

app.get("/name/:name1/:name2", function (req, res) {
    res.status(200)
        .type(".html")
        .send(`<h1>Witaj ${req.params.name1} i ${req.params.name2}</h1>`);
});

app.post("/result", (req, res) => {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
        res.send("Uzupełnij dane!");
    } else res.send("Użytkownik: " + username + "<br>Hasło: " + password);
});

app.listen(PORT, () => {
    console.log("Serwer działa na http://localhost:3000");
});
