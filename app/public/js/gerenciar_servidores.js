
window.onload = validacaoLogin();

function esconderLoading() {
    div_loading.style.display = "none";
}


function logout() {
  sessionStorage.clear();
  window.open("/index.html", "_self");
}

const loadServers = async () => {
    const token = sessionStorage.getItem("Token");
    const user = parseJwt(token);
    console.log(user)
    const res = await getServers(user.data.fkHospital, token);
    esconderLoading()
    if(res.status == 200){
        let servidores = res.data;

        const tableBody = document.querySelector("table#table-servers tbody");
        var count = document.querySelector("h3#count");
        const dateAtt = document.querySelector("h4#dateAtt");
        let statusServer = "";

        tableBody.innerHTML = "";
        if(servidores.length > 0){
          msg_nenhumServidor_na_Conta.innerHTML = ''
        } else {
          msg_nenhumServidor_na_Conta.innerHTML = 'Você não possui servidores cadastrados na conta'
        }
        servidores.forEach((item, index) => {
          console.log(item)
            var date_unformated = item.updatedAt.split('T')[0];
            
            var date_unformated_indexed = date_unformated.split('-')
            var date_join = date_unformated_indexed.reverse().join('/');
            

            if (item.isActive == "A"){
              statusServer = "<button class='button-ativo'><span>Ativo</span></button>"
            } else {
              statusServer = "<button class='button-parado'><span>Parado</span></button>"
            }
            count.innerHTML = `${res.data.length}`

            dateAtt.innerHTML = `${date_join}`

            tableBody.innerHTML += 
            `
            <tr class="${index % 2 == 0 ? "colorBebe": "colorGray"}">
                <td class="td_status">${statusServer}</td>
                <td>${item._serialServer}</td>
                <td class="associar_text" onclick="associar('${item._serialServer}')">Associar</td>
                <td class="desassociar_text" onclick="desassociar('${item._serialServer}')">Desassociar</td>
                <td class="stop_text" onclick="pararServidor('${item._serialServer}')">Stop</td>
            </tr>     
            `

        });
    }
}
function associar(serialServer){
  alertarQ('', 'Deseja mesmo associar esse servidor no sistema Data Sentry ?', 'warning', 'Sim', 'Não')
  .then(res=>{
    console.log(res)
    if(res.isConfirmed){
      let isActive = 'A';
      changeIsActiveServer(serialServer, isActive, 'Seu servidor foi associado com sucesso!');
    }
  })
}
function desassociar(serialServer){
  alertarQ('', 'Deseja mesmo desassociar esse servidor do sistema Data Sentry ?', 'warning', 'Sim', 'Não')
  .then(res=>{
    console.log(res)
    if(res.isConfirmed){
      let isActive = 'D';
      changeIsActiveServer(serialServer, isActive, 'Seu servidor foi desassociado com sucesso!');
    }
  })
}
function pararServidor(serialServer){
  alertarQ('', 'Deseja mesmo parar esse servidor ?', 'warning', 'Sim', 'Não')
  .then(res=>{
    console.log(res)
    if(res.isConfirmed){
      let isActive = 'S';
      changeIsActiveServer(serialServer, isActive, 'Seu servidor foi parado com sucesso!');
    }
  })
}
function deletarServer(element){
  console.log("Deletar user id = "+ element.id.split('-')[1]);
}

async function getServers(fkHospital, token) {
  let req = await fetch(`/hospital/getServers/${fkHospital}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let res = await req.json();
  return res;
}

async function changeIsActiveServer(id, statusServer, msgSuccess){
  let idServer = id;
  let isActive = statusServer;

  let req = fetch("/dashboard/changeIsActiveServer", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", //necessario utilizar essas linha e a de baixo, sempre que tiver o "authJwt" na rota.
      Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
    },
    body: JSON.stringify({
      idServer: idServer,
      isActive: isActive
    }),
  });
  let res = req.then((val) => val.json());
  res.then((json) => {
    console.log(json);
    if (json.status == 200) {
      alertar("Sucesso!!", `${msgSuccess}`, 'success', 'OK').then(res=>{
        console.log(res)
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
    }
  });
  return res;
}

document.body.onload = loadServers