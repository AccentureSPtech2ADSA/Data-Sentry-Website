window.onload = validacaoLogin();

function enabledisable() {
  id_input1.disabled = !id_input1.disabled; //RazaoSocial
  id_input2.disabled = !id_input2.disabled;
  id_input6.disabled = !id_input6.disabled; //Numero de endereço
  input_complemento.disabled = !input_complemento.disabled; //Complemento
  input_unidade.disabled = !input_unidade.disabled; //Unidade
  id_input3.disabled = !id_input3.disabled;
  id_input4.disabled = !id_input4.disabled
  id_input5.disabled = !id_input5.disabled
  id_input6.disabled = !id_input6.disabled
  id_input7.disabled = !id_input7.disabled;
  id_input8.disabled = !id_input8.disabled
  id_input10.disabled = !id_input10.disabled;
  id_input11.disabled = !id_input11.disabled;
  id_input12.disabled = !id_input12.disabled;
  id_input13.disabled = !id_input13.disabled
}

function onoff() {
  currentvalue = document.getElementById("onoff").value;

  const data = window.sessionStorage.getItem("Token");
  const dados = parseJwt(data).data;

  if (currentvalue == "Salvar") {
    //Perfil salvo
    document.getElementById("onoff").value = "Editar";

    document.getElementById("id_input1").style.border = "none";
    document.getElementById("id_input6").style.border = "none";
    document.getElementById("id_input14").style.border = "none";
    document.getElementById("id_input15").style.border = "none";
    document.getElementById("id_input2").style.border = "none";
    document.getElementById("id_input3").style.border = "none";
    document.getElementById("id_input4").style.border = "none";
    document.getElementById("id_input5").style.border = "none";
    // document.getElementById("id_input6").style.border = "none"
    document.getElementById("id_input7").style.border = "none";
    document.getElementById("id_input8").style.border = "none";
    document.getElementById("id_input10").style.border = "none";
    document.getElementById("id_input11").style.border = "none";
    document.getElementById("id_input12").style.border = "none";
    // document.getElementById("id_input13").style.border = "none"

    document.getElementById("id_input1").style.margin = "0";
    document.getElementById("id_input3").style.margin = "0";
    document.getElementById("id_input4").style.margin = "0";
    document.getElementById("id_input5").style.margin = "0";
    // document.getElementById("id_input6").style.margin = "0"
    document.getElementById("id_input7").style.margin = "0";
    document.getElementById("id_input8").style.margin = "0";
    document.getElementById("id_input10").style.margin = "0";
    document.getElementById("id_input11").style.margin = "0";
    document.getElementById("id_input12").style.margin = "0";
    // document.getElementById("id_input13").style.margin = "0"

    document.getElementById("id_input2").style.cursor = "default";
    document.getElementById("id_input3").style.cursor = "default";
    document.getElementById("id_input4").style.cursor = "default";
    document.getElementById("id_input5").style.cursor = "default";
    // document.getElementById("id_input6").style.cursor = "default"
    document.getElementById("id_input7").style.cursor = "default";
    document.getElementById("id_input8").style.cursor = "default";
    document.getElementById("id_input10").style.cursor = "default";
    document.getElementById("id_input11").style.cursor = "default";
    document.getElementById("id_input12").style.cursor = "default";
    // document.getElementById("id_input13").style.cursor = "default"

    document.getElementById("id_input2").style.boxShadow = "none";
    document.getElementById("id_input3").style.boxShadow = "none";
    document.getElementById("id_input4").style.boxShadow = "none";
    document.getElementById("id_input5").style.boxShadow = "none";
    // document.getElementById("id_input6").style.boxShadow = "none";
    document.getElementById("id_input7").style.boxShadow = "none";
    document.getElementById("id_input8").style.boxShadow = "none";
    document.getElementById("id_input10").style.boxShadow = "none";
    document.getElementById("id_input11").style.boxShadow = "none";
    document.getElementById("id_input12").style.boxShadow = "none";
    // document.getElementById("id_input13").style.boxShadow = "none";

    document.getElementById("id_input2").style.color = "#525252";
    document.getElementById("id_input3").style.color = "#525252";
    document.getElementById("id_input4").style.color = "#525252";
    document.getElementById("id_input5").style.color = "#525252";
    // document.getElementById("id_input6").style.color = "#525252";
    document.getElementById("id_input7").style.color = "#525252";
    document.getElementById("id_input8").style.color = "#525252";
    document.getElementById("id_input10").style.color = "#525252";
    document.getElementById("id_input11").style.color = "#525252";
    document.getElementById("id_input12").style.color = "#525252";
    // document.getElementById("id_input13").style.color = "#525252";

    document.getElementById("onoff").style.backgroundColor = "#15CDD3";
    document.getElementById("onoff").style.color = "white";

    if (dados.patent == "analist") {
      updateAnalist();
    } else if (dados.patent == "admin") {
      updateAdmin();
    }
  } else {
    // perfil no modo edição
    document.getElementById("onoff").value = "Salvar";
    document.getElementById("id_input1").style.border = "1px solid grey";
    document.getElementById("id_input6").style.border =
      "1px solid grey";
    document.getElementById("id_input14").style.border =
      "1px solid grey";
    document.getElementById("id_input15").style.border = "1px solid grey";
    document.getElementById("id_input2").style.border = "1px solid grey";
    document.getElementById("id_input3").style.border = "1px solid grey";
    // document.getElementById("id_input4").style.border = "1px solid grey"
    // document.getElementById("id_input5").style.border = "1px solid grey"
    // document.getElementById("id_input6").style.border = "1px solid grey"
    document.getElementById("id_input7").style.border = "1px solid grey";
    // document.getElementById("id_input8").style.border = "1px solid grey"
    document.getElementById("id_input10").style.border = "1px solid grey";
    document.getElementById("id_input11").style.border = "1px solid grey";
    document.getElementById("id_input12").style.border = "1px solid grey";
    // document.getElementById("id_input13").style.border = "1px solid grey"

    document.getElementById("id_input1").style.margin = "-1px 0 -1px 0";
    document.getElementById("id_input6").style.margin = "-1px 0 -1px 0";
    document.getElementById("id_input14").style.margin = "-1px 0 -1px 0";
    document.getElementById("id_input15").style.margin = "-1px 0 -1px 0";
    document.getElementById("id_input1").style.margin = "-1px 0 -1px 0";
    document.getElementById("id_input3").style.margin = "-1px 0 -1px 0";
    // document.getElementById("id_input4").style.margin = "-1px 0 -1px 0"
    // document.getElementById("id_input5").style.margin = "-1px 0 -1px 0"
    // document.getElementById("id_input6").style.margin = "-1px 0 -1px 0"
    document.getElementById("id_input7").style.margin = "-1px 0 -1px 0";
    // document.getElementById("id_input8").style.margin = "-1px 0 -1px 0"
    document.getElementById("id_input10").style.margin = "-1px 0 -1px 0";
    document.getElementById("id_input11").style.margin = "-1px 0 -1px 0";
    document.getElementById("id_input12").style.margin = "-1px 0 -1px 0";
    // document.getElementById("id_input13").style.margin = "-1px 0 -1px 0"

    document.getElementById("id_input1").style.cursor = "auto";
    document.getElementById("id_input6").style.cursor = "auto";
    document.getElementById("id_input14").style.cursor = "auto";
    document.getElementById("id_input15").style.cursor = "auto";
    document.getElementById("id_input2").style.cursor = "auto";
    document.getElementById("id_input3").style.cursor = "auto";
    // document.getElementById("id_input4").style.cursor = "auto"
    // document.getElementById("id_input5").style.cursor = "auto"
    // document.getElementById("id_input6").style.cursor = "auto"
    document.getElementById("id_input7").style.cursor = "auto";
    // document.getElementById("id_input8").style.cursor = "auto"
    document.getElementById("id_input10").style.cursor = "auto";
    document.getElementById("id_input11").style.cursor = "auto";
    document.getElementById("id_input12").style.cursor = "auto";
    // document.getElementById("id_input13").style.cursor = "auto"

    document.getElementById("id_input1").style.boxShadow =
      "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input6").style.boxShadow =
      "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input14").style.boxShadow =
      "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input15").style.boxShadow =
      "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input2").style.boxShadow =
      "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input3").style.boxShadow =
      "8px 8px 18px rgb(221, 221, 221)";
    // document.getElementById("id_input4").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    // document.getElementById("id_input5").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    // document.getElementById("id_input6").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input7").style.boxShadow =
      "8px 8px 18px rgb(221, 221, 221)";
    // document.getElementById("id_input8").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input10").style.boxShadow =
      "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input11").style.boxShadow =
      "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input12").style.boxShadow =
      "8px 8px 18px rgb(221, 221, 221)";
    // document.getElementById("id_input13").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";

    document.getElementById("id_input1").style.color = "black";
    document.getElementById("id_input6").style.color = "black";
    document.getElementById("id_input14").style.color = "black";
    document.getElementById("id_input15").style.color = "black";
    document.getElementById("id_input2").style.color = "black";
    document.getElementById("id_input3").style.color = "black";
    // document.getElementById("id_input4").style.color = "black";
    // document.getElementById("id_input5").style.color = "black";
    // document.getElementById("id_input6").style.color = "black";
    document.getElementById("id_input7").style.color = "black";
    // document.getElementById("id_input8").style.color = "black";
    document.getElementById("id_input10").style.color = "black";
    document.getElementById("id_input11").style.color = "black";
    document.getElementById("id_input12").style.color = "black";
    // document.getElementById("id_input13").style.color = "black";

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
    nome_analista.style.display = "none";
    // num_contato.style.display = "none"
  } else if (dadosjwt.patent == "analist") {
    // ipt_titulo.style.display = 'none'
    
    id_input15.style.display = 'none'
    nome_analista.style.display = "block";
    texto_patente.innerHTML = "Perfil de Analista";
    titulo_nome_fantasia.style.display = "none";
    id_input2.style.display = "none";
    titulo_razao_social.style.display = "none";
    id_input1.style.display = "none";
    titulo_endereco.style.display = "none";
    id_input4.style.display = "none";
    id_blocoEnd1.style.display = "none";
    id_blocoEnd2.style.display = "none";
    id_input14.style.display = 'none'
    id_blocoEnd3.style.display = "none";
  }
}

