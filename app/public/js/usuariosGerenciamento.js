
function esconderLoading(){
  document.querySelector(`#div_loading`).style.display = "none";
}

const loadUsers = async () => {
    const token = sessionStorage.getItem("Token");
    const user = parseJwt(token);
    const res = await getListAnalists(user.data.fkHospital, token);

    console.log(res);
    const tableBody = document.querySelector("table#table-users tbody");
    tableBody.innerHTML = ``;
    
    if(res.status == 200 && res.data.length > 0){
        let analistas = res.data;
        tableBody.innerHTML = "";

        let p = tableBody.parentElement.querySelector("p");
        if(p){
          p.innerHTML = ''
        }


        analistas.forEach((item, index) => {
            tableBody.innerHTML += 
            `
            <tr class="${index % 2 == 0 ? "colorBebe": "colorGray"}">
                <td>${item.email}</td>
                <td>${item.name}</td>
                <td><span class="delete" onclick="deletarUser(this)" id='delete-${item.id}'>Deletar</span></td>
            </tr>     
            `
        });

    }else{
      if(!tableBody.parentElement.querySelector(`p`)){
        tableBody.parentElement.innerHTML += "<p id='err'>Este perfil não tem analistas</p>";
      }
    }

    esconderLoading();
}

function fazerRequisicaoRemoverUser(id){
  const data = window.sessionStorage.getItem('Token');
  let req = fetch("/user/deleteUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", //necessario utilizar essas linha e a de baixo, sempre que tiver o "authJwt" na rota.
      Authorization: `Bearer ${data}`,
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  let res = req.then(val=>val.json());
  res.then(json=>{
    console.log(json);
    if(json.status == 200){
      alertar("Feito", json.longMessage, "success", "Ok");
      window.location.reload()
    }else{
      alertar(
        "Ops...",
        "Houve algum erro ao deletar usuario",
        "error",
        "Ok"
      );
    }
  });
  return res;
}



function irparaCadastro() {
  painel.style.display = "none";
  painel_cadastro.style.display = "block";
  btn_gerenciar.style.backgroundColor = "#c4e4e4";
  btn_cadastrar.style.backgroundColor = "#FFFFFF";
  area_painel.style.height = "440px";
  btn_gerenciar.style.zIndex = "0"
  btn_cadastrar.style.zIndex = "1"
}

function logout() {
  sessionStorage.clear();
  window.open("/index.html", "_self");
}

function irparaGerenciar() {
  painel.style.display = "block";
  painel_cadastro.style.display = "none";
  btn_gerenciar.style.backgroundColor = "#FFFFFF";
  btn_cadastrar.style.backgroundColor = "#c4e4e4";
  area_painel.style.height = "auto";
  btn_gerenciar.style.zIndex = "1"
  btn_cadastrar.style.zIndex = "0"
  loadUsers();
}

function onoff() {
  var nome = document.getElementById("inp_nome").value;
  var email = document.getElementById("inp_email").value;
  var telefone = document.getElementById("inp_telefone").value;
  var senha = document.getElementById("inp_senha").value;
  var confirmSenha = document.getElementById("inp_confirmSenha").value;

  const regexSenha =
    /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g;
  const regexEmail =
    /^([a-zA-Z0-9-.]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([a-zA-Z0-9-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/gm;

  if (senha.match(regexSenha) && confirmSenha == senha) {
    const token = sessionStorage.getItem("Token");
    const user = parseJwt(token);
    console.log(user);

    fazerRequisicaoInserirUser(
      nome,
      email,
      telefone.replaceAll("\)","").replaceAll("\(", "").replaceAll(" ", "").replaceAll("-", ""),
      senha,
      user.data.id,
      user.data.fkHospital
    )
      .then((val) => console.log(val))
      .catch((err) => console.error(err));

    alertar("", "Analista inserido com sucesso !", "success", "Ok");
  } else if (
    nome == "" ||
    email == "" ||
    telefone == "" ||
    senha == "" ||
    confirmSenha == ""
  ) {
    alertar("Atenção", "Preencha todos os campos", "warning", "Ok");
  } else if (senha != confirmSenha) {
    alertar("Atenção", "Confirme a mesma senha", "warning", "Ok");
  } else {
    alertar(
      "Senha inválida",
      "A senha deve ter no mínimo 8 dígitos, contendo números, caracter especial, Letra minúscula e Letra maíuscula.",
      "error",
      "Ok"
    );
  }
}

async function fazerRequisicaoInserirUser(
  nome,
  email,
  telefone,
  senha,
  manager,
  hospital
) {
  let req = await fetch("/user/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nome,
      email: email,
      telefone : telefone,
      password: senha,
      manager: manager,
      hospital: hospital,
    }),
  });

  let res = await req.json();
  return res;
}

async function getListAnalists(fkHospital, token) {
  let req = await fetch(`/user/getListAnalists/${fkHospital}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let res = await req.json();
  return res;
}

function deletarUser(element){
  alertar("Atenção", "Deseja mesmo deletar este analista?", "warning", "Sim")
  .then(res=>{
    if(res.isConfirmed){
      console.log(`deletar`)
      const id = element.id.split('-')[1];
      fazerRequisicaoRemoverUser(id);
    }
  })

}

document.body.onload = loadUsers;

let json = sessionStorage.getItem("Token")
let data = parseJwt(json)

if (data.data.patent == "analist") {
  btn_cadastrar.style.display = "none"
  btn_gerenciar.style.display = "none"
  titulo_tabela.innerHTML = "Outros analistas em sua empresa"
  area_buttons.style.justifyContent = "center";
  area_buttons.style.padding = "0 30px 0 30px"
  area_painel.style.borderRadius = "15px"
}