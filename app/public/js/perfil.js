function enabledisable() {
  id_input2.disabled = !id_input2.disabled
  id_input3.disabled = !id_input3.disabled
  id_input4.disabled = !id_input4.disabled
  id_input5.disabled = !id_input5.disabled
  id_input6.disabled = !id_input6.disabled
  id_input7.disabled = !id_input7.disabled
  id_input8.disabled = !id_input8.disabled
  id_input10.disabled = !id_input10.disabled
  id_input11.disabled = !id_input11.disabled
}

function onoff() {
  currentvalue = document.getElementById("onoff").value;
  if (currentvalue == "Salvar") {
    //Perfil salvo
    document.getElementById("onoff").value = "Editar";

    document.getElementById("id_input2").style.border = "none"
    document.getElementById("id_input3").style.border = "none"
    document.getElementById("id_input4").style.border = "none"
    document.getElementById("id_input5").style.border = "none"
    document.getElementById("id_input6").style.border = "none"
    document.getElementById("id_input7").style.border = "none"
    document.getElementById("id_input8").style.border = "none"
    document.getElementById("id_input10").style.border = "none"
    document.getElementById("id_input11").style.border = "none"

    document.getElementById("id_input1").style.margin = "0"
    document.getElementById("id_input3").style.margin = "0"
    document.getElementById("id_input4").style.margin = "0"
    document.getElementById("id_input5").style.margin = "0"
    document.getElementById("id_input6").style.margin = "0"
    document.getElementById("id_input7").style.margin = "0"
    document.getElementById("id_input8").style.margin = "0"
    document.getElementById("id_input10").style.margin = "0"
    document.getElementById("id_input11").style.margin = "0"

    document.getElementById("id_input2").style.cursor = "default"
    document.getElementById("id_input3").style.cursor = "default"
    document.getElementById("id_input4").style.cursor = "default"
    document.getElementById("id_input5").style.cursor = "default"
    document.getElementById("id_input6").style.cursor = "default"
    document.getElementById("id_input7").style.cursor = "default"
    document.getElementById("id_input8").style.cursor = "default"
    document.getElementById("id_input10").style.cursor = "default"
    document.getElementById("id_input11").style.cursor = "default"

    document.getElementById("id_input2").style.boxShadow = "none";
    document.getElementById("id_input3").style.boxShadow = "none";
    document.getElementById("id_input4").style.boxShadow = "none";
    document.getElementById("id_input5").style.boxShadow = "none";
    document.getElementById("id_input6").style.boxShadow = "none";
    document.getElementById("id_input7").style.boxShadow = "none";
    document.getElementById("id_input8").style.boxShadow = "none";
    document.getElementById("id_input10").style.boxShadow = "none";
    document.getElementById("id_input11").style.boxShadow = "none";

    document.getElementById("id_input2").style.color = "#525252";
    document.getElementById("id_input3").style.color = "#525252";
    document.getElementById("id_input4").style.color = "#525252";
    document.getElementById("id_input5").style.color = "#525252";
    document.getElementById("id_input6").style.color = "#525252";
    document.getElementById("id_input7").style.color = "#525252";
    document.getElementById("id_input8").style.color = "#525252";
    document.getElementById("id_input10").style.color = "#525252";
    document.getElementById("id_input11").style.color = "#525252";

    document.getElementById("onoff").style.backgroundColor = "#15CDD3";
    document.getElementById("onoff").style.color = "white";
  } else {
    // perfil no modo edição
    document.getElementById("onoff").value = "Salvar";
    document.getElementById("id_input2").style.border = "1px solid grey"
    document.getElementById("id_input3").style.border = "1px solid grey"
    document.getElementById("id_input4").style.border = "1px solid grey"
    document.getElementById("id_input5").style.border = "1px solid grey"
    document.getElementById("id_input6").style.border = "1px solid grey"
    document.getElementById("id_input7").style.border = "1px solid grey"
    document.getElementById("id_input8").style.border = "1px solid grey"
    document.getElementById("id_input10").style.border = "1px solid grey"
    document.getElementById("id_input11").style.border = "1px solid grey"

    document.getElementById("id_input1").style.margin = "-1px 0 -1px 0"
    document.getElementById("id_input3").style.margin = "-1px 0 -1px 0"
    document.getElementById("id_input4").style.margin = "-1px 0 -1px 0"
    document.getElementById("id_input5").style.margin = "-1px 0 -1px 0"
    document.getElementById("id_input6").style.margin = "-1px 0 -1px 0"
    document.getElementById("id_input7").style.margin = "-1px 0 -1px 0"
    document.getElementById("id_input8").style.margin = "-1px 0 -1px 0"
    document.getElementById("id_input10").style.margin = "-1px 0 -1px 0"
    document.getElementById("id_input11").style.margin = "-1px 0 -1px 0"

    document.getElementById("id_input2").style.cursor = "auto"
    document.getElementById("id_input3").style.cursor = "auto"
    document.getElementById("id_input4").style.cursor = "auto"
    document.getElementById("id_input5").style.cursor = "auto"
    document.getElementById("id_input6").style.cursor = "auto"
    document.getElementById("id_input7").style.cursor = "auto"
    document.getElementById("id_input8").style.cursor = "auto"
    document.getElementById("id_input10").style.cursor = "auto"
    document.getElementById("id_input11").style.cursor = "auto"

    document.getElementById("id_input2").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input3").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input4").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input5").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input6").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input7").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input8").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input10").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input11").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";

    document.getElementById("id_input2").style.color = "black";
    document.getElementById("id_input3").style.color = "black";
    document.getElementById("id_input4").style.color = "black";
    document.getElementById("id_input5").style.color = "black";
    document.getElementById("id_input6").style.color = "black";
    document.getElementById("id_input7").style.color = "black";
    document.getElementById("id_input8").style.color = "black";
    document.getElementById("id_input10").style.color = "black";
    document.getElementById("id_input11").style.color = "black";

    document.getElementById("onoff").style.color = "white";
    document.getElementById("onoff").style.backgroundColor = "#1A6969";
  }
}

