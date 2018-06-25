//Função que cria base do objeto lista mãe
function lista() {
    this.nomeEvento = $("#txtEvento").val();
    this.localEvento = $("#txtLocal").val();
    this.dataEvento = $("#txtData").val();
    this.horaEvento = $("#txtHora").val();
    this.itensLista = []; 
};

//Função que cria o objeto na lista mãe

function salvarLista(nomeEvento, localEvento, dataEvento, localEvento, horaEvento) {
    objLista = new lista (nomeEvento, localEvento, dataEvento, horaEvento); //Variável que é jogada para o objeto listasCriadas = {}

    alert("Lista criada com sucesso");

    localUser = localStorage.getItem("tbUsuario"); //Busca array de usuários
    localUserParsed = JSON.parse(localUser);

    addListaUsuario (localUserParsed, objLista);

    window.location.replace("../listas/listas.html");
};

function addListaUsuario (a, b) {
    sessionUser = sessionStorage.getItem("usuarioLogado");
    sessionUser = JSON.parse(sessionUser);
    sessionUserNome = sessionUser.nome;
    localUser = a;
    objLista = b;

    for (let index = 0; index < localUser.length; index++) {
        element = localUser[index];
        elementNome = element.nome;

        if (sessionUserNome == elementNome) {

            localUser[index].listaMae.push(objLista);

            localUser = JSON.stringify(localUser);
            localStorage.setItem("tbUsuario", localUser);
        } else {};
    };
};

function limpaCampos() {
    document.getElementById("txtEvento").value = "";
    document.getElementById("txtLocal").value = "";
    document.getElementById("txtData").value = "";
    document.getElementById("txtHora").value = "";
};


