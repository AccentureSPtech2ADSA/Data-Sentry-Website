// Abre tela de login
function popup_login() {
  div_login.style.display = "flex";
}

// Fecha tela de login
function fechar_popup_login() {
  div_login.style.display = "none";
  input_email_login.style.border = "thin solid #646569";
  input_senha_login.style.border = "thin solid #646569";
  input_email_login.innerHTML = "";
  input_senha_login.innerHTML = "";
  span_validacao.innerHTML = "";
}

// Validação tela de login
function validLogin() {
  emailVar = input_email_login.value;
  senhaVar = input_senha_login.value;
  /* verifica se há algum input vazio */
  if (input_email_login.value == "" || input_senha_login.value == "") {
    span_validacao.innerHTML = "Por favor preencha todos os campos";
    input_email_login.style.border = "thin solid #FF0000";
    input_senha_login.style.border = "thin solid #FF0000";

    /* marca a input email */
    if (input_email_login.value !== "") {
      input_email_login.style.border = "thin solid #646569";
    } else {
      input_email_login.style.border = "thin solid #FF0000";
    }

    /* marca a input senha */
    if (input_senha_login.value !== "") {
      input_senha_login.style.border = "thin solid #646569";
    } else {
      input_senha_login.style.border = "thin solid #FF0000";
    }
  } else {
    /* tira as marcações das inputs já preenchidas */
    input_email_login.border = "thin solid #646569";
    input_senha_login.style.border = "thin solid #646569";

    /* Valida se o email possui mais de 10 caracteres */
    if (input_email_login.value.length < 10) {
      input_email_login.style.border = "thin solid #FF0000";
      input_senha_login.style.border = "thin solid #646569";
      span_validacao.innerHTML =
        "Email inválido, deve conter no mínimo 10 digitos";
    } else if (input_email_login.value.indexOf("@") == -1) {
      /* Valida se o email possui "@" */
      input_email_login.style.border = "thin solid #FF0000";
      span_validacao.innerHTML = 'Email inválido, deve conter "@"';
    } else if (input_senha_login.value.length < 8) {
      /* Valida se a senha tem mais de 8 caracteres */
      input_senha_login.style.border = "thin solid #FF0000";
      input_email_login.style.border = "thin solid #646569";
      span_validacao.innerHTML = "Senha deve conter no mínimo 8 digitos";
    } else {
      /* Confirma o login e recarrega a página */
      fazerRequisicaoLogin(emailVar.trim(), senhaVar.trim())
      .then((v) => {
        console.log(v)
        if(v.status == 200){
          alert('deu certo. Ir para tela de perfil ou dashboard');
          sessionStorage.setItem('Token', v.token)
          window.location.href = 'http://localhost:3333/perfil_administrador.html';
        }else{
          alert('deu errado')
        }
      })
      .catch(err=>{
        console.error(err);
        alert("deu errado")
      });
      return;
      fetch("/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailVar.trim(),
          password: senhaVar.trim(),
        }),
      })
        .then(function (resposta) {
          console.log("ESTOU NO THEN DO entrar()!");

          if (resposta.ok) {
            console.log(resposta);

            resposta.json().then((json) => {
              console.log(json);
              console.log(JSON.stringify(json));

              // aqui pra baixo voces vão gerar o jwt e colocar no session storage;
              return;
              sessionStorage.EMAIL_USUARIO = json.email;
              sessionStorage.NOME_USUARIO = json.nome;
              sessionStorage.SOBRENOME_USUARIO = json.sobrenome;
              sessionStorage.ID_USUARIO = json.idUsuario;

              span_validacao.innerHTML = `Redirecionando...`;
              span_gif.style.display = "flex";
              span_validacao.style.color = "white";

              setTimeout(function () {
                window.location = "../teste_login.html";
              }, 2000); // apenas para exibir o loading
            });
          } else {
            console.log("Houve um erro ao tentar realizar o login!");
            span_validacao.innerHTML = `Email ou senha inválidos`;
            input_senha_login.style.border = "thin solid red";
            input_email_login.style.border = "thin solid red";

            resposta.text().then((texto) => {
              console.error(texto);
              finalizarAguardar(texto);
            });
          }
        })
        .catch(function (erro) {
          console.log(erro);
        });

      return false;
    }

    function sumirMensagem() {
      cardErro.style.display = "none";
    }
  }
}
async function fazerRequisicaoLogin(email, senha) {
  let req = await fetch("http://localhost:3333/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: senha,
    }),
  });
  let res = await req.json();
  return res;
  console.log(res);
  // recomendo que aqui chame uma funcao para fazer os bagui de session storage e JWT
}
var b = true;

function toggle1() {
  menu_lateral.style.width = "80%";
  item1.style.display = "block";
  item2.style.display = "block";
  item3.style.display = "block";
  item4.style.display = "block";
  item5.style.display = "block";
  item6.style.display = "block";
}

function toggle2() {
  menu_lateral.style.width = "0%";
  item1.style.display = "none";
  item2.style.display = "none";
  item3.style.display = "none";
  item4.style.display = "none";
  item5.style.display = "none";
  item6.style.display = "none";
}