function logout() {
  sessionStorage.clear();
  window.open("/index.html", "_self");
}

let dadosjwt;
function DescriptografiaJWT() {
  const data = window.sessionStorage.getItem("Token");
  dadosjwt = parseJwt(data).data;
}

function validarPatente() {
  if (dadosjwt.patent == "admin") {
    texto_patente.innerHTML = "Perfil de Administrador";
  } else {
    texto_patente.innerHTML = "Perfil de Analista";
  }
}

function deleteUser() {
  const data = window.sessionStorage.getItem("Token");
  const dados = parseJwt(data).data;
  var id = dados.id;
  let fk = dados.fkHospital;

  console.log(data);
  let req = fetch("/user/deleteUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", //necessario utilizar essas linha e a de baixo, sempre que tiver o "authJwt" na rota.
      Authorization: `Bearer ${data}`,
    },
    body: JSON.stringify({
      id: id,
      fk: fk,
    }),
  });
  let res = req.then((val) => val.json());
  res.then((json) => {
    console.log(json);
    if (json.status == 200) {
      div_delete.style.display = "none";
      div_confirmar_delete.style.display = "block";
      // Abre pop up de confirmação de delete usario.
      setTimeout(function () {
        (window.location = "./index.html"), "_self";
      }, 2000);
    }
  });
  return res;
}

function valoresInputs() {
document.getElementById("id_input1").value = dadosjwt.corporateName;
document.getElementById("id_input2").value = dadosjwt.fantasyName;
document.getElementById("id_input3").value = dadosjwt.email;
document.getElementById("id_input4").value = "Rua Haddock Lobo, 155"; // rua via cep
document.getElementById("id_input5").value = "São Paulo"; // cidade via cep
document.getElementById("id_input6").value = "São Paulo"; // estado via cep
document.getElementById("id_input7").value = dadosjwt.cep;
document.getElementById("id_input8").value = "Brasil"; // pais via cep
document.getElementById("id_input9").value = "***************";
document.getElementById("id_input10").value = dadosjwt.contactPhone;
document.getElementById("id_input11").value = dadosjwt.cnpj;
}

function esconderLoading() {
  div_loading.style.display = "none";
}

// Abre pop up de deletar usuario
function popup_login() {
  div_delete.style.display = "block";
}
// Fecha pop up de deletar usuario
function fechar_popup_login() {
  div_delete.style.display = "none";
  input_email_login.style.border = "thin solid #646569";
  input_senha_login.style.border = "thin solid #646569";
  input_email_login.innerHTML = "";
  input_senha_login.innerHTML = "";
  span_validacao.innerHTML = "";
}

//Abre pop up de confirmação de deletar usuario
//function popup_confirmar_exclusao() {
//  div_confirmar_delete.style.display = "block";
//}

function trocarSenha() {
  window.open("/esqueceu_senha.html", "_self");
}
