function removerBordas(id) {
  console.log(id);
  document.getElementById(id).style.border = "none"

  if (
    input_razao_social.value != "" &&
    input_cep.value != "" &&
    input_complemento.value != "" &&
    input_num_contato.value != "" &&
    input_nome_fantasia.value != "" &&
    input_num_endereco.value != "" &&
    input_unidade.value != "" &&
    input_cnpj.value != "" &&
    input_email.value != "" &&
    input_senha.value != "" &&
    input_confirmar_senha.value != ""
  ) {
    span_validacao.innerHTML = ""
  }
}

function validCadastro() {
  /* Verifica se há algum input com valor vazio e ajusta o layout para o texto caber na tela caso houver */
  if (
    input_razao_social.value == "" ||
    input_cep.value == "" ||
    input_num_contato.value == "" ||
    input_nome_fantasia.value == "" ||
    input_num_endereco.value == "" ||
    input_unidade.value == "" ||
    input_cnpj.value == "" ||
    input_email.value == "" ||
    input_senha.value == "" ||
    input_confirmar_senha.value == ""
  ) {
    span_validacao.innerHTML = "Por favor preencha todos os campos";
    idcontainer2.style.marginTop = "-6px";
    id_container3.style.marginTop = "14px"

    /* marca o campo razao social se estiver vazio */
    if (input_razao_social.value !== "") {
      input_razao_social.style.border = "none";
    } else {
      input_razao_social.style.border = "thin solid #FF0000";
    }

    /* marca o campo cep se estiver vazio */
    if (input_cep.value !== "") {
      input_cep.style.border = "none";
    } else {
      input_cep.style.border = "thin solid #FF0000";
    }

    /* marca o campo complemento se estiver vazio */
    if (input_complemento.value !== "") {
      input_complemento.style.border = "none";
    } else {
      input_complemento.style.border = "thin solid #FF0000";
    }

    /* marca o campo numero de contato se estiver vazio */
    if (input_num_contato.value !== "") {
      input_num_contato.style.border = "none";
    } else {
      input_num_contato.style.border = "thin solid #FF0000";
    }

    /* marca o campo nome fantasia se estiver vazio */
    if (input_nome_fantasia.value !== "") {
      input_nome_fantasia.style.border = "none";
    } else {
      input_nome_fantasia.style.border = "thin solid #FF0000";
    }

    /* marca o campo numero de endereço se estiver vazio */
    if (input_num_endereco.value !== "") {
      input_num_endereco.style.border = "none";
    } else {
      input_num_endereco.style.border = "thin solid #FF0000";
    }

    /* marca o campo unidade se estiver vazio */
    if (input_unidade.value !== "") {
      input_unidade.style.border = "none";
    } else {
      input_unidade.style.border = "thin solid #FF0000";
    }

    /* marca o campo cnpj se estiver vazio */
    if (input_cnpj.value !== "") {
      input_cnpj.style.border = "none";
    } else {
      input_cnpj.style.border = "thin solid #FF0000";
    }

    /* marca o campo email se estiver vazio */
    if (input_email.value !== "") {
      input_email.style.border = "none";
    } else {
      input_email.style.border = "thin solid #FF0000";
    }

    /* marca o campo senha se estiver vazio */
    if (input_senha.value !== "") {
      input_senha.style.border = "none";
    } else {
      input_senha.style.border = "thin solid #FF0000";
    }

    /* marca o campo confirmar senha se estiver vazio */
    if (input_confirmar_senha.value !== "") {
      input_confirmar_senha.style.border = "none";
    } else {
      input_confirmar_senha.style.border = "thin solid #FF0000";
    }
  } else {

    /* tira as marcações das inputs já preenchidas */
    input_razao_social.style.border = "none";
    input_cep.style.border = "none";
    input_complemento.style.border = "none";
    input_num_contato.style.border = "none";
    input_nome_fantasia.style.border = "none";
    input_num_endereco.style.border = "none";
    input_unidade.style.border = "none";
    input_cnpj.style.border = "none";
    input_email.style.border = "none";
    input_senha.style.border = "none";
    input_confirmar_senha.style.border = "none";
    
   // Regex Validação (Email):
   var email = document.getElementById('input_email').value
   const regexEmail = /^([a-zA-Z0-9-.]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([a-zA-Z0-9-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/gm;
   // Regex Validação (Senha)
   var senha = document.getElementById('input_senha').value;
   var confirmSenha = document.getElementById('input_confirmar_senha').value;
   const regexSenha = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g

    if (regexEmail.test(email) == false){
      input_email.style.border = "thin solid #FF0000";
      span_validacao.innerHTML = 'Email inválido';

    /* Valida se o email possui "@" */
    // if (input_email.value.indexOf("@") == -1) {
    //   input_email.style.border = "thin solid #FF0000";
    //   span_validacao.innerHTML = 'Email inválido, deve conter "@"';
    // } else if (input_email.value.length < 10) {
    //   /* Valida se o email possui mais de 10 caracteres */
    //   input_email.style.border = "thin solid #FF0000";
    //   span_validacao.innerHTML = "Email inválido, deve conter no mínimo 10 digitos";

    } else if (input_razao_social.value.length < 3) {
      /* Valida se a razao social possui mais de 3 caracteres */
      input_razao_social.style.border = "thin solid #FF0000";
      span_validacao.innerHTML = "Campo razão social deve conter no mínimo 3 digitos";
    } else if (input_cnpj.value.length < 14) {
      /* Valida se o cnpj possui mais de 14 caracteres */
      input_cnpj.style.border = "thin solid #FF0000";
      span_validacao.innerHTML = "Insira um CNPJ válido";

    
    } else if (regexSenha.test(senha) == false){
      input_senha.style.border = "thin solid #FF0000";
      input_confirmar_senha.style.border = "thin solid #FF0000";
      span_validacao.innerHTML = "A senha deve ter no mínimo 8 dígitos, contendo carácter especial, Letra maíuscula e Letra minúscula";

    } else if (senha != confirmSenha){
      input_senha.style.border = "thin solid #FF0000";
      input_confirmar_senha.style.border = "thin solid #FF0000";
      span_validacao.innerHTML = "As senhas não coincidem";
    
    // } else if (input_senha.value.length < 8) {
    //   /* Valida se a senha tem mais de 8 caracteres */
    //   input_senha.style.border = "thin solid #FF0000";
    //   input_confirmar_senha.style.border = "thin solid #FF0000";
    //   span_validacao.innerHTML = "Senha deve conter no mínimo 8 digitos";
    // } else if (input_senha.value !== input_confirmar_senha.value) {
    //   /* Valida se as inputs de senha e confirmar senha são iguais */
    //   input_senha.style.border = "thin solid #FF0000";
    //   input_confirmar_senha.style.border = "thin solid #FF0000";
    //   span_validacao.innerHTML = "As senhas não coincidem";

    } else if (chk_termos.checked == false) {
      /* Valida se o checkbox de termos de uso foi aceito */
      span_validacao.innerHTML = "Você deve concordar com os nossos termos de uso antes de prosseguir";
      chk_termos.style.outline = "1px solid red";
      chk_termos.style.outlineOffset = "-1px";
    } else {
      // !!~~ Limpando Mascaras antes de enviar os dados para o Banco 
      limparMascara()

      /* Confirma o cadastro e abre a tela de monitoramento */
      input_razao_social.style.border = "none";
      input_cep.style.border = "none";
      input_complemento.style.border = "none";
      input_num_contato.style.border = "none";
      input_nome_fantasia.style.border = "none";
      input_num_endereco.style.border = "none";
      input_unidade.style.border = "none";
      input_cnpj.style.border = "none";
      input_email.style.border = "none";
      input_senha.style.border = "none";
      input_confirmar_senha.style.border = "none";


      const cnpj = input_cnpj.value.trim();
      const cep = input_cep.value.trim();
      const num_contato = input_num_contato.value.trim();
      const num_endereco = input_num_endereco.value.trim();
      const nome_fantasia = input_nome_fantasia.value.trim();
      const email = input_email.value.trim();
      const senha = input_senha.value.trim();
      const unidade = input_unidade.value.trim();
      const complemento = input_complemento.value.trim();
      const razao_social = input_razao_social.value.trim();

      console.log(cep, num_contato, cnpj, email);

      fazerRequisicaoInserirHospitalUser(cnpj, cep, num_endereco, unidade, nome_fantasia, razao_social, complemento, nome_fantasia, email, senha, num_contato)
      .then(res=>{
        console.log(res);
        if(res.status == 200 || res.status == 201){
          // programar logica do session storage aqui dentro, colocar o jwt e os dados do usuario
          alertar(
            '',
            'Cadastro efetuado com sucesso !',
            'success',
            'Ok'
          );
          
        }
      })
      .catch(err=>{
        alert(err)
      })
      return;
    }
  }
}

async function fazerRequisicaoInserirHospitalUser(
  cnpj,
  cep,
  numberAddress,
  unit,
  fantasyName,
  corporateName,
  complemento,
  name,
  email,
  password,
  phone
) {
// let req = await fetch("/hospital/insert",{
  let req = await fetch("/hospital/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cep: cep,
      cnpj: cnpj,
      complement: complemento,
      corporateName: corporateName,
      fantasyName: fantasyName,
      numberAdress: numberAddress,
      unit: unit,
      name: fantasyName,
      email: email,
      password: password,
      phone: phone,
    }),
  });
  let res = await req.json();
  return res;
  }
