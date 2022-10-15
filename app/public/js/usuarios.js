function irparaCadastro() {
    painel.style.display = "none";
    painel_cadastro.style.display = "block"
    btn_gerenciar.style.backgroundColor = "#c4e4e4"
    btn_cadastrar.style.backgroundColor = "#FFFFFF"
    area_painel.style.width = "55%"
    area_painel.style.height = "440px"
}

function irparaGerenciar() {
    painel.style.display = "block";
    painel_cadastro.style.display = "none"
    btn_gerenciar.style.backgroundColor = "#FFFFFF"
    btn_cadastrar.style.backgroundColor = "#c4e4e4"
    area_painel.style.width = "80%"
    area_painel.style.height = "auto"
}