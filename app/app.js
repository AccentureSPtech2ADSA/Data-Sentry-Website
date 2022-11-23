var express = require("express");
var cors = require("cors");
var path = require("path");
require("dotenv").config();
const os = require('os');
var PORTA = process.env.EXPRESS_PORT;

var app = express();

var indexRouter = require("./src/routes/index");
var hospitalRouter = require("./src/routes/hospital");
var userHospitalRouter = require("./src/routes/userHospital");
var dashboardRouter = require("./src/routes/dashboard");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/hospital", hospitalRouter);
app.use("/user", userHospitalRouter);
app.use("/dashboard", dashboardRouter);

app.listen(PORTA, function () {
  console.log(os.hostname())
  console.log(`Servidor do site está rodando rodando: ${process.env.HOST} \n
    Você está rodando sua aplicação em ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "DEV", banco local (MySQL Workbench). \n
    \t\tSe "PROD", banco remoto (SQL Server em nuvem Azure)`);
});
