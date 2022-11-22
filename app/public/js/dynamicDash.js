async function getServers() {
    let token = window.sessionStorage.getItem('Token');
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
function moldarDash (serversData){
    if(serversData.length > 0){
        loadDashByServer(serversData[0]._serialServer);
        let dropdown = document.querySelector('#myDropdown');
        dropdown.innerHTML = '';
        serversData.forEach((server,index)=>{
            console.log(server);    
dropdown.innerHTML += `<a onclick="loadDashByServer('${server._serialServer}')" >#${server._serialServer} - ${index+1}</a>`
        })
    }else{
        alertar('Ops', "Voce nao tem servidores", "warning", "Ok")
    }
}

/**
 * 
 * @param {String} server 
 */
function loadDashByServer(server){
    console.log("carregar dash dinamic");

    loadTableProcessPerComponents(server);
}   

async function loadTableProcessPerComponents(server){
    let ram = await getPercentagePerComponent('RAM', server);
    let cpu = await getPercentagePerComponent('CPU', server);
    let tbody = document.querySelector('tbody#tbody-process')

    tbody.innerHTML = '';

    cpu[0].forEach((item, index)=>{
        let RamProcesso = ram[0].find(itemRam=>{
            return itemRam.Processo == item.Processo
        });

        tbody.innerHTML += `
        <tr class="${index%2==0 ? "colorGray" : "colorBebe"}">
                <td>${item.Processo}</td>
                <td>${(item.Percentagem+"").replace('.',',')}%</td> 
                <td>${(RamProcesso.Percentagem+"").replace('.',',')}%</td>
                <td>
                  <button
                    class="button_kill"
                    onclick="alertarQ('', 'Deseja mesmo encerrar esse processo ?', 'warning', 'Sim', 'Não')"
                  >
                    Encerrar
                  </button>
                </td>
              </tr>
        `
    })

}


async function getPercentagePerComponent(
    component,
    idServer,
    token = window.sessionStorage.getItem('Token'),
    dataInicio = 'last',
    dataFim  ='last',
  ){
    let req = await fetch('/dashboard/getPercentagePerComponent', {
      method: 'POST', 
      body: JSON.stringify({
        "component" : component,
        "idServer" : idServer,
        "dataInicio" : dataInicio,
        "dataFim" : dataFim
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    
    let res = await req.json();
    if(res.status == 200){
      return res.data;
    }
    throw new Error(res.msg);
  }

  

  async function getUsePerComponentForKpi(
    component,
    idServer,
    token = window.sessionStorage.getItem('Token'),
    dataInicio = 'last',
    dataFim  ='last',
  ){
    let req = await fetch('/dashboard/getPercentageUsePerCompenent', {
      method: 'POST', 
      body: JSON.stringify({
        "component" : component,
        "idServer" : idServer,
        "dataInicio" : dataInicio,
        "dataFim" : dataFim
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    
    let res = await req.json();
    if(res.status == 200){
      return res;
    }
    throw new Error(res.msg);
  }


document.body.onload = getServers();


