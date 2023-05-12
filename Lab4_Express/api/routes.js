import { Router } from "express";
import users from "./users.js";
const router = Router();

router.get("/", (req, res) => {
    res.json(users);
});

router.get("/:id", (req, res) => {
    const found = users.filter((user) => user.id === parseInt(req.params.id));
    if (found.length !== 0) {
        res.json(found);
    } else {
        res.status(400).json({
            msg: `Użytkownik o id ${req.params.id} nie został odnaleziony`,
        });
    }
});

router.post("/create", (req, res) => {
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

router.patch("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
    const index = users.findIndex(
        (user) => user.id === parseInt(req.params.id)
    );
    if (index !== -1) {
        const deleted = users.splice(index, 1)[0];
        res.json({ deleted });
    } else {
        res.status(400).json({
            msg: `Użytkownik o id ${req.params.id} nie istnieje!`,
        });
    }
});

export default router;
