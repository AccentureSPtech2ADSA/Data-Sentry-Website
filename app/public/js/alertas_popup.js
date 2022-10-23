//______Popup
function alertarQ(title = '', text = '', icon = '', confirmButtonText = '', cancelButtonText = ''){
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
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        confirmButtonColor: '#1a6969',
        timer: '20000',
        timerProgressBar: true
    })
}
function alertar(title = '', text = '', icon = '', confirmButtonText = ''){
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