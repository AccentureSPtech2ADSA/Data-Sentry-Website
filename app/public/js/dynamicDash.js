let arrayProcessosCPU = []
let arrayProcessosRAM = []
let arrayProcessosNOME = []

let serverSerial = 0;

let dataCpuProcess = []
let dataRamProcess = []

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
    dropdown.innerHTML = "";
    serversData.forEach((server, index) => {
      dropdown.innerHTML += `<a onclick="loadDashByServer('${server._serialServer
        }')" >#${server._serialServer} - ${index + 1}</a>`;
    });
    tela_sem_servidores.style.display = "none"
    tela_completa_dashboard.style.display = "block"
  } else {
    tela_sem_servidores.style.display = "block"
    tela_completa_dashboard.style.display = "none"
  }

  esconderLoading();
}

/**
 *
 * @param {String} server
 */
async function loadDashByServer(server) {
  mostrarLoading();
  console.log("carregar dash dinamic");

  loadTableProcessPerComponents(server);

  document.getElementById("chartDisco").innerHTML = "";
  document.getElementById("chartCpu").innerHTML = "";
  document.getElementById("chartRam").innerHTML = "";
  loadChartsCPU(server);
  loadChartsRAM(server);
  loadChartsDISCO(server);

  esconderLoading();
}
function loadChartsCPU(server) {
  fazerRequisicaoLoadChart(server, "CPU").then((dataCpu) => {
    let html = document.getElementById("chartCpu").parentElement;
    html.removeChild(html.querySelector("canvas"));
    html.innerHTML = `
      <canvas id="chartCpu"></canvas>
    `;
    labels6 = dataCpu[0].map(
      (item) => item.Horario.split("T")[1].split(".")[0]
    );
    config6.data.labels = labels6.reverse();
    config6.data.datasets[0].data = dataCpu[0]
      .map((item) => item.Percentagem)
      .reverse();
    new Chart(document.getElementById("chartCpu"), config6);
  });
}
async function loadChartsRAM(server) {
  let html = document.getElementById("chartRam").parentElement;
  html.removeChild(html.querySelector("canvas"));
  html.innerHTML = `
    <canvas id="chartRam"></canvas>
  `;
  let dataRam = await fazerRequisicaoLoadChart(server, "RAM");
  labels5 = dataRam[0].map((item) => item.Horario.split("T")[1].split(".")[0]);
  config5.data.labels = labels5.reverse();
  config5.data.datasets[0].data = dataRam[0]
    .map((item) => item.Percentagem)
    .reverse();
  new Chart(document.getElementById("chartRam"), config5);
}
async function loadChartsDISCO(server) {
  let html = document.getElementById("chartDisco").parentElement;
  html.removeChild(html.querySelector("canvas"));
  html.innerHTML = `
    <canvas id="chartDisco"></canvas>
  `;
  let dataDisco = await fazerRequisicaoLoadChart(server, "DISCO");
  labels7 = dataDisco[0].map(
    (item) => item.Horario.split("T")[1].split(".")[0]
  );
  config7.data.labels = labels7.reverse();
  config7.data.datasets[0].data = dataDisco[0]
    .map((item) => item.Percentagem * Math.random() * 8)
    .reverse();
  new Chart(document.getElementById("chartDisco"), config7);
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


async function loadTableProcessPerComponents(server) {
  mostrarLoading();
  dataRamProcess = await getPercentagePerComponent("RAM", server);
  dataCpuProcess = await getPercentagePerComponent("CPU", server);
  let tbody = document.querySelector("tbody#tbody-process");
  tbody.innerHTML = "";
  console.log({ dataRamProcess, dataCpuProcess });

  dataCpuProcess[0].forEach((item, index) => {
    arrayProcessosCPU.push(item.Percentagem)
    let RamProcesso = dataRamProcess[0].find((itemRam) => {
      return itemRam.Processo == item.Processo;
    });
    arrayProcessosRAM.push(RamProcesso.Percentagem)
    arrayProcessosNOME.push(item.Processo)

    tbody.innerHTML += `
        <tr class="${index % 2 == 0 ? "colorGray" : "colorBebe"}">
                <td>${item.Processo}</td>
                <td>${(item.Percentagem + "").replace(".", ",")}%</td> 
                <td>${(RamProcesso.Percentagem + "").replace(".", ",")}%</td>
                <td>
                  <button
                    class="button_kill"
                    onclick="alertarQ('', 'Deseja mesmo encerrar esse processo ?', 'warning', 'Sim', 'Não')"
                  >
                    Encerrar
                  </button>
                </td>
              </tr>
        `;
  });

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

async function getUsePerComponentForKpi(
  component,
  idServer,
  token = window.sessionStorage.getItem("Token"),
  dataInicio = "last",
  dataFim = "last"
) {
  let req = await fetch("/dashboard/getPercentageUsePerCompenent", {
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
    return res;
  }
  throw new Error(res.msg);
}

document.body.onload = getServers();

// filterTablePerName()
// filterTablePerName(false)
var crescente = true;

////////////////////////// FILTER ORDER NOME
function filterTablePerName() {
  let tbody = document.querySelector("tbody#tbody-process");
  tbody.innerHTML = "";
  let dataFiltered = crescente ?
   arrayProcessosNOME.sort() :
    arrayProcessosNOME.sort().reverse();

    /**
     * @type {HTMLSpanElement}
     */
    let triangle = document.querySelector('#title_nome')
    triangle.innerHTML = crescente ? "▲" : "▼";

 crescente = !crescente; 

  dataFiltered
 .forEach((item, index)=>{
  let cpu = dataCpuProcess[0].find(itemCpu => itemCpu.Processo == item);
  let ram = dataRamProcess[0].find(itemRam => itemRam.Processo == item);

  tbody.innerHTML += `
        <tr class="${index % 2 == 0 ? "colorGray" : "colorBebe"}">
                <td>${item}</td>
                <td>${(cpu.Percentagem + "").replace(".", ",")}%</td> 
                <td>${(ram.Percentagem + "").replace(".", ",")}%</td>
                <td>
                  <button
                    class="button_kill"
                    onclick="alertarQ('', 'Deseja mesmo encerrar esse processo ?', 'warning', 'Sim', 'Não')"
                  >
                    Encerrar
                  </button>
                </td>
              </tr>
        `;
 })
}

////////////////////////// FILTER ORDER CPU
function filterTablePerCpu() {
  let tbody = document.querySelector("tbody#tbody-process");
  tbody.innerHTML = "";
  let dataFiltered = crescente ?
  arrayProcessosCPU.sort((a,b) => a - b) :
  arrayProcessosCPU.sort((a,b) => b - a);

    /**
     * @type {HTMLSpanElement}
     */
    let triangle = document.querySelector('#title_cpu')
    triangle.innerHTML = crescente ? "▲" : "▼";

 crescente = !crescente; 

  dataFiltered
 .forEach((item, index)=>{
  let cpu = dataCpuProcess[0].find(itemCpu => itemCpu.Percentagem == item);
  let ram = dataRamProcess[0].find(itemRam => itemRam.Processo == cpu.Processo);

  tbody.innerHTML += `
        <tr class="${index % 2 == 0 ? "colorGray" : "colorBebe"}">
                <td>${cpu.Processo}</td>
                <td>${(cpu.Percentagem + "").replace(".", ",")}%</td> 
                <td>${(ram.Percentagem + "").replace(".", ",")}%</td>
                <td>
                  <button
                    class="button_kill"
                    onclick="alertarQ('', 'Deseja mesmo encerrar esse processo ?', 'warning', 'Sim', 'Não')"
                  >
                    Encerrar
                  </button>
                </td>
              </tr>
        `;
 })
}

////////////////////////// FILTER ORDER MEMORIA
function filterTablePerMemoria() {
  let tbody = document.querySelector("tbody#tbody-process");
  tbody.innerHTML = "";
  let dataFiltered = crescente ?
    arrayProcessosRAM.sort((a,b) => a - b) :
    arrayProcessosRAM.sort((a,b) => b - a);
    console.log(dataFiltered)
    /**
     * @type {HTMLSpanElement}
     */
    let triangle = document.querySelector('#title_memoria')
    triangle.innerHTML = crescente ? "▲" : "▼";

 crescente = !crescente; 

  dataFiltered
 .forEach((item, index)=>{
  let cpu = dataCpuProcess[0].find(itemCpu => itemCpu.Percentagem == item);
  let ram = dataRamProcess[0].find(itemRam => itemRam.Percentagem == item);

  tbody.innerHTML += `
        <tr class="${index % 2 == 0 ? "colorGray" : "colorBebe"}">
                <td>${item}</td>
                <td>${(cpu.Percentagem + "").replace(".", ",")}%</td> 
                <td>${(ram.Percentagem + "").replace(".", ",")}%</td>
                <td>
                  <button
                    class="button_kill"
                    onclick="alertarQ('', 'Deseja mesmo encerrar esse processo ?', 'warning', 'Sim', 'Não')"
                  >
                    Encerrar
                  </button>
                </td>
              </tr>
        `;
 })
}