function deleteUser() {
  const data = window.sessionStorage.getItem("Token");
  const dados = parseJwt(data).data;
  let id = dados.id;
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
  let viaCepDados = fetch(`https://viacep.com.br/ws/${dadosjwt.cep}/json/`);
  viaCepDados
    .then((val) => val.json())
    .then((json) => {
      document.getElementById("id_input4").value = json.logradouro;
      document.getElementById("id_input8").value = json.bairro;
      document.getElementById("id_input5").value = json.localidade;
    });
  document.getElementById("id_input1").value = dadosjwt.corporateName;
  document.getElementById("id_input2").value = dadosjwt.fantasyName;
  document.getElementById("id_input3").value = dadosjwt.email;
  document.getElementById("id_input7").value = dadosjwt.cep;
  document.getElementById("id_input14").value = dadosjwt.complement;
  document.getElementById("id_input15").value = dadosjwt.unit;
  document.getElementById("id_input6").value = dadosjwt.numberAddress;
  document.getElementById("id_input9").value = "***************";
  document.getElementById("id_input10").value = dadosjwt.contactPhone;
  document.getElementById("id_input11").value = dadosjwt.cnpj;
  document.getElementById("id_input12").value = dadosjwt.name;
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

function updateAnalist(name, email, telefone) {
  name = document.getElementById("id_input12").value;
  email = document.getElementById("id_input3").value;
  telefone = document.getElementById("id_input10").value;
  const data = window.sessionStorage.getItem("Token");
  const dados = parseJwt(data).data;
  let id = dados.id;

  console.log(data);
  let req = fetch("/user/updateAnalist", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", //necessario utilizar essas linha e a de baixo, sempre que tiver o "authJwt" na rota.
      Authorization: `Bearer ${data}`,
    },
    body: JSON.stringify({
      name: name,
      email: email,
      telefone: telefone,
      id: id,
    }),
  });
  let res = req.then((val) => val.json());
  res.then((json) => {
    console.log(json);
    if (json.status == 200) {
      sessionStorage.removeItem("Token");
      sessionStorage.setItem("Token", json.token);
      window.location.reload();
    }
  });
  return res;
}

