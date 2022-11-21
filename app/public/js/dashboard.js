/* Botão de seleção de servidor */
const token = window.sessionStorage.getItem('Token');
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  function logout() {
    sessionStorage.clear();
    window.open("/index.html", "_self");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  function DescriptografiaJWT() {
    const data = window.sessionStorage.getItem('Token');
    dadosjwt = parseJwt(data).data;
  }

  function preenchimentoNome() {
nomeClinica.innerHTML = "Olá "+dadosjwt.fantasyName;
  }

  myTimeout = setTimeout(esconderLoading, 1500);

  function esconderLoading() {
    div_loading.style.display = "none";
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
      return res;
    }
    throw new Error(res.msg);
  }

