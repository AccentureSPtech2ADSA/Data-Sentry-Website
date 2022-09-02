function validCadastro() {
  var nomeVar = input_nome.value
  var sobrenomeVar = input_sobrenome.value
  var telVar = input_tel.value
  var emailVar = input_email.value
  var senhaVar = input_senha.value
  /* Verifica se há algum input com valor vazio e ajusta o layout para o texto caber na tela caso houver */
  if (
    input_nome.value == "" ||
    input_tel.value == "" ||
    input_senha.value == "" ||
    input_sobrenome.value == "" ||
    input_email.value == "" ||
    input_repetir_senha.value == ""
  ) {
    span_validacao.innerHTML = "Por favor preencha todos os campos";
    idcontainer2.style.marginTop = "-25px";
    texto_cadastro.style.marginBottom = "30px";

    /* marca o campo sobrenome se estiver vazio */
    if (input_nome.value !== "") {
      input_nome.style.border = "none";
    } else {
      input_nome.style.border = "thin solid #FF0000";
    }

    /* marca o campo email se estiver vazio */
    if (input_email.value !== "") {
      input_email.style.border = "none";
    } else {
      input_email.style.border = "thin solid #FF0000";
    }

    /* marca o campo nome/razão social se estiver vazio */
    if (input_sobrenome.value !== "") {
      input_sobrenome.style.border = "none";
    } else {
      input_sobrenome.style.border = "thin solid #FF0000";
    }

    /* marca o campo senha se estiver vazio */
    if (input_senha.value !== "") {
      input_senha.style.border = "none";
    } else {
      input_senha.style.border = "thin solid #FF0000";
    }

    /* marca o campo repetir senha se estiver vazio */
    if (input_repetir_senha.value !== "") {
      input_repetir_senha.style.border = "none";
    } else {
      input_repetir_senha.style.border = "thin solid #FF0000";
    }

    /* marca o campo telefone se estiver vazio */
    if (input_tel.value !== "") {
      input_tel.style.border = "none";
    } else {
      input_tel.style.border = "thin solid #FF0000";
    }
  } else {
    /* tira as marcações das inputs já preenchidas */
    input_tel.style.border = "none";
    input_senha.style.border = "none";
    input_repetir_senha.style.border = "none";
    input_nome.style.border = "none";
    input_email.style.border = "none";
    input_sobrenome.style.border = "none";

    /* Valida se o email possui "@" */
    if (input_email.value.indexOf("@") == -1) {
      input_email.style.border = "thin solid #FF0000";
      span_validacao.innerHTML = 'Email inválido, deve conter "@"';
    } else if (input_email.value.length < 10) {

      /* Valida se o email possui mais de 10 caracteres */
      input_email.style.border = "thin solid #FF0000";
      span_validacao.innerHTML =
        "Email inválido, deve conter no mínimo 10 digitos";
    } else if (input_nome.value.length < 3) {

      /* Valida se o nome possui mais de 3 caracteres */
      input_nome.style.border = "thin solid #FF0000";
      span_validacao.innerHTML = "Nome deve conter no mínimo 3 digitos";
    } else if (input_sobrenome.value.length < 3) {

      /* Valida se a input sobrenome possui mais de 3 caracteres */
      input_sobrenome.style.border = "thin solid #FF0000";
      span_validacao.innerHTML = "Sobrenome deve conter no mínimo 3 digitos";
    } else if (input_tel.value.length < 8) {

      /* Valida se o número de telefone possui ao menos 8 digitos */
      input_tel.style.border = "thin solid #FF0000";
      span_validacao.innerHTML = "Telefone deve conter no mínimo 8 digitos";
    } else if (input_senha.value.length < 8) {

      /* Valida se a senha tem mais de 8 caracteres */
      input_senha.style.border = "thin solid #FF0000";
      input_repetir_senha.style.border = "thin solid #FF0000";
      span_validacao.innerHTML = "Senha deve conter no mínimo 8 digitos";
    } else if (input_senha.value !== input_repetir_senha.value) {

      /* Valida se as inputs de senha e confirmar senha são iguais */
      input_senha.style.border = "thin solid #FF0000";
      input_repetir_senha.style.border = "thin solid #FF0000";
      span_validacao.innerHTML = "As senhas não coincidem";
    } else if (chk_termos.checked == false) {

      /* Valida se o checkbox de termos de uso foi aceito */
      span_validacao.innerHTML =
        "Você deve concordar com os nossos termos de uso antes de prosseguir";
      chk_termos.style.outline = "1px solid red";
      chk_termos.style.outlineOffset = "-1px";
    } else {

      /* Confirma o cadastro e abre a tela de monitoramento */
      input_tel.style.border = "none";
      input_senha.style.border = "none";
      input_repetir_senha.style.border = "none";
      input_nome.style.border = "none";
      input_email.style.border = "none";
      input_sobrenome.style.border = "none";

      alert("Cadastro efetuado com sucesso");
      window.location.href = "index.html";

      fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          // crie um atributo que recebe o valor recuperado aqui
          // Agora vá para o arquivo routes/usuario.js
          nomeServer: nomeVar,
          sobrenomeServer: sobrenomeVar,
          telServer: telVar,
          emailServer: emailVar,
          senhaServer: senhaVar,
        })
      })
    }
  }
}