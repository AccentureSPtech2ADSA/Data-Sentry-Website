$(document).ready(function(){
    $('#inp_cep').mask('00.000-000');
    $('#inp_telefone').mask('(00) 00000-0000');
    $('#inp_cpf').mask('000.000.000-00', {reverse: true});
    $('#inp_data').mask('00/00/0000', {placeholder: '__/__/____'})
});