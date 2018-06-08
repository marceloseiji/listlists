// Declarando as variaveis globais.
var nome = $("#txtNome").val();
var email = $("#txtEmail").val();
var senha = $("#txtSenha").val();
var confirmarSenha = $("#txtConfirmarSenha").val();
// Vetor que armazena os objetos
var indice_selecionado = -1; //Índice do item selecionado na lista
var tbUsuario = localStorage.getItem("tbUsuario");// Recupera os dados armazenados
tbUsuario = JSON.parse(tbUsuario); // Converte string para objeto
if (tbUsuario == null) // Caso não haja conteúdo, iniciamos um vetor vazio
    tbUsuario = [];



function isNumber(el) {
    var reg = /[0-9]+/;
    if (reg.exec(el)) {
        return true;
    }
    return false;
}

function valEmail(field) {
    debugger;
    usuario = field.value.substring(0, field.value.indexOf("@"));
    dominio = field.value.substring(field.value.indexOf("@") + 1, field.value.length);

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        return true
    }
    else {
        return false;
    }
}
$(document).ready(function () {
    $('#txtNome').on('change', function () {
        var textoValida = $('#txtNome').val();
        if (!isNumber(textoValida) && textoValida.length > 2) {
            $("#txtNome").css("border-color", "green");
            $("#avisoNome").css("color", "green").text("CAMPO PREENCHIDO CORRETAMENTE");
        } else {
            $("#txtNome").focus().css("border-color", "red");
            $("#avisoNome").css("color", "red").text("NOME NÃO CORRESPONDE COM O ESPERADO");
        }
    });

    $('#txtEmail').on('change', function () {
        var textoValida = $('#txtEmail').val();
        if (valEmail(textoValida)) {
            $("#txtEmail").css("border-color", "green");
            $("#avisoEmail").css("color", "green").text("CAMPO PREENCHIDO CORRETAMENTE");
        } else {
            $("#txtEmail").focus().css("border-color", "red");
            $("#avisoEmail").css("color", "red").text("NOME NÃO CORRESPONDE COM O ESPERADO");
        }
    });
});



// Funções validação de campos
function ValiCadNome() {
    if (nome != "" && nome.length > 2 && isNaN(nome)) {
        $("#txtNome").css("border-color", "green");
        $("#avisoNome").css("color", "green").text("CAMPO PREENCHIDO CORRETAMENTE");

    } else {
        $("#txtNome").focus().css("border-color", "red");
        $("#avisoNome").css("color", "red").text("NOME NÃO CORRESPONDE COM O ESPERADO");
    }

}

function ValiCadEmail() {

}

function ValiCadSenha() {

}

function ValiCadConfSenha() {

}
function ValidaCampo() {
    // Campo NOME 
    if (nome != "" && nome.length > 2 && isNaN(nome)) {
        $("#txtNome").css("border-color", "green");
        $("#avisoNome").css("color", "green").text("CAMPO PREENCHIDO CORRETAMENTE");
        return true;
    } else {
        $("#txtNome").focus().css("border-color", "red");
        $("#avisoNome").css("color", "red").text("NOME NÃO CORRESPONDE COM O ESPERADO");
        return false;
    }

    // Campo EMAIL
    if (email != "" && email.length > 2 && isNaN(email)) {
        $("#txtEmail").css("border-color", "green");
        $("#avisoEmail").css("color", "green").text("CAMPO PREENCHIDO CORRETAMENTE");
    } else {
        $("#txtEmail").focus().css("border-color", "red");
        $("#avisoEmail").css("color", "red").text("NOME NÃO CORRESPONDE COM O ESPERADO");
    }

    // Verificar se já existe esse email cadastrado 
    if (!VarrerEmail(email)) {
        $("#txtEmail").focus().css("border-color", "red");
        $("#avisoEmail").css("color", "red").text("Email já cadastrado. Escolha outro.");
    } else {
        $("#txtEmail").css("border-color", "green");
        $("#avisoEmail").css("color", "green").text("Email válido.");
    }

    // Campo SENHA
    if (senha != "" && senha.length > 2 && isNaN(senha)) {
        $("#txtSenha").css("border-color", "green");
        $("#avisoSenha").css("color", "green").text("CAMPO PREENCHIDO CORRETAMENTE");
    } else {
        $("#txtSenha").focus().css("border-color", "red");
        $("#avisoSenha").css("color", "red").text("NOME NÃO CORRESPONDE COM O ESPERADO");
    }

    // Campo CONFIRMAR SENHA
    if (confirmarSenha != "" && confirmarSenha.length > 2 && isNaN(confirmarSenha)) {
        $("#txtConfirmarSenha").css("border-color", "green");
        $("#avisoConfirmarSenha").css("color", "green").text("CAMPO PREENCHIDO CORRETAMENTE");
    } else {
        $("#txtConfirmarSenha").focus().css("border-color", "red");
        $("#avisoConfirmarSenha").css("color", "red").text("NOME NÃO CORRESPONDE COM O ESPERADO");
    }
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
}

// Chamando o Botão de cadastro
$(document).ready(function () {
    $("#btnCadastrar").click(function () {
        Cadastro();

    });
});

// Varrer email para verificar se o meso já existe
function VarrerEmail(emailParaVerificar) {
    for (var i = 0; i < tbUsuario.length; i++) {
        element = JSON.parse(tbUsuario[i]);
        //console.log(element.email);

        //console.log(emailParaVerificar);
        var verificarEmail = element.email;
        if (verificarEmail == emailParaVerificar) {
            return false;
        } else { }
    }
}

// Função Exluir para ser utilizada pelo console -> function Excluir(colocar o nº do indice)
function Excluir(n) {
    tbUsuario.splice(indice_selecionado, n);
    localStorage.setItem("tbUsuario", JSON.stringify(tbUsuario));
    console.log("Usuário " + n + " excluído.");
}

// Função para deletear e limpar o local storage. Usar pelo console -> function ExcluirTudo() 
function ExcluirTudo() {
    tbUsuario = [];
    localStorage.setItem("tbUsuario", JSON.stringify(tbUsuario));
    console.log("Tabela de usuários excluídas.");
}