
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

function sucesso(){
    Swal.fire({
        title: '',
        text: '',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#1a6969',
        iconColor: 'green',
        backdrop: '',
        timer: '3000',
        timerProgressBar: true
    })
}
function erro(){
    Swal.fire({
        title: '',
        text: '',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#1a6969',
        iconColor: 'red',
        backdrop: '',
        timer: '3000',
        timerProgressBar: true
    })
}