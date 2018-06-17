// Declarando as variaveis globais.
//#region 
// Variaveis para armazenar true ou false dos campos de cadastro
var contNome;
var contEmail;
var contSenha;
var contConfirmarSenha;
// Vetor que armazena os objetos
var indice_selecionado = -1; //Índice do item selecionado na lista
var tbUsuario = localStorage.getItem("tbUsuario");// Recupera os dados armazenados
tbUsuario = JSON.parse(tbUsuario); // Converte string para objeto
if (tbUsuario == null) // Caso não haja conteúdo, iniciamos um vetor vazio
    tbUsuario = [];

// Variaveis para salvar o nome de quem logar no localstorage
var nomeUsuH1 = "";
var tbNome = localStorage.getItem("tbNome");// Recupera os dados armazenados
tbNome = JSON.parse(tbNome); // Converte string para objeto
if (tbNome == null) // Caso não haja conteúdo, iniciamos um vetor vazio
    tbNome = [];
//#endregion

// Funções de Validação de Campos
//#region 
// Função para válidar o campo nome
function isNumber(el) {
    var reg = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/;
    if (reg.test(el)) {
        return true;
    }
    return false;
}

// Função para validar o campo email
function checkMail(mail) {
    var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    if (typeof (mail) == "string") {
        if (er.test(mail)) {
            return true;
        }
    } else if (typeof (mail) == "object") {
        if (er.test(mail.value)) {
            return true;
        }
    } else {
        return false;
    }
}

$(document).ready(function () {
    // Valida Campo Nome
    $('#txtNome').on('change', function () {
        var textoValida = $('#txtNome').val();
        if (isNumber(textoValida) && textoValida.length > 2) {
            $("#txtNome").css("border-bottom", "solid 3px green");
            $("#avisoNome").css("color", "green").text("CAMPO PREENCHIDO CORRETAMENTE");
            contNome = true;
        } else {
            $("#txtNome").focus().css("border-bottom", "solid 3px red");
            $("#avisoNome").css("color", "red").text("APENAS LETRAS");
            contNome = false;
        }
    });

    // Valida Campo Email
    $('#txtEmail').on('change', function () {
        var textoValida = $('#txtEmail').val();

        if (checkMail(textoValida)) {
            $("#txtEmail").css("border-bottom", "solid 3px green");
            $("#avisoEmail").css("color", "green").text("CAMPO PREENCHIDO CORRETAMENTE");

            if (VarrerEmail(textoValida) === false) {
                $("#txtEmail").focus().css("border-bottom", "solid 3px red");
                $("#avisoEmail").css("color", "red").text("EMAIL JÁ CADASTRADO");
                contEmail = false;
            } else {
                $("#txtEmail").css("border-bottom", "solid 3px green");
                $("#avisoEmail").css("color", "green").text("E-MAIL VÁLIDO");
                contEmail = true;

            }

        } else {
            $("#txtEmail").focus().css("border-bottom", "solid 3px red");
            $("#avisoEmail").css("color", "red").text("E-MAIL IVÁLIDO");
            contEmail = false;
        }
    });

    // Valida Campo Senha
    $('#txtSenha').on('change', function () {
        var textoValida = $('#txtSenha').val();
        if (textoValida.length >= 4 && textoValida.length <= 8) {
            $("#txtSenha").css("border-bottom", "solid 3px green");
            $("#avisoSenha").css("color", "green").text("CAMPO PREENCHIDO CORRETAMENTE");
            contSenha = true;
        } else {
            $("#txtSenha").focus().css("border-bottom", "solid 3px red");
            $("#avisoSenha").css("color", "red").text("SENHA TEM QUE TER DE 4 À 8 DIGITOS");
            contSenha = false;
        }
    });

    // Valida Campo Confirmar Senha
    $('#txtConfirmarSenha').on('change', function () {
        var textoValidaUm = $('#txtSenha').val();
        var textoValidaDois = $('#txtConfirmarSenha').val();
        if (textoValidaUm == textoValidaDois) {
            $("#txtConfirmarSenha").css("border-bottom", "solid 3px green");
            $("#avisoConfirmarSenha").css("color", "green").text("CAMPO PREENCHIDO CORRETAMENTE");
            contConfirmarSenha = true;
        } else {
            $("#txtConfirmarSenha").focus().css("border-bottom", "solid 3px red");
            $("#avisoConfirmarSenha").css("color", "red").text("SENHAS NÃO CONFEREM");
            contConfirmarSenha = false;
        }
    });
});
//#endregion

