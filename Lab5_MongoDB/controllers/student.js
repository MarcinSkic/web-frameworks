const Student = require("../models/student.js");

exports.index = (req, res) => {
    res.send(`
<h3 style="text-align:center">Baza danych studentów</h3>
<h4 style="text-align:center">Kliknij <a href="/list"> tutaj</a>, aby uzyskać dostęp do bazy.</h4>`);
};

exports.read = async (req, res) => {
    try {
        const docs = await Student.find();
        res.render("list", {
            list: docs,
        });
    } catch (err) {
        console.log("Błąd pobierania danych" + err);
    }
};

exports.getCreate = (req, res) => {
    res.render("addOrEdit", {
        viewTitle: "Dodaj studenta",
    });
};

exports.getUpdate = (req, res) => {
    Student.findById(req.params.id)
        .then((doc) => {
            res.render("addOrEdit", {
                viewTitle: "Zaktualizuj dane studenta",
                student: doc,
            });
        })
        .catch((err) => {
            console.log("Błąd podczas akutalizowania danych" + err);
        });
};

exports.postCreateOrUpdate = (req, res) => {
    if (req.body._id == "") {
        insert(req, res);
    } else {
        update(req, res);
    }
};

exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.id)
        .then((doc) => {
            res.redirect("/list");
        })
        .catch((err) => {
            console.log("Błąd podczas usuwania: " + err);
        });
};

async function insert(req, res) {
    let student = new Student();
    student.fullName = req.body.fullName;
    student.email = req.body.email;
    student.mobile = req.body.mobile;
    student.city = req.body.city;
    try {
        await student.save();
        res.redirect("/list");
    } catch (err) {
        console.log("Błąd podczas dodawania studenta: " + err);
    }
}

async function update(req, res) {
    try {
        await Student.findOneAndUpdate({ _id: req.body._id }, req.body, {
            new: true,
        });
        res.redirect("list");
    } catch (err) {
        console.log("Błąd podczas aktualizowania danych: " + err);
    }
}
