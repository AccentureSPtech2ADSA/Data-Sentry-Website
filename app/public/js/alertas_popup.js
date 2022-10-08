
/* 
Esse código é um efeito que 
prende o usuário com o popup até que ele clique no botão.

*/ 
function outsideclickBalance() {
    const popup = Swal.getPopup()
    popup.classList.remove('swal2-show')
    setTimeout(() => {
        popup.classList.add('animate__animated', 'animate__headShake')
    })
    setTimeout(() => {
        popup.classList.remove('animate__animated', 'animate__headShake')
    }, 500)
    return false
}

//______Popups

function sucessoSenhaRedefinida(){
    Swal.fire({
        title: '',
        text: 'Senha redefinida com sucesso',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#1a6969',
        iconColor: 'green',
        backdrop: '',
        timer: '5000',
        timerProgressBar: true
    })
}
function erro(){
    Swal.fire({
        title: 'Erro',
        text: 'Erro texto',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#1a6969',
        iconColor: 'red',
        backdrop: '',
        timer: '3000',
        timerProgressBar: true
    })
}
function atencaoCamposNull(){
    Swal.fire({
        title: 'Atenção',
        text: 'Todos os campos devem ser preenchidos',
        icon: 'warning',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#1a6969',
        iconColor: '#FFBF00',
        backdrop: '',
        timer: '5000',
        timerProgressBar: true
    })
}

function erroPadraoSenha(){
    Swal.fire({
        title: 'Senha inválida',
        text: 'A senha deve ter no mínimo 8 dígitos, contendo caracter especial e Letra maíuscula.',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#1a6969',
        iconColor: '#8B0000',
        backdrop: '',
        timer: '8000',
        timerProgressBar: true
    })
}
function erroSenhasDiferentes(){
    Swal.fire({
        title: '',
        text: 'Confirme a mesma senha !',
        icon: 'warning',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#1a6969',
        iconColor: '#FFBF00',
        backdrop: '',
        timer: '8000',
        timerProgressBar: true
    })
}
function erroEmailInvalido(){
    Swal.fire({
        title: '',
        text: 'Email inválido !',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#1a6969',
        iconColor: '#8B0000',
        backdrop: '',
        timer: '8000',
        timerProgressBar: true
    })
}
function sucessoEnvioDeEmail(){
    Swal.fire({
        title: 'Enviado com sucesso !',
        text: 'Verifique sua caixa de entrada ou a caixa de Spam',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#1a6969',
        iconColor: 'green',
        backdrop: '',
        timer: '8000',
        timerProgressBar: true
    })
}