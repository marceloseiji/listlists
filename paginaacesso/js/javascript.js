//Script do armazenamento das Listas mãe


    var listasCriadas = {}; //Objeto que armazenas as listas filhas (Que também são objetos)
    
    function validarLista() {
        nomeLista = $("#iptNomeLista").val().replace(/\ /g, "_");
        dataEvento = $("#iptDataEvento").val();
        horaEvento = $("#iptHoraEvento").val();
        localEvento = $("#iptLocalEvento").val();
        observacoesEvento = $("#textObservacoesEvento").val();
        itensLista = {};
    
        //código que verifica se os campos foram preenchidos, se sim ele chama a função criarLista();
        if ((nomeLista == "") || (dataEvento == "") || (horaEvento == "") || (localEvento == "")) {
        alert ("Favor preencher os campos obrigatórios.");                    
            if (nomeLista == "") {
            $("#iptNomeLista").css('border', '1px solid red');
            } else if (!nomeLista == "") {
                $("#iptNomeLista").css('border', '1px solid #00ff55');
                }

            if (dataEvento == "") {
            $("#iptDataEvento").css('border', '1px solid red');
            } else if (!dataEvento == "") {
                $("#iptDataEvento").css('border', '1px solid #00ff55');
                }

            if (horaEvento == "") {
            $("#iptHoraEvento").css('border', '1px solid red');
                } else if (!horaEvento == "") {
                $("#iptHoraEvento").css('border', '1px solid #00ff55');
                }
            
            if (localEvento == "") {
            $("#iptLocalEvento").css('border', '1px solid red');
                } else if (!localEvento == "") {
                $("#iptLocalEvento").css('border', '1px solid #00ff55');
                }
        return;
        }
        criarLista();
    };
    //Função que cria base do objeto lista mãe
    function baseLista() {
        this.nomeLista = $("#iptNomeLista").val().replace(/\ /g, "_");
        this.dataEvento = $("#iptDataEvento").val();
        this.horaEvento = $("#iptHoraEvento").val();
        this.localEvento = $("#iptLocalEvento").val();
        this.observacoesEvento = $("#textObservacoesEvento").val();
        this.itensLista = []; 
    };
    //Função que cria base do objeto lista mãe


    //Função que cria o objeto na lista mãe
    function criarLista(nomeLista, dataEvento, horaEvento, localEvento, observacoesEvento) {

        var objLista = new baseLista (nomeLista, dataEvento, horaEvento, localEvento, observacoesEvento); //Variável que é jogada para o objeto listasCriadas = {}

        objValLista = $("#iptNomeLista").val().replace(/\ /g, "_"); //Variável que cria o nome do objeto dentro do objeto listasCriadas = {}
        listasCriadas[objValLista] = objLista; // Cria o ojeto dentro de listasCriadas = {}
        guardarLista(objValLista); // Chama a função que coloca a lista na tela
        limparCampos();
        $("#modalListaFilha").modal('hide'); //Fecha o modal depois da lista ser colocada na tela
    };
    //Função que cria o objeto na lista mãe


    //Função que coloca a Lista mãe na tela e cria o <a> que ativa o modal da lista filha
    function guardarLista(objValLista) {       
        localizador = '<a ' + "href='#'" + 'onclick=abrirLista' + '(' + '"' + objValLista + '"' + ')' + '>'; //essa porra de codigo cria o localizador para o modal mostrar a lista certa     
        $("#listaCriada").append(localizador + '<li class="listasMae" id= "listaNova_' + objValLista + '"' + '>' + listasCriadas[objValLista].nomeLista.replace(/\_/g, " ") + "</li>" + "</a>"); //essa parte usa o append pra juntar localizador com o resto da lista
    };
    //Função que coloca a Lista mãe na tela e cria o <a> que ativa o modal da lista filha


    //Limpa os campos do modal da criação de lista
    function limparCampos() {
        document.getElementById("iptNomeLista").value = "";
        document.getElementById("iptDataEvento").value = "";
        document.getElementById("iptHoraEvento").value = "";
        document.getElementById("iptLocalEvento").value = "";
        document.getElementById("textObservacoesEvento").value = "";
    };
    //Limpa os campos do modal da criação de lista

    function deletarLista() {
        $('#modalExcluirLista').modal(); //Faz abrir o modal de decisão de deletar lista
    };
    function confirmaExcluir() {
        var varDel = listasCriadas[modalNomeLista.textContent.replace(/\ /g, "_")].nomeLista; //Coloca o nome da lista na varDel para identificar a lista a deletar;
        var del = "#" + "listaNova_" + varDel;
        $(del).remove();
        
        delete listasCriadas[varDel];

        alert ("Sua lista foi excluída");
        $('#modalExcluirLista').modal("hide");
        $('#abrirModalLista').modal("hide");
    };


//Script do armazenamento das Listas mãe


//Script da lista filha

    //Abre o modal da lista filha e coloca os elementos no modal pelo .append
    function abrirLista(x) {
    xNom = x;
    var nomeLista = listasCriadas[xNom].nomeLista;
    var dataEvento = listasCriadas[xNom].dataEvento;
    var horaEvento = listasCriadas[xNom].horaEvento;
    var localEvento = listasCriadas[xNom].localEvento;
    var observacoesEvento = listasCriadas[xNom].observacoesEvento;

    $('#abrirModalLista').modal(); //Faz abrir o modal

    //Coloca os elementos da lista Mãe no modal
    $("#listaModal").append("Dia: " + dataEvento + '</br>');
    $("#listaModal").append("Horário: " + horaEvento + '</br>');
    $("#listaModal").append("Local: " + localEvento + '</br>');
    $("#listaModal").append("Observações: " + observacoesEvento + '</br>');
    document.getElementById("modalNomeLista").innerHTML = nomeLista.replace(/\_/g, " ");
    
    colocaItemLista(nomeLista);

    //Apaga as informações do modal que foi mostrado
    $("#abrirModalLista").on("hidden.bs.modal", function() {
        $("#listaModal").empty();
    });

    //Apaga as informações do modal que foi mostrado
    $("#abrirModalLista").on("hidden.bs.modal", function() {
        $("#listaItens").empty();
    });
    };

    //Abre o modal de adicionar item na lista filha
    function adcItem () {
    $('#modalAdcItem').modal();
    };
    

//Script da lista filha


//Adiciona itens na lista filha atravéz do botão do modal para adicionar itens na lista filha, ativa a função ()/


    function criarNovo() { //Cria o item (array de arrays) - ["Item: x", "Quantidade: x", "Un: x", "Marca: x"]
        var produto = [];
        var i = listasCriadas[modalNomeLista.textContent.replace(/\ /g, "_")].itensLista;

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
        i.push(produto);
         
        btnDel = '<button class="btn btn-danger" onclick=delItem(' + '"' + itemNome + '"' + ")" + '>' + 'x' + '</button>';
        
        $("#modalAdcItem").modal('hide'); //Fecha o modal depois do item ser colocado na lista
        $("#addItem").modal();
        limpaItem();
    };

    function colocaItemLista(nomeLista){
        this.y = nomeLista;
        var table = '<table id="tabelaItens" class="table table-bordered">';
        var tHead = '<thead>';
        var tBody = '<tBody>';
        var tr = '<tr>';
        var th = '<th scope="row" id="thTabela">';
        var td = '<td>';
        $("#listaItens").append(table + tHead + '<tr> <th scope="col">Item</th> <th scope="col">Quant.</th> <th scope="col">Un</th> <th scope="col">Marca</th> <th scope="col">Responsável</th> </tr>');

        for (let indexP = 0; indexP < listasCriadas[this.y].itensLista.length; indexP++) {
            $("#tabelaItens").append(tBody + tr);

            for (let indexI = 0; indexI < listasCriadas[this.y].itensLista[indexP].length; indexI++) {
                $("#tabelaItens").append(td + listasCriadas[this.y].itensLista[indexP][indexI]);
            }
        }
    };

    function limpaItem() { //Limpa os campos de adicionr item
        document.getElementById("adcItem").value = "";
        document.getElementById("adcQuantidade").value = "";
        document.getElementById("adcUnidade").value = "";
        document.getElementById("adcMarca").value = "";
        document.getElementById("adcResp").value = "";
    };
    
    function delItem(x) {
        del = x;
        delId = "#";
        $(delId + del).remove();
        delete listasCriadas[modalNomeLista.textContent].itensLista[del];
    };

//Adiciona itens na lista filha atravéz do botão do modal para adicionar itens na lista filha, ativa a função ()