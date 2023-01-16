var user;

function init() {
    getUserLogged();
    obterAreas();

    function verifyUser() {
        if (user) {
            var btn_menu_amigos = document.getElementById("btn_menu_amigos");
            var btn_menu_empresas = document.getElementById("btn_menu_empresas");
            var a_login = document.getElementById("a_login");
            var a_register = document.getElementById("a_register");

            switch (user[0].TipoUser_idTipoUser) {
                case 1:
                    break;
                case 2:
                    btn_menu_amigos.style.display = "inline";
                    break;
                case 3:
                    btn_menu_empresas.style.display = "inline";
                    break;
                default:
            }

            a_login.style.display = "none";
            a_register.style.display = "none";

            var div_header = document.getElementById("div_header");
            var linkPerfil = document.createElement("a");
            linkPerfil.textContent = user[0].nome;
            linkPerfil.className = "a_perfil";

            div_header.appendChild(linkPerfil);
        }
    }

    function obterAreas() {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr2 = new XMLHttpRequest();
        } else {
            xhr2 = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr2) {
            // Configurar a solicitação
            xhr2.open('GET', 'http://127.0.0.1:5502/areas', true);

            // Definir a função de retorno de chamada
            xhr2.onreadystatechange = function () {
                if ((xhr2.readyState === 4) && (xhr2.status === 200)) {
                    areas = JSON.parse(xhr2.responseText);

                    var select = document.getElementById("area");

                    for (var i = 0; i < areas.length; i++) {
                        select.options[select.options.length] = new Option(areas[i].descricao, areas[i].descricao);
                    }
                }
            };
        }

        // Enviar a solicitação
        xhr2.send();
    }

    //Vai buscar o user logado
    function getUserLogged() {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_userLogged = new XMLHttpRequest();
        } else {
            xhr_userLogged = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_userLogged) {
            // Configurar a solicitação
            xhr_userLogged.open('GET', 'http://127.0.0.1:5502/getUserLogged', true);

            // Definir a função de retorno de chamada
            xhr_userLogged.onreadystatechange = function () {
                if ((xhr_userLogged.readyState === 4) && (xhr_userLogged.status === 200)) {
                    user = JSON.parse(xhr_userLogged.responseText);
                    verifyUser();

                    document.getElementById("newOferta").onsubmit = function(evt){
                        
                        //console.log(user[0].Users_idUser);
                        novaOferta(user[0].Users_idUser);
                        //evt.preventDefault();
                    };
                }
            };
        }

        // Enviar a solicitação
        xhr_userLogged.send();
    }
}

//Inserir nova oferta na base de dados
function novaOferta(Users_idUser) {
    var area = document.getElementById("area");
    var duracao = document.getElementById("i_duracao").value;
    var renumeracao = document.getElementById("i_renumeracao").value;
    var descricao = document.getElementById("descr_func").value;

    if (parseInt(duracao) < 1) {
        alert("A duração não pode ser inferior a 1 mês!");
        return false;
    }

    if (parseInt(renumeracao) < 0) {
        alert("A renumeração não pode ser negativa!");
        return false;
    }

    if (descricao === "") {
        descricao = "Sem mais informações!";
    }

    area = area.selectedIndex;

    let info = {
        IdUser: Users_idUser,
        Validade: document.getElementById("i_validade").value,
        Duracao: duracao,
        Area: area + 1,
        Renumeracao: renumeracao,
        Descricao: descricao
    }

    console.log(info);

    var url = "/newOferta";

    var xhttp = new XMLHttpRequest();
    //Open first, before setting the request headers.
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert('Oferta criada');
            //Limpar as caixas de texto todas
            document.forms["newOferta"].reset();
            window.location.href = 'http://127.0.0.1:5502/pagina_ofertas_emprego.html';
        }
    };
    xhttp.send(JSON.stringify(info));
}

//Validar a data inserida 
function validarData() {
    // Obtém a data selecionada pelo usuário
    var dataSelecionada = new Date(document.getElementById("i_validade").value);
    // Obtém a data atual
    var dataAtual = new Date();
    // Compara as datas
    if (dataSelecionada < dataAtual) {
        alert("A data selecionada não pode ser inferior ao dia de hoje!");
        // Limpa o campo de data
        document.getElementById("i_validade").value = "";
    }
}



window.onload = init();