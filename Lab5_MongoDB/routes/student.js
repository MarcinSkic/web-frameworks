const express = require("express");
const router = express.Router();
const controller = require("../controllers/student.js");

router.get("/", controller.index);

router.get("/list", controller.read);

router.get("/addOrEdit", controller.getCreate);

router.get("/:id", controller.getUpdate);

router.post("/", controller.postCreateOrUpdate);

router.get("/delete/:id", controller.delete);

module.exports = router;
