var usuarioLogadoIndex = "";

function criarLista() {
    window.location.replace("../criarlistas/criarlistas.html");
};

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      carregaInfos();
    };
  };

function carregaInfos(){
    userLogedInfos = sessionStorage.getItem("usuarioLogado");
    userLogedInfos = JSON.parse(userLogedInfos);

    localInfos = localStorage.getItem("tbUsuario");
    localInfos = JSON.parse(localInfos);

    $("#nomeUsuario").html(userLogedInfos.nome);
    $("#nomeUsuarioMostrar").html(userLogedInfos.nome);

    acharUsuario(userLogedInfos, localInfos);
};

function acharUsuario(a, b) {
    userLogedInfos = a;
    localInfos = b;

    for (i=0; i<localInfos.length; i++) {
        if (userLogedInfos.nome == localInfos[i].nome) {
            atualInfos = localInfos[i];
            usuarioLogadoIndex = i;
            colocarListaTela(atualInfos);
            return;
        };
    };
};

//Coloca as listas na tela
function colocarListaTela(atualInfos){ 
    td = '<td>';
    aa = '<a href="#">';
    count = 0;
    colorClass = ['bg-primary', 'bg-primary', 'bg-success', 'bg-warning', 'bg-danger', 'bg-info'];
    listasLocalInfos = atualInfos;

    for (i = 0; i < atualInfos.listaMae.length; i++) {
        color = Math.floor(Math.random() * 4) + 1;
        color = colorClass[color];
        count += 1;
        tdLista = '<td class="' +  color + '">';
        tdButton = '<td class= "text-center ' +  color + '"' + '>';

        evNome = listasLocalInfos.listaMae[i].nomeEvento;
        evLocal = listasLocalInfos.listaMae[i].localEvento;
        evData = listasLocalInfos.listaMae[i].dataEvento;
        evHorario = listasLocalInfos.listaMae[i].horaEvento;
        btnLista = '<button type="button" class="btn btn-secondary" onclick="verItem(' + "'" + evNome + "'" + ')">' + "Itens" + '</button>';
        
        $(tdLista).addClass("color");
        document.getElementById("tabelaListas").innerHTML += td + count + tdLista + evNome + tdLista + evLocal + tdLista + evData + tdLista + evHorario + tdButton + btnLista;
    };
};

//Coloca os itens e as suas informações no modal
function verItem(x) {
    $("#itensDaLista").modal();
    nomeDaLista = x;

    count = 0;
    listasLocalInfos = atualInfos;

    for (i = 0; i < atualInfos.listaMae.length; i++) {
        if (listasLocalInfos.listaMae[i].nomeEvento == nomeDaLista) {
            
            for (u = 0; u < atualInfos.listaMae.length; u++) {
                
                for (p = 0; p < atualInfos.listaMae[u].itensLista.length; p++) {
                count += 1;

                itemNome = listasLocalInfos.listaMae[u].itensLista[p][0];
                itemQuant = listasLocalInfos.listaMae[u].itensLista[p][1];
                itemUni = listasLocalInfos.listaMae[u].itensLista[p][2];
                itemMarca = listasLocalInfos.listaMae[u].itensLista[p][3];
                itemRespons = listasLocalInfos.listaMae[u].itensLista[p][4];

                td = '<td>';
                tr = '<tr id=' + '"' + itemNome + '"' + '>';

                btnLista = '<button type="button" class="btn btn-danger" onclick="delItem(' + "'" + itemNome + "'" + ')">' + "X" + '</button>';

                document.getElementById("tabelaItens").innerHTML += tr + td + count + td + itemNome + td + itemQuant + itemUni + td + itemMarca + td + itemRespons + td + btnLista;
                
                $("#itensDaLista").on("hidden.bs.modal", function(){   //Reseta o modal ao fechar
                    $("#tabelaItens").html("");
                });

                };
            };
        };
    };
};

function delItem(x) {
    del = x;
    delId = "#";
    $(delId + del).remove();
    
    for (u = 0; u < atualInfos.listaMae[u].itensLista.length; u++) {
                
        for (p = 0; p < atualInfos.listaMae[u].itensLista[p].length; p++) {

            if (del == atualInfos.listaMae[u].itensLista[p][0]) {

                atualInfos.listaMae[u].itensLista.splice(p, 1);
                alert("item excluído.");
                return;

                usuarioLogadoAtualizado = localInfos.splice(usuarioLogadoIndex, 500, listasLocalInfos);
                usuarioLogadoAtualizado = JSON.stringify(usuarioLogadoAtualizado);
                localStorage.setItem("tbUsuario", usuarioLogadoAtualizado);

            };
        };
    };
};

function addItem() {
    var produto = [];

    itemNome = $("#adcItem").val();
    itemQuant = $("#adcQuantidade").val();
    itemUni = $("#adcUnidade").val();
    itemMarca = $("#adcMarca").val();
    itemResp = $("#adcResp").val();

    produto.push(itemNome);
    produto.push(itemQuant);
    produto.push(itemUni);
    produto.push(itemMarca);
    produto.push(itemResp);
    //i.push(produto);

    for (i=0; i<listasLocalInfos.listaMae.length; i++) {
        if (listasLocalInfos.listaMae[i].nomeEvento == nomeDaLista) {
            itensDaLista = listasLocalInfos.listaMae[i];

            itensDaLista.itensLista.push(produto);

            usuarioLogadoAtualizado = localInfos.splice(usuarioLogadoIndex, 500, listasLocalInfos);
            usuarioLogadoAtualizado = JSON.stringify(usuarioLogadoAtualizado);
            localStorage.setItem("tbUsuario", usuarioLogadoAtualizado);

            $("#itensDaLista").modal('hide');
            limpaItem()
        };
    };
};

function limpaItem() {
    document.getElementById("adcItem").value = "";
    document.getElementById("adcQuantidade").value = "";
    document.getElementById("adcUnidade").value = "";
    document.getElementById("adcMarca").value = "";
    document.getElementById("adcResp").value = "";
}

function deslogar() {
    window.location.href = "../index.html";
    sessionStorage.clear();
};