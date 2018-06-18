listaMae = {};

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
        xNome = $("#txtEvento").val();
        objLista = new lista (nomeEvento, localEvento, dataEvento, horaEvento); //Variável que é jogada para o objeto listasCriadas = {}
    
        listaMae[xNome] = objLista; // Cria o ojeto dentro de listaMae = {}
        alert("Lista criada com sucesso");

        userInfos = sessionStorage.getItem("tbLista");
        parsedUser = JSON.parse(userInfos);

        //window.location.replace("../listas/listas.html");
    };

    function limpaCampos() {
        document.getElementById("txtEvento").value = "";
        document.getElementById("txtLocal").value = "";
        document.getElementById("txtData").value = "";
        document.getElementById("txtHora").value = "";
    };


