/* Botão de seleção de servidor */
window.onload = validacaoLogin();
const token = window.sessionStorage.getItem('Token');
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function logout() {
  sessionStorage.clear();
  window.open("/index.html", "_self");
}

window.onclick = function (event) {
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

myTimeout = setTimeout(esconderLoading, 1500);

function searchProcess() {
  var input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("inputSearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("tableProcess");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else if (filter == "") {
        tr[i].style.display = "block";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function DescriptografiaJWT() {
  const data = window.sessionStorage.getItem('Token');
  dadosjwt = parseJwt(data).data;
}

function preenchimentoNome() {
  nomeClinica.innerHTML = "Olá " + dadosjwt.name;
}

function esconderLoading() {
  div_loading.style.display = "none";
}
