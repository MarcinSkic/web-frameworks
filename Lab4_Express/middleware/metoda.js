import getDate from "../server-files/getDate.js";

export default (req, res, next) => {
    console.log("Metoda: ", req.method);
    let sciezka =
        "Ścieżka: " + req.protocol + "://" + req.get("host") + req.originalUrl;
    console.log(sciezka);
    next();
};

export function ex16(req, res, next) {
    console.log(
        `${getDate()}--- Klient wysłał zapytanie o plik ${req.originalUrl}`
    );

    next();
}
