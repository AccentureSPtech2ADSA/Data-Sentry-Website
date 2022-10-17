function valoresPlaceholder() {
    document.getElementById("id_input2").value = "teste";
  document.getElementById("id_input3").value = "clinicase@outlook.com";
  document.getElementById("id_input4").value = "Rua Haddock Lobo, 155";
  document.getElementById("id_input5").value = "São Paulo";
  document.getElementById("id_input6").value = "São Paulo";
  document.getElementById("id_input7").value = "00000001";
  document.getElementById("id_input8").value = "Brasil";
  document.getElementById("id_input9").value = "***************";
  document.getElementById("id_input10").value = "11 912345678";
  document.getElementById("id_input11").value = "00.000.000/0000-00";
}

function enabledisable() {
  id_input2.disabled = !id_input2.disabled
  id_input3.disabled = !id_input3.disabled
  id_input4.disabled = !id_input4.disabled
  id_input5.disabled = !id_input5.disabled
  id_input6.disabled = !id_input6.disabled
  id_input7.disabled = !id_input7.disabled
  id_input8.disabled = !id_input8.disabled
  id_input9.disabled = !id_input9.disabled
  id_input10.disabled = !id_input10.disabled
  id_input11.disabled = !id_input11.disabled
}

function onoff() {

  currentvalue = document.getElementById('onoff').value;
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
    document.getElementById("id_input9").style.border = "none"
    document.getElementById("id_input10").style.border = "none"
    document.getElementById("id_input11").style.border = "none"

    document.getElementById("id_input2").style.cursor = "default"
    document.getElementById("id_input3").style.cursor = "default"
    document.getElementById("id_input4").style.cursor = "default"
    document.getElementById("id_input5").style.cursor = "default"
    document.getElementById("id_input6").style.cursor = "default"
    document.getElementById("id_input7").style.cursor = "default"
    document.getElementById("id_input8").style.cursor = "default"
    document.getElementById("id_input9").style.cursor = "default"
    document.getElementById("id_input10").style.cursor = "default"
    document.getElementById("id_input11").style.cursor = "default"

    document.getElementById("id_input2").style.boxShadow = "none";
    document.getElementById("id_input3").style.boxShadow = "none";
    document.getElementById("id_input4").style.boxShadow = "none";
    document.getElementById("id_input5").style.boxShadow = "none";
    document.getElementById("id_input6").style.boxShadow = "none";
    document.getElementById("id_input7").style.boxShadow = "none";
    document.getElementById("id_input8").style.boxShadow = "none";
    document.getElementById("id_input9").style.boxShadow = "none";
    document.getElementById("id_input10").style.boxShadow = "none";
    document.getElementById("id_input11").style.boxShadow = "none";

    document.getElementById("id_input2").style.color = "#525252";
    document.getElementById("id_input3").style.color = "#525252";
    document.getElementById("id_input4").style.color = "#525252";
    document.getElementById("id_input5").style.color = "#525252";
    document.getElementById("id_input6").style.color = "#525252";
    document.getElementById("id_input7").style.color = "#525252";
    document.getElementById("id_input8").style.color = "#525252";
    document.getElementById("id_input9").style.color = "#525252";
    document.getElementById("id_input10").style.color = "#525252";
    document.getElementById("id_input11").style.color = "#525252";


    document.getElementById("onoff").style.backgroundColor = "#15CDD3"
    document.getElementById("onoff").style.color = "white"
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
    document.getElementById("id_input9").style.border = "1px solid grey"
    document.getElementById("id_input10").style.border = "1px solid grey"
    document.getElementById("id_input11").style.border = "1px solid grey"

    document.getElementById("id_input2").style.cursor = "auto"
    document.getElementById("id_input3").style.cursor = "auto"
    document.getElementById("id_input4").style.cursor = "auto"
    document.getElementById("id_input5").style.cursor = "auto"
    document.getElementById("id_input6").style.cursor = "auto"
    document.getElementById("id_input7").style.cursor = "auto"
    document.getElementById("id_input8").style.cursor = "auto"
    document.getElementById("id_input9").style.cursor = "auto"
    document.getElementById("id_input10").style.cursor = "auto"
    document.getElementById("id_input11").style.cursor = "auto"

    document.getElementById("id_input2").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input3").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input4").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input5").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input6").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input7").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input8").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input9").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input10").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
    document.getElementById("id_input11").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";

    document.getElementById("id_input2").style.color = "black";
    document.getElementById("id_input3").style.color = "black";
    document.getElementById("id_input4").style.color = "black";
    document.getElementById("id_input5").style.color = "black";
    document.getElementById("id_input6").style.color = "black";
    document.getElementById("id_input7").style.color = "black";
    document.getElementById("id_input8").style.color = "black";
    document.getElementById("id_input9").style.color = "black";
    document.getElementById("id_input10").style.color = "black";
    document.getElementById("id_input11").style.color = "black";

    document.getElementById("onoff").style.color = "white"
    document.getElementById("onoff").style.backgroundColor = "#1A6969"
  }
}

function valorPlaceholder() {

  const data = window.sessionStorage.getItem('Token');

  const dados = parseJwt(data).data;

  document.getElementById("id_input2").value = "teste";
  document.getElementById("id_input3").value = "clinicase@outlook.com";
  document.getElementById("id_input4").value = "Rua Haddock Lobo, 155";
  document.getElementById("id_input5").value = "São Paulo";
  document.getElementById("id_input6").value = "São Paulo";
  document.getElementById("id_input7").value = "00000001";
  document.getElementById("id_input8").value = "Brasil";
  document.getElementById("id_input9").value = "***************";
  document.getElementById("id_input10").value = "11 912345678";
  document.getElementById("id_input11").value = "00.000.000/0000-00";
}