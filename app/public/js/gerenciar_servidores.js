
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
              <td class="desassociar_text" onclick="alertarQ('', 'Deseja mesmo desassociar esse servidor do sistema Data Sentry ?', 'warning', 'Sim', 'Não')">Desassociar</td>
              <td class="stop_text" onclick="alertarQ('', 'Deseja mesmo parar esse servidor ?', 'warning', 'Sim', 'Não')">Stop</td>
          </tr>     
          `

      });

  }

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

document.body.onload = loadServers