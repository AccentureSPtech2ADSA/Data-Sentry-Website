function validarLogin() {
    if (sessionStorage.getItem('id') == null) {
      location.href = "./index.html";
    }
  }

  function logout() {
    sessionStorage.clear();
    location.reload();
  }