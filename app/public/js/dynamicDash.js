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
    loadDashByServer(serversData[0]._serialServer);
    let dropdown = document.querySelector("#myDropdown");
    dropdown.innerHTML = "";
    serversData.forEach((server, index) => {
      dropdown.innerHTML += `<a onclick="loadDashByServer('${
        server._serialServer
      }')" >#${server._serialServer} - ${index + 1}</a>`;
    });
  } else {
    alertar("Ops", "Voce nao tem servidores", "warning", "Ok");
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
  let ram = await getPercentagePerComponent("RAM", server);
  let cpu = await getPercentagePerComponent("CPU", server);
  let tbody = document.querySelector("tbody#tbody-process");
  console.log({ ram, cpu });
  tbody.innerHTML = "";

  cpu[0].forEach((item, index) => {
    let RamProcesso = ram[0].find((itemRam) => {
      return itemRam.Processo == item.Processo;
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
