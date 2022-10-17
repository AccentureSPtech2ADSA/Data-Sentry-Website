var express = require("express");
var cors = require("cors");
var path = require("path");
require("dotenv").config();
var PORTA = process.env.EXPRESS_PORT;

var app = express();

var indexRouter = require("./src/routes/index");
var hospitalRouter = require("./src/routes/hospital");
var userHospitalRouter = require("./src/routes/userHospital");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/hospital", hospitalRouter);
app.use("/user", userHospitalRouter);

app.listen(PORTA, function () {
  console.log(`Servidor do site está rodando rodando: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "DEV", banco local (MySQL Workbench). \n
    \t\tSe "PROD", banco remoto (SQL Server em nuvem Azure)`);
});