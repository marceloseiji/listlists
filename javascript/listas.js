function criarLista() {
    window.location.replace("../criarlistas/criarlistas.html");
};

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      carregaInfos();
    }
  }

  function carregaInfos(){
      userInfos = sessionStorage.getItem("tbLista");
      parsedUser = JSON.parse(userInfos);

      $("#nomeUsuario").html(parsedUser.nome);
  }