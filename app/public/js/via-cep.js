$(document).ready(function () {

    function limpa_formulário_cep_cadastro() {
        // Limpa valores do formulário de cep.

        //cadastro
        $("#rua").val("");
        $("#cidade").val("");

    }

    function limpa_formulário_cep_perfilADM() {
        // Limpa valores do formulário de cep.

        //Perfil de Admin
        $("#id_input5").val("");//cidade
        $("#id_input6").val("");//estado
        $("#id_input8").val("");//bairro
    }


    //Quando o campo cep perde o foco.
    $("#input_cep").blur(function () {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#input_rua").val("...");
                $("#input_cidade").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.

                        //Tela de Cadastro
                        $("#input_rua").val(dados.logradouro);
                        $("#input_cidade").val(dados.localidade);


                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep_cadastro();

                        //cadastro
                        input_cep.style.border = "thin solid #FF0000";
                        span_validacao.innerHTML = "Cep não encontrado";

                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep_cadastro();

                //cadastro
                input_cep.style.border = "thin solid #FF0000";

                span_validacao.innerHTML = "Insira um cep válido";
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep_cadastro();
        }
    });


/////////////////////////////////////////////////////////// Perfil ADM
    //Quando o campo cep perde o foco.
    $("#id_input7").blur(function () {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.

                //Perfil de Admin
                $("#id_input5").val("...");//cidade
                $("#id_input6").val("...");//estado
                $("#id_input8").val("...");//bairro

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta

                        //Perfil de Admin
                        $("#id_input5").val(dados.localidade);//cidade
                        $("#id_input6").val(dados.uf);//estado
                        $("#id_input8").val(dados.bairro);//bairro

                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep_perfilADM();

                        //Perfil admin
                        id_input7.style.border = "thin solid #FF0000";
                        // id_input5.style.border = "thin solid #FF0000";
                        // id_input6.style.border = "thin solid #FF0000";
                        // id_input8.style.border = "thin solid #FF0000";
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep_perfilADM();

                //Perfil admin
                id_input7.style.border = "thin solid #FF0000";
                // id_input5.style.border = "thin solid #FF0000";
                // id_input6.style.border = "thin solid #FF0000";
                // id_input8.style.border = "thin solid #FF0000";

                span_validacao_PerfilAdmin.innerHTML = "Insira um cep válido";
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep_perfilADM();
        }
    });
});