// Métodos
//#region 

// Função para Mostrar o nome da pessoa logada
function NomeH1() {
    var i = 0;
    element = JSON.parse(tbNome[i]);
    $("#txtH1").text(element.nome);
}  

// Função Cadastrar Usuario
function Cadastro() {

    // Objeto Usuario
    usuario = JSON.stringify({ 
        nome: $("#txtNome").val(),
        email: $("#txtEmail").val(),
        senha: $("#txtSenha").val(),
        listaMae: { 
            nome: 'Ernsp',
            item:'osjofjsd',
            quantidade:'osidhfosd',
            valor:'76767'
        }
    });
    // Armazenando o objeto na última posição do array
    tbUsuario.push(usuario);
    localStorage.setItem("tbUsuario", JSON.stringify(tbUsuario));
}

// Função para excluir nomes no localstorage
function ExcluirTudoNome() {
    tbNome = [];
    localStorage.setItem("tbNome", JSON.stringify(tbNome));
}

// Função para incluir nomes no localstorage
function GravarNome(nomeUsuario) {

    ExcluirTudoNome()

    usuario = JSON.stringify({
        nome: nomeUsuario
    });
    // Armazenando o objeto na última posição do array
    tbNome.push(usuario);
    localStorage.setItem("tbNome", JSON.stringify(tbNome));
}

// Varrer Email e senha para logar
function Logar(emailParaVerificar, senhaParaVerificar) {

    for (var i = 0; i < tbUsuario.length; i++) {
        element = JSON.parse(tbUsuario[i]);
        var verificarEmail = element.email;
        var verificarSenha = element.senha;
        if (verificarEmail == emailParaVerificar) {
            if (verificarSenha == senhaParaVerificar) {
                GravarNome(element.nome);
                return true;
            } else {
                return false;
            }
        } else {

        }
    }
}


// Salvar Obj Session
function SalvarObjetoSession(emailParaVerificar, senhaParaVerificar) {
    debugger;
    for (var i = 0; i < tbUsuario.length; i++) {
        element = JSON.parse(tbUsuario[i]);
        var verificarEmail = element.email;
        var verificarSenha = element.senha;
        if (verificarEmail == emailParaVerificar) {
            if (verificarSenha == senhaParaVerificar) {


                tbLista = [];
                sessionStorage.setItem("tbLista", JSON.stringify(tbLista));

                usuario = JSON.stringify({
                    nome: element.nome,
                    email: element.email,
                    listaMae: element.listaMae
                });

                tbLista.push(usuario);
                sessionStorage.setItem("tbLista", JSON.stringify(tbLista));
                return true;
            } else {
                return false;
            }
        } else {

        }
    }
}



// Varrer email para verificar se o meso já existe
function VarrerEmailLogar(emailParaVerificar, senhaParaVerificar) {
    debugger;
    for (var i = 0; i < tbUsuario.length; i++) {
        element = JSON.parse(tbUsuario[i]);
        var verificarEmail = element.email;
        var verificarSenha = element.senha;
        if (verificarEmail == emailParaVerificar) {
            if (verificarSenha == senhaParaVerificar) {

                tbLista = [];
                sessionStorage.setItem("tbLista", JSON.stringify(tbLista));

                usuario = JSON.stringify({
                    nome: element.nome,
                    email: element.email,
                    listaMae: element.listaMae
                });

                tbLista.push(usuario);
                sessionStorage.setItem("tbLista", JSON.stringify(tbLista));
                return true;
            } else {
                return false;
            }
        } else {

        }
    }
}


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

//#endregion

// Chamando os Botões
//#region 
// Chamando o Botão de LOGIN
$(document).ready(function () {
    $("#btnLogar").click(function () {
        var emailLog = $('#txtEmailLog').val();
        var senhaLog = $('#txtSenhaLog').val();
        if (Logar(emailLog, senhaLog)) {
            alert("Bem Vindo!");
            SalvarObjetoSession(emailLog, senhaLog);
            window.location.replace("paginaacesso.html");
        } else {
            alert("Email ou senha incorreto!");
        }
    });
});

// Chamando o Botão de cadastro
$(document).ready(function () {
    $("#btnCadastrar").click(function () {
        if (contNome && contEmail && contSenha && contConfirmarSenha) {
            Cadastro();
            alert("Cadastro realizado com Sucesso!");
        } else {
            alert("Cadastro não realizado.\nVerefique os campos!");
        }
    });
});

//#endregion


// Funções para serem utilizadas no Console
//#region 
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

//#endregion