// var tabela_isOriginal = true;
// var originalHTML = "";

let serverSerial = 0;

let arrayProccessPerRow = [];

let arrayTresholds = [];

let mensagens = [
  { title: "Titulo1", message: "Mensagem1", type: "erro" },
  { title: "Titulo2", message: "Mensagem2", type: "warning" },
  { title: "Titulo3", message: "Mensagem3", type: "warning" },
];

function esconderLoading() {
  div_loading.style.display = "none";
}
function mostrarLoading() {
  div_loading.style.display = "flex";
}

async function getServers() {
  let token = window.sessionStorage.getItem("Token");
  let fkHospital = parseJwt(token).data.fkHospital;

  let req = await fetch(`/hospital/getServers/${fkHospital}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let res = await req.json();

  moldarDash(res.data);
  return res;
}

/**
 * @param {Array} serversData
 */
function moldarDash(serversData) {
  mostrarLoading();
  if (serversData.length > 0) {
    serverSerial = serversData[0]._serialServer;
    loadDashByServer(serversData[0]._serialServer);
    let dropdown = document.querySelector("#myDropdown");
    serversData.forEach((server, index) => {
      dropdown.innerHTML += `<a onclick="loadDashByServer('${
        server._serialServer
      }')" >#${server._serialServer} - ${index + 1}</a>`;
    });
    tela_sem_servidores.style.display = "none";
    tela_completa_dashboard.style.display = "block";
  } else {
    tela_sem_servidores.style.display = "block";
    tela_completa_dashboard.style.display = "none";
  }
}

/**
 *
 * @param {String} server
 */
