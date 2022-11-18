
const loadUsers = async () => {
    const token = sessionStorage.getItem("Token");
    const user = parseJwt(token);
    const res = await getListAnalists(user.data.fkHospital, token);
  
    if(res.status == 200){
        let analistas = res.data;

        const tableBody = document.querySelector("table#table-users tbody");

        tableBody.innerHTML = "";

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

    }

}

function irparaCadastro() {
  painel.style.display = "none";
  painel_cadastro.style.display = "block";
  btn_gerenciar.style.backgroundColor = "#c4e4e4";
  btn_cadastrar.style.backgroundColor = "#FFFFFF";
  area_painel.style.width = "55%";
  area_painel.style.height = "440px";

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
  area_painel.style.width = "57%";
  area_painel.style.height = "auto";

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
      telefone,
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
      // telefone : telefone,
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
    console.log("Deletar user id = "+ element.id.split('-')[1]);
}

document.body.onload = loadUsers

function esconderLoading() {
  div_loading.style.display = "none";
}