function updateAdmin() {
  fantasyName = document.getElementById("id_input2").value;
  cep = document
    .getElementById("id_input7")
    .value.replaceAll("-", "")
    .replaceAll(" ", "");
  numberAddress = document.getElementById("id_input6").value;
  complement = document.getElementById("id_input14").value;
  unit = document.getElementById("id_input15").value;
  cnpj = document.getElementById("id_input11").value.replaceAll("/", "")
  .replaceAll(" ", "").replaceAll('.','').replaceAll('-','');
  email = document.getElementById("id_input3").value;
  telefone = document.getElementById("id_input10").value.replaceAll("\(", "")
  .replaceAll(" ", "").replaceAll("\)", "").replaceAll("-", "");;
  const data = window.sessionStorage.getItem("Token");
  const dados = parseJwt(data).data;
  let id = dados.id;
  let fkHospital = dados.fkHospital;

  let req = fetch("/user/updateAdmin", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", //necessario utilizar essas linha e a de baixo, sempre que tiver o "authJwt" na rota.
      Authorization: `Bearer ${data}`,
    },
    body: JSON.stringify({
      fantasyName: fantasyName,
      cep: cep,
      numberAddress: numberAddress,
      complement: complement,
      unit: unit,
      cnpj: cnpj,
      email: email,
      telefone: telefone,
      id: id,
      fkHospital: fkHospital,
    }),
  });
  let res = req.then((val) => val.json());
  res.then((json) => {
    console.log(json);
    if (json.status == 200) {
      sessionStorage.removeItem("Token");
      sessionStorage.setItem("Token", json.token);
      window.location.reload();
    }
  });
  return res;
}
