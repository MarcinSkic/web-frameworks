require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
//middleware
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;
const connection = require("./db");
connection();
app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`));
