//______Popup
function alertar(title = '', text = '', icon = '', confirmButtonText = '', iconColor = 'Ok'){
    if(icon == 'warning'){
        iconColor = '#FFBF00'

    } else if (icon == 'error'){
        iconColor = '#8B0000'

    } else if (icon == 'success'){
        iconColor = 'green'

    }
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        iconColor: iconColor,
        confirmButtonText: confirmButtonText,
        confirmButtonColor: '#1a6969',
        timer: '8000',
        timerProgressBar: true
    })
}

/*
TEMPLATE Script para chamar o alerta popup

    alertar(
        'Titulo',
        'Texto',
        'Icone',
        'Texto no Botão'
    );

*/