async function loadDashByServer(server) {
  loadTableProcessPerComponents(server);

  document.getElementById("chartDisco").innerHTML = "";
  document.getElementById("chartCpu").innerHTML = "";
  document.getElementById("chartRam").innerHTML = "";
  arrayTresholds = await getTresholdsBasic(serverSerial);
  document.getElementById("btn_drop").innerHTML = `#Servidor: ` + server;
  //document.getElementById("btn_drop").innerHTML = `#Servidor: ${server} - ${index + 1}`
  loadKpiDisco(server);
  loadKpiRam(server);
  loadKpiCpu(server);

  loadChartsCPU(server);
  loadChartsRAM(server);
  loadChartsDISCO(server);
}
function loadChartsCPU(server) {
  fazerRequisicaoLoadChart(server, "CPU").then(async (dataCpu) => {
    let html = document.getElementById("chartCpu").parentElement;
    html.removeChild(html.querySelector("canvas"));
    html.innerHTML += `
      <canvas id="chartCpu"></canvas>
    `;
    labels6 = dataCpu[0].map(
      (item) => item.Horario.split("T")[1].split(".")[0]
    );
    config6.data.labels = labels6.reverse();
    let percentages = dataCpu[0].map((item) => item.Percentagem).reverse();

    console.log(dataCpu[0]);

    let dataUse = dataCpu[0]
      .map((item) => +item.Uso.replace("MHz", ""))
      .reverse();
    let threshold = arrayTresholds[0].find((item) => item.Type == "CPU");
    let lastUse = dataUse.at(-1);

    console.log(lastUse)
    console.log(threshold)
    if (lastUse > threshold.AlertHigh90) {
      let msg = `Seu CPU está acima de 90%.\n Tome cuidado e fique atento nos processos.`;
      addMessage("PROBLEMA CPU ACIMA DE 90%!!", msg, "error");
    } else if (lastUse > threshold.WarningHigh80) {
      let msg = `Seu CPU está acima de 80%.\n Tome cuidado e fique atento nos processos.`;
      addMessage("Tome cuidado", msg, "warning");
    } else if (lastUse < threshold.AlertLow10) {
      let msg = `O último de inserção do componente de CPU ficou abaixo de 10%! Recomendamos que olhe os processos em execução do servidor ${serverSerial} e veja se todos os procesos estão integros!\nDeseja relatar no Slack?`;
      addMessage("CUIDADO! CPU ABAIXO DE 10%", msg, "error");
    } else if (lastUse < threshold.WarningLow20) {
      let msg = `Seu CPU está abaixo de 20%.\n Tome cuidado e fique atento nos processos.`;
      addMessage("Tome cuidado", msg, "warning");
    }
    config6.data.datasets[0].data = percentages;
    new Chart(document.getElementById("chartCpu"), config6);
  });
}
async function loadChartsRAM(server) {
  let html = document.getElementById("chartRam").parentElement;
  html.removeChild(html.querySelector("canvas"));
  html.innerHTML += `
    <canvas id="chartRam"></canvas>
  `;
  let dataRam = await fazerRequisicaoLoadChart(server, "RAM");
  labels5 = dataRam[0].map((item) => item.Horario.split("T")[1].split(".")[0]);
  config5.data.labels = labels5.reverse();
  config5.data.datasets[0].data = dataRam[0]
    .map((item) => item.Percentagem)
    .reverse();

  let dataUse = dataRam[0]
    .map((item) => +item.Uso.replace("GBs", ""))
    .reverse();
  let threshold = arrayTresholds[0].find((item) => item.Type == "RAM");
  let lastUse = dataUse.at(-1);
  if (lastUse > threshold.AlertHigh90) {
    let msg = `Sua memoria RAM está acima de 90%.\n Tome cuidado e fique atento nos processos.`;
    addMessage("PROBLEMA RAM ACIMA DE 90%!!", msg, "error");
  } else if (lastUse > threshold.WarningHigh80) {
    let msg = `Sua memoria RAM está acima de 80%.\n Tome cuidado e fique atento nos processos.`;
    addMessage("Tome cuidado", msg, "warning");
  } else if (lastUse < threshold.AlertLow10) {
    let msg = `O último de inserção do componente de RAM ficou abaixo de 10%! Recomendamos que olhe os processos em execução do servidor ${serverSerial} e veja se todos os procesos estão integros!\nDeseja relatar no Slack?`;
    addMessage("CUIDADO! RAM ABAIXO DE 10%", msg, "error");
  } else if (lastUse < threshold.WarningLow20) {
    let msg = `Sua memoria RAM está abaixo de 20%.\n Tome cuidado e fique atento nos processos.`;
    addMessage("Tome cuidado", msg, "warning");
  }
  new Chart(document.getElementById("chartRam"), config5);
}
async function loadChartsDISCO(server) {
  let html = document.getElementById("chartDisco").parentElement;
  html.removeChild(html.querySelector("canvas"));
  html.innerHTML += `
    <canvas id="chartDisco"></canvas>
    
  </div>
  `;
  let dataDisco = await fazerRequisicaoLoadChart(server, "DISCO");
  labels7 = dataDisco[0].map(
    (item) => item.Horario.split("T")[1].split(".")[0]
  );
  config7.data.labels = labels7.reverse();
  config7.data.datasets[0].data = dataDisco[0]
    .map((item) => item.Percentagem )
    .reverse();
  let dataUse = dataDisco[0]
    .map((item) => +item.Uso.replace("GBs", "") )
    .reverse();
  let threshold = arrayTresholds[0].find((item) => item.Type == "DISCO");
  let lastUse = dataUse.at(-1);
  if (lastUse > threshold.AlertHigh90) {
    let msg = `Seu DISCO está acima de 90%.\n Tome cuidado e fique atento nos processos.`;
    addMessage("PROBLEMA DISCO ACIMA DE 90%!!", msg, "error");
  } else if (lastUse > threshold.WarningHigh80) {
    let msg = `Seu DISCO está acima de 80%.\n Tome cuidado e fique atento nos processos.`;
    addMessage("Tome cuidado", msg, "warning");
  } else if (lastUse < threshold.AlertLow10) {
    let msg = `O último de inserção do componente de DISCO ficou abaixo de 10%! Recomendamos que olhe os processos em execução do servidor ${serverSerial} e veja se todos os procesos estão integros!\nDeseja relatar no Slack?`;
    addMessage("CUIDADO! DISCO ABAIXO DE 10%", msg, "error");
  } else if (lastUse < threshold.WarningLow20) {
    let msg = `Seu DISCO está abaixo de 20%.\n Tome cuidado e fique atento nos processos.`;
    addMessage("Tome cuidado", msg, "warning");
  }
  new Chart(document.getElementById("chartDisco"), config7);

  esconderLoading();
}
async function fazerRequisicaoLoadChart(server, component) {
  let req = await fetch("/dashboard/getDataChart", {
    method: "POST",
    body: JSON.stringify({
      component: component,
      idServer: server,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let res = await req.json();
  if (res.status == 200) {
    return res.data;
  }
  throw new Error(res.msg);
}

async function fazerRequisicaoLoadKpi(server, component) {
  let req = await fetch("/dashboard/getPercentageUsePerCompenent", {
    method: "POST",
    body: JSON.stringify({
      component: component,
      idServer: server,
      dataInicio: "last",
      dataFim: "last",
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let res = await req.json();
  if (res.status == 200) {
    return res.data;
  }
  throw new Error(res.msg);
}

async function loadTableProcessPerComponents(server) {
  mostrarLoading();
  let dataRamProcess = await getPercentagePerComponent("RAM", server);
  let dataCpuProcess = await getPercentagePerComponent("CPU", server);
  let tbody = document.querySelector("tbody#tbody-process");
  tbody.innerHTML = "";

  dataCpuProcess[0].forEach((item) => {
    let RamProcesso = dataRamProcess[0].find((itemRam) => {
      return itemRam.Processo == item.Processo;
    });
    arrayProccessPerRow.push({
      nome: item.Processo,
      ram: RamProcesso.Percentagem,
      cpu: item.Percentagem,
    });
  });

  filterTable(arrayProccessPerRow);
  // let tableAtual = document.querySelector("tbody#tbody-process");
  // originalHTML = tableAtual
  esconderLoading();
}

async function getPercentagePerComponent(
  component,
  idServer,
  token = window.sessionStorage.getItem("Token"),
  dataInicio = "last",
  dataFim = "last"
) {
  let req = await fetch("/dashboard/getPercentagePerComponent", {
    method: "POST",
    body: JSON.stringify({
      component: component,
      idServer: idServer,
      dataInicio: dataInicio,
      dataFim: dataFim,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let res = await req.json();
  if (res.status == 200) {
    return res.data;
  }
  throw new Error(res.msg);
}

async function loadKpiDisco(server) {
  let dataDisco = await fazerRequisicaoLoadKpi(server, "DISCO");

  if (dataDisco[0][0]) {
    let html = document.getElementById("myChart3").parentElement;
    html.removeChild(html.querySelector("canvas"));
    html.innerHTML += `
    <canvas id="myChart3"></canvas>
  `;

    let dataHtmlDiscoUsoAtual = document.getElementById("usoAtualDisco");
    let dataHtmlDiscoUsoMaximo = document.getElementById("usoMaxDisco");
    let dataHtmlDiscoPorcentagemUso = document.getElementById("usoTotalDisco");

    config3.data.datasets[0].data = [
      +dataDisco[0][0].Uso.replace("GBs", ""),
      +dataDisco[0][0].MaximoUso.replace("GBs", "") -
        +dataDisco[0][0].Uso.replace("GBs", ""),
    ];
    new Chart(document.getElementById("myChart3"), config3);

    dataHtmlDiscoUsoAtual.innerHTML = `${dataDisco[0][0].Uso.replace(
      "GBs",
      ""
    )}`;
    dataHtmlDiscoUsoMaximo.innerHTML = `${dataDisco[0][0].MaximoUso}`;
    dataHtmlDiscoPorcentagemUso.innerHTML = `${
      (+dataDisco[0][0].Percentagem * 10).toFixed(1)
    }%`;
  }
}

async function loadKpiRam(server) {
  let html = document.getElementById("myChart2").parentElement;
  html.removeChild(html.querySelector("canvas"));
  html.innerHTML += `
    <canvas id="myChart2"></canvas>
  `;

  let dataHtmlRamUsoAtual = document.getElementById("usoAtualRam");
  let dataHtmlRamUsoMaximo = document.getElementById("usoMaxRam");
  let dataHtmlRamPorcentagemUso = document.getElementById("usoTotalRam");

  let dataRam = await fazerRequisicaoLoadKpi(server, "RAM");
  if (dataRam[0][0]) {
    config2.data.datasets[0].data = [
      +dataRam[0][0].Uso.replace("GBs", ""),
      +dataRam[0][0].MaximoUso.replace("GBs", "") -
        +dataRam[0][0].Uso.replace("GBs", ""),
    ];
    new Chart(document.getElementById("myChart2"), config2);

    dataHtmlRamUsoAtual.innerHTML = `${dataRam[0][0].Uso.replace("GBs", "")}`;
    dataHtmlRamUsoMaximo.innerHTML = `${dataRam[0][0].MaximoUso}`;
    dataHtmlRamPorcentagemUso.innerHTML = `${dataRam[0][0].Percentagem}%`;
  }
}

async function loadKpiCpu(server) {
  let html = document.getElementById("myChart1").parentElement;
  html.removeChild(html.querySelector("canvas"));
  html.innerHTML += `
    <canvas id="myChart1"></canvas>
  `;

  let dataHtmlCpuUsoAtual = document.getElementById("usoAtualCpu");
  let dataHtmlCpuUsoMaximo = document.getElementById("usoMaxCpu");
  let dataHtmlCpuPorcentagemUso = document.getElementById("usoTotalCpu");

  let dataCpu = await fazerRequisicaoLoadKpi(server, "CPU");
  if (dataCpu[0][0]) {
    config1.data.datasets[0].data = [
      +dataCpu[0][0].Uso.replace("MHz", ""),
      +dataCpu[0][0].MaximoUso.replace("MHz", "") -
        +dataCpu[0][0].Uso.replace("MHz", ""),
    ];
    new Chart(document.getElementById("myChart1"), config1);

    dataHtmlCpuUsoAtual.innerHTML = `${dataCpu[0][0].Uso.replace("MHz", "")}`;
    dataHtmlCpuUsoMaximo.innerHTML = `${dataCpu[0][0].MaximoUso}`;
    dataHtmlCpuPorcentagemUso.innerHTML = `${dataCpu[0][0].Percentagem}%`;
  }
}

document.body.onload = getServers();

function filterTablePerName() {
  filteredTable = arrayProccessPerRow.sort((a, b) =>
    a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0
  );

  let triangleNOME = document.querySelector("#title_nome");

  filterTable(filteredTable, triangleNOME);
}
function filterTablePerCpu() {
  filteredTable = arrayProccessPerRow.sort((a, b) =>
    a.cpu > b.cpu ? 1 : b.cpu > a.cpu ? -1 : 0
  );

  filterTable(filteredTable, document.querySelector("#title_cpu"));
}
function filterTablePerMemoria() {
  filteredTable = arrayProccessPerRow.sort((a, b) =>
    a.ram > b.ram ? 1 : b.ram > a.ram ? -1 : 0
  );

  filterTable(filteredTable, document.querySelector("#title_memoria"));
}
crescente = true;
function filterTable(array, triangle = null) {
  let tbody = document.querySelector("tbody#tbody-process");
  tbody.innerHTML = "";

  array = crescente ? array : array.reverse();
  if (triangle != null) {
    triangle.innerHTML = !crescente ? "▲" : "▼";
  }

  crescente = !crescente;
  array.forEach((item, index) => {
    tbody.innerHTML += `
          <tr class="${index % 2 == 0 ? "colorGray" : "colorBebe"}">
                  <td>${item.nome}</td>
                  <td>${(item.cpu + "").replace(".", ",")}%</td> 
                  <td>${(item.ram + "").replace(".", ",")}%</td>
                  <td>
                  <button
                    class="button_kill"
                    onclick="alertar('', 'Deseja mesmo encerrar esse processo ?', 'warning', 'Sim', 'Não')"
                  >
                    Encerrar
                  </button>
                </td>
                </tr>
               
          `;
  });
}

async function getTresholdsBasic(
  idServer,
  token = window.sessionStorage.getItem("Token")
) {
  let req = await fetch(`/dashboard/getThresholdsBasic/${idServer}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let res = await req.json();
  if (res.status == 200) {
    return res.data;
  }
  throw new Error(res.msg);
}
