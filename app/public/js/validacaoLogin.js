function validacaoLogin() {
    console.log('execute validate');
    if (!sessionStorage.getItem('Token')) {
        window.location.href = "/";
    }
}

function validacaoLoginSemToken() {
    let token_url = window.location.href
    console.log(token_url)
    if (token_url.includes('token')) {
        console.log('há token')
    } else {
        window.open("./index.html", "_self")
    }
}
