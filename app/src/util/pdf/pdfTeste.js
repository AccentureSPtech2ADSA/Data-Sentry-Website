const pdf = require("pdf-creator-node");
const fs = require("fs");

const html = fs.readFileSync("./htmlTemplatePdf.html", "utf-8");

var options = {
  format: "A4",
  orientation: "portrait",
  border: "10mm",
  header: {
    height: "45mm",
    contents:
      '<div style="text-align: center;">Data Sentry - SPTech - Accenture</div><br><br><h1>Usuarios do servidor 3</h1>',
  },
  footer: {
    height: "28mm",
    contents: {
      first: "Cover page",
      2: "Second page", // Any page number is working. 1-based index
      default:
        '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
      last: "Last Page",
    },
  },
};

var users = [
  {
    name: "Delfino",
    age: "18",
  },
  {
    name: "Edu",
    age: "21",
  },
  {
    name: "Matheus",
    age: "18",
  },
];

var document = {
  html: html,
  data: {
    users: users,
  },
  path: "./output.pdf",
  type: "",
};
if (fs.existsSync("./output.pdf")) {
  fs.rmSync("./output.pdf");
  createPdf();
} else {
  createPdf();
}

function createPdf() {
  pdf
    .create(document, options)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
