function onoff(){
    currentvalue = document.getElementById('onoff').value;
    if(currentvalue == "Salvar"){
      document.getElementById("onoff").value="Editar";

      document.getElementById("id_input1").style.border = "none"
      document.getElementById("id_input2").style.border = "none"
      document.getElementById("id_input3").style.border = "none"
      document.getElementById("id_input4").style.border = "none"
      document.getElementById("id_input5").style.border = "none"
      document.getElementById("id_input6").style.border = "none"
      document.getElementById("id_input7").style.border = "none"
      document.getElementById("id_input8").style.border = "none"
      document.getElementById("id_input9").style.border = "none"

      document.getElementById("id_input1").style.cursor = "default"
      document.getElementById("id_input2").style.cursor = "default"
      document.getElementById("id_input3").style.cursor = "default"
      document.getElementById("id_input4").style.cursor = "default"
      document.getElementById("id_input5").style.cursor = "default"
      document.getElementById("id_input6").style.cursor = "default"
      document.getElementById("id_input7").style.cursor = "default"
      document.getElementById("id_input8").style.cursor = "default"
      document.getElementById("id_input9").style.cursor = "default"

      document.getElementById("id_input1").style.boxShadow = "none";
      document.getElementById("id_input2").style.boxShadow = "none";
      document.getElementById("id_input3").style.boxShadow = "none";
      document.getElementById("id_input4").style.boxShadow = "none";
      document.getElementById("id_input5").style.boxShadow = "none";
      document.getElementById("id_input6").style.boxShadow = "none";
      document.getElementById("id_input7").style.boxShadow = "none";
      document.getElementById("id_input8").style.boxShadow = "none";
      document.getElementById("id_input9").style.boxShadow = "none";

      document.getElementById("id_input1").style.color = "#525252";
      document.getElementById("id_input2").style.color = "#525252";
      document.getElementById("id_input3").style.color = "#525252";
      document.getElementById("id_input4").style.color = "#525252";
      document.getElementById("id_input5").style.color = "#525252";
      document.getElementById("id_input6").style.color = "#525252";
      document.getElementById("id_input7").style.color = "#525252";
      document.getElementById("id_input8").style.color = "#525252";
      document.getElementById("id_input9").style.color = "#525252";


      document.getElementById("onoff").style.backgroundColor = "#15CDD3"
      document.getElementById("onoff").style.color = "white"
    }else{
      document.getElementById("onoff").value="Salvar";
      document.getElementById("id_input1").style.border = "1px solid grey"
      document.getElementById("id_input2").style.border = "1px solid grey"
      document.getElementById("id_input3").style.border = "1px solid grey"
      document.getElementById("id_input4").style.border = "1px solid grey"
      document.getElementById("id_input5").style.border = "1px solid grey"
      document.getElementById("id_input6").style.border = "1px solid grey"
      document.getElementById("id_input7").style.border = "1px solid grey"
      document.getElementById("id_input8").style.border = "1px solid grey"
      document.getElementById("id_input9").style.border = "1px solid grey"

      document.getElementById("id_input1").style.cursor = "auto"
      document.getElementById("id_input2").style.cursor = "auto"
      document.getElementById("id_input3").style.cursor = "auto"
      document.getElementById("id_input4").style.cursor = "auto"
      document.getElementById("id_input5").style.cursor = "auto"
      document.getElementById("id_input6").style.cursor = "auto"
      document.getElementById("id_input7").style.cursor = "auto"
      document.getElementById("id_input8").style.cursor = "auto"
      document.getElementById("id_input9").style.cursor = "auto"
    
      document.getElementById("id_input1").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
      document.getElementById("id_input2").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
      document.getElementById("id_input3").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
      document.getElementById("id_input4").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
      document.getElementById("id_input5").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
      document.getElementById("id_input6").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
      document.getElementById("id_input7").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
      document.getElementById("id_input8").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";
      document.getElementById("id_input9").style.boxShadow = "8px 8px 18px rgb(221, 221, 221)";

      document.getElementById("id_input1").style.color = "black";
      document.getElementById("id_input2").style.color = "black";
      document.getElementById("id_input3").style.color = "black";
      document.getElementById("id_input4").style.color = "black";
      document.getElementById("id_input5").style.color = "black";
      document.getElementById("id_input6").style.color = "black";
      document.getElementById("id_input7").style.color = "black";
      document.getElementById("id_input8").style.color = "black";
      document.getElementById("id_input9").style.color = "black";

      document.getElementById("onoff").style.color = "white"
      document.getElementById("onoff").style.backgroundColor = "#1A6969"
    }
  }

  function valorPlaceholder() {
    document.getElementById("id_input1").value = "Jonathan Gilber";
    document.getElementById("id_input2").value = "jonathan.gilber@sptech.school";
    document.getElementById("id_input3").value = "11 912345678";
    document.getElementById("id_input4").value = "Rua Haddock Lobo, 155";
    document.getElementById("id_input5").value = "São Paulo";
    document.getElementById("id_input6").value = "São Paulo";
    document.getElementById("id_input7").value = "00000001";
    document.getElementById("id_input8").value = "Brasil";
    document.getElementById("id_input9").value = "***************";
  }

$(document).ready(function(){
    $('#inp_cep').mask('00.000-000');
    $('#inp_telefone').mask('(00) 00000-0000');
    $('#inp_cpf').mask('000.000.000-00', {reverse: true});
    $('#inp_data').mask('00/00/0000', {placeholder: '__/__/____'})
});