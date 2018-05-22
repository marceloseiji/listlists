// Declarando as variaveis globais.
// Vetor que armazena os objetos
var indice_selecionado = -1; //Índice do item selecionado na lista
var tbUsuario = localStorage.getItem("tbUsuario");// Recupera os dados armazenados
tbUsuario = JSON.parse(tbUsuario); // Converte string para objeto
if (tbUsuario == null) // Caso não haja conteúdo, iniciamos um vetor vazio
    tbUsuario = [];



// Função validação de campos
function ValidaCampo() {
    var nome = $("#txtNome").val();
    var email = $("#txtEmail").val();
    var senha = $("#txtSenha").val();
    var rep_senha = $("#txtConfirmarSenha").val();

    if (nome == "" || nome.length < 3) {
        $("#txtNome").focus().css("border-color","red");
        $("#avisoNome").text("NOME NÃO CORRESPONDE COM O ESPERADO");
        
        
        return false
    }else
    $("#txtNome").focus().css("border-color","green");
    $("#aviso").text("");
    return true;
}





// Função Cadastrar Usuario
function Cadastro() {

    // Objeto Usuario
    usuario = JSON.stringify({
        nome: $("#txtNome").val(),
        email: $("#txtEmail").val(),
        senha: $("#txtSenha").val()
    });

    // Armazenando o objeto na última posição do array
    tbUsuario.push(usuario);

    localStorage.setItem("tbUsuario", JSON.stringify(tbUsuario));

    alert("Nome: " + usuario.nome + "\nEmail: " + usuario.email);
}


$(document).

// Chamando o Botão de cadastro
$(document).ready(function () {
    $("#btnCadastrar").click(function () {
        if(ValidaCampo()){
        Cadastro();
        }
        else{
        return false
        }


    });
});


function VarrerEmail(){
    for (var i = 0; i < tbUsuario.length; i++) {
        element = JSON.parse(tbUsuario[i]);
        console.log(element.email);
    }
}

function Excluir(){
	tbUsuario.splice(indice_selecionado, 1);
	localStorage.setItem("tbUsuario", JSON.stringify(tbUsuario));
	console.log("Registro excluído.");
}

function ExcluirTudo(){
	tbUsuario = [];
	localStorage.setItem("tbUsuario", JSON.stringify(tbUsuario));
	console.log("Registro excluído.");
}