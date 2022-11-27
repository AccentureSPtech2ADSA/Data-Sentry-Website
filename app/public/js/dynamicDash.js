// var tabela_isOriginal = true;
// var originalHTML = "";

let arrayProcessosCPU = [];
let arrayProcessosRAM = [];
let arrayProcessosNOME = [];

let serverSerial = 0;

let dataCpuProcess = [];
let dataRamProcess = [];

let arrayProccessPerRow = [];

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
  loadKpiDisco(server);
  loadKpiRam(server);
  loadKpiCpu(server);
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
  dataRamProcess = await getPercentagePerComponent("RAM", server);
  dataCpuProcess = await getPercentagePerComponent("CPU", server);
  let tbody = document.querySelector("tbody#tbody-process");
  tbody.innerHTML = "";
  console.log({ dataRamProcess, dataCpuProcess });

  dataCpuProcess[0].forEach((item, index) => {
    arrayProcessosCPU.push(item.Percentagem);
    let RamProcesso = dataRamProcess[0].find((itemRam) => {
      return itemRam.Processo == item.Processo;
    });
    arrayProcessosRAM.push(RamProcesso.Percentagem);
    arrayProcessosNOME.push(item.Processo);

    arrayProccessPerRow.push({
      nome: item.Processo,
      ram: RamProcesso.Percentagem,
      cpu: item.Percentagem,
    });
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
  let html = document.getElementById("myChart3").parentElement;
  html.removeChild(html.querySelector("canvas"));
  html.innerHTML = `
    <canvas id="myChart3"></canvas>
  `;

  let dataHtmlDiscoUsoAtual = document.getElementById("usoAtualDisco");
  let dataHtmlDiscoUsoMaximo = document.getElementById("usoMaxDisco");
  let dataHtmlDiscoPorcentagemUso = document.getElementById("usoTotalDisco");

  let dataDisco = await fazerRequisicaoLoadKpi(server, "DISCO");
  console.log(dataDisco[0][0]);
  config3.data.datasets[0].data = [
    +dataDisco[0][0].Uso.replace("GBs", ""),
    +dataDisco[0][0].MaximoUso.replace("GBs", "") -
      +dataDisco[0][0].Uso.replace("GBs", ""),
  ];
  new Chart(document.getElementById("myChart3"), config3);

  dataHtmlDiscoUsoAtual.innerHTML = `${dataDisco[0][0].Uso.replace("GBs", "")}`;
  dataHtmlDiscoUsoMaximo.innerHTML = `${dataDisco[0][0].MaximoUso}`;
  dataHtmlDiscoPorcentagemUso.innerHTML = `${dataDisco[0][0].Percentagem}%`;
}

async function loadKpiRam(server) {
  let html = document.getElementById("myChart2").parentElement;
  html.removeChild(html.querySelector("canvas"));
  html.innerHTML = `
    <canvas id="myChart2"></canvas>
  `;

  let dataHtmlRamUsoAtual = document.getElementById("usoAtualRam");
  let dataHtmlRamUsoMaximo = document.getElementById("usoMaxRam");
  let dataHtmlRamPorcentagemUso = document.getElementById("usoTotalRam");

  let dataRam = await fazerRequisicaoLoadKpi(server, "RAM");
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

async function loadKpiCpu(server) {
  let html = document.getElementById("myChart1").parentElement;
  html.removeChild(html.querySelector("canvas"));
  html.innerHTML = `
    <canvas id="myChart1"></canvas>
  `;

  let dataHtmlCpuUsoAtual = document.getElementById("usoAtualCpu");
  let dataHtmlCpuUsoMaximo = document.getElementById("usoMaxCpu");
  let dataHtmlCpuPorcentagemUso = document.getElementById("usoTotalCpu");

  let dataCpu = await fazerRequisicaoLoadKpi(server, "CPU");
  console.log(dataCpu[0][0]);
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
function filterTable(array, triangle) {
  let tbody = document.querySelector("tbody#tbody-process");
  tbody.innerHTML = "";

  array = crescente ? array : array.reverse();
  triangle.innerHTML = !crescente ? "▲" : "▼";

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
                    onclick="alertarQ('', 'Deseja mesmo encerrar esse processo ?', 'warning', 'Sim', 'Não')"
                  >
                    Encerrar
                  </button>
                </td>
                </tr>
               
          `;
  });
}

// var crescente = true;
// var asc = true;

// function filterTablePerName() {
//   if(tabela_isOriginal == false){
//     console.log('Não é original')
//     console.log(originalHTML)
//     var tableAtual = document.getElementById("tbody-process")
//     tableAtual.innerHTML = originalHTML
//   } else {
//     tabela_isOriginal = true
//   }

//   asc = !asc

//   let triangleNOME = document.querySelector('#title_nome')
//   triangleNOME.innerHTML = asc ? "▲" : "▼";
//   let triangleCPU = document.querySelector('#title_cpu')
//   triangleCPU.innerHTML = "-";
//   let triangleMEMORIA = document.querySelector('#title_memoria')
//   triangleMEMORIA.innerHTML = "-";

//   const index = 0;    // coluna pela qual se quer ordenar
//   const tabela = document.getElementById('tableProcess');

//   const arr = Array.from(tabela.querySelectorAll('tbody tr'));
//   const th_elem = tabela.querySelectorAll('th');

//   arr.sort((a, b) => {
//     const a_val = a.children[index].innerText
//     const b_val = b.children[index].innerText
//     return (asc) ? a_val.localeCompare(b_val) : b_val.localeCompare(a_val)
//   })
//   arr.forEach(elem => {
//     tabela.appendChild(elem)
//   });

//   tabela_isOriginal = false;
// }

// ////////////////////////// FILTER ORDER NOME
// function filterTablePerName() {
//   let tbody = document.querySelector("tbody#tbody-process");
//   tbody.innerHTML = "";
//   let dataFiltered = crescente ?
//    arrayProcessosNOME.sort() :
//     arrayProcessosNOME.sort().reverse();

//     /**
//      * @type {HTMLSpanElement}
//      */
//     let triangle = document.querySelector('#title_nome')
//     triangle.innerHTML = crescente ? "▲" : "▼";

//  crescente = !crescente;

//   dataFiltered
//  .forEach((item, index)=>{
//   let cpu = dataCpuProcess[0].find(itemCpu => itemCpu.Processo == item);
//   let ram = dataRamProcess[0].find(itemRam => itemRam.Processo == item);

//   tbody.innerHTML += `
//         <tr class="${index % 2 == 0 ? "colorGray" : "colorBebe"}">
//                 <td>${item}</td>
//                 <td>${(cpu.Percentagem + "").replace(".", ",")}%</td>
//                 <td>${(ram.Percentagem + "").replace(".", ",")}%</td>
//                 <td>
//                   <button
//                     class="button_kill"
//                     onclick="alertarQ('', 'Deseja mesmo encerrar esse processo ?', 'warning', 'Sim', 'Não')"
//                   >
//                     Encerrar
//                   </button>
//                 </td>
//               </tr>
//         `;
//  })
// }

// ////////////////////////// FILTER ORDER CPU
// function filterTablePerCpu() {
//   let tbody = document.querySelector("tbody#tbody-process");
//   tbody.innerHTML = "";
//   let dataFiltered = crescente ?
//   arrayProcessosCPU.sort((a,b) => a - b) :
//   arrayProcessosCPU.sort((a,b) => b - a);

//     /**
//      * @type {HTMLSpanElement}
//      */
//     let triangle = document.querySelector('#title_cpu')
//     triangle.innerHTML = crescente ? "▲" : "▼";

//  crescente = !crescente;

//   dataFiltered
//  .forEach((item, index)=>{
//   let cpu = dataCpuProcess[0].find(itemCpu => itemCpu.Percentagem == item);
//   let ram = dataRamProcess[0].find(itemRam => itemRam.Processo == cpu.Processo);

//   tbody.innerHTML += `
//         <tr class="${index % 2 == 0 ? "colorGray" : "colorBebe"}">
//                 <td>${cpu.Processo}</td>
//                 <td>${(cpu.Percentagem + "").replace(".", ",")}%</td>
//                 <td>${(ram.Percentagem + "").replace(".", ",")}%</td>
//                 <td>
//                   <button
//                     class="button_kill"
//                     onclick="alertarQ('', 'Deseja mesmo encerrar esse processo ?', 'warning', 'Sim', 'Não')"
//                   >
//                     Encerrar
//                   </button>
//                 </td>
//               </tr>
//         `;
//  })
// }

// ////////////////////////// FILTER ORDER MEMORIA
// function filterTablePerMemoria() {
//   let tbody = document.querySelector("tbody#tbody-process");
//   tbody.innerHTML = "";
//   let dataFiltered = crescente ?
//     arrayProcessosRAM.sort((a,b) => a - b) :
//     arrayProcessosRAM.sort((a,b) => b - a);
//     console.log(dataFiltered)
//     /**
//      * @type {HTMLSpanElement}
//      */
//     let triangle = document.querySelector('#title_memoria')
//     triangle.innerHTML = crescente ? "▲" : "▼";

//  crescente = !crescente;

//   dataFiltered
//  .forEach((item, index)=>{
//   let cpu = dataCpuProcess[0].find(itemCpu => itemCpu.Percentagem == item);
//   let ram = dataRamProcess[0].find(itemRam => itemRam.Percentagem == item);

//   tbody.innerHTML += `
//         <tr class="${index % 2 == 0 ? "colorGray" : "colorBebe"}">
//                 <td>${item}</td>
//                 <td>${(cpu.Percentagem + "").replace(".", ",")}%</td>
//                 <td>${(ram.Percentagem + "").replace(".", ",")}%</td>
//                 <td>
//                   <button
//                     class="button_kill"
//                     onclick="alertarQ('', 'Deseja mesmo encerrar esse processo ?', 'warning', 'Sim', 'Não')"
//                   >
//                     Encerrar
//                   </button>
//                 </td>
//               </tr>
//         `;
//  })
// }
