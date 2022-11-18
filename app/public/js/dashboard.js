/* Botão de seleção de servidor */
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
nomeClinica.innerHTML = dadosjwt.fantasyName;
  }

  myTimeout = setTimeout(esconderLoading, 1500);

  function esconderLoading() {
    div_loading.style.display = "none";
  }