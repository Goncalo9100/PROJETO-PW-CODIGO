function init() {
    var user;

    getUserLogged();

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
            linkPerfil.addEventListener("click", function (evt) {
                sessionStorage.setItem("Users_idUser", user[0].Users_idUser);
                sessionStorage.setItem("TipoUsers_idUser", user[0].TipoUser_idTipoUser);
                switch(user[0].TipoUser_idTipoUser) {
                    case 1:
                        window.location.href = "http://127.0.0.1:5502/pagina_perfil_emp.html";
                        break;
                    case 2:
                        window.location.href = "http://127.0.0.1:5502/pagina_perfil_pro.html";
                        break;
                    case 3:
                        window.location.href = "http://127.0.0.1:5502/pagina_perfil_emp.html";
                        break;
                    default:
                }
            });

            div_header.appendChild(linkPerfil);
        }
    }

    //Vai buscar o user logado
    function getUserLogged() {

        console.log("teste");
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

                    document.getElementById("newDegree").onsubmit = function (evt) {
                        //console.log(user[0].Users_idUser);
                        newDegree(user[0].Users_idUser);
                        evt.preventDefault();
                    };
                }
            };
        }

        // Enviar a solicitação
        xhr_userLogged.send();
    }
}

function newDegree(Users_idUser) {
    var tipo = document.getElementById("tipocurso");
    var dataFim = document.getElementById("i_fim").value;

    if(dataFim ===""){
        dataFim = "9999-12-31";
    }

    let info = {
        //@TODO Validações às datas de inicio e fim
        IDUser: Users_idUser, //Este user é o que está na tabela de profissionais e não na dos users
        Curso: document.getElementById("i_curso").value,
        Estab: document.getElementById("i_estab").value,
        TipoCurso: tipo.options[tipo.selectedIndex].text,
        Media: document.getElementById("i_media").value,
        DataInicio: document.getElementById("i_inicio").value,
        DataFim: dataFim
    }

    var url = "/newDegree";

    var xhttp2 = new XMLHttpRequest();
    //Open first, before setting the request headers.
    xhttp2.open("POST", url, true);
    xhttp2.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Curso criado');
            //Limpar as caixas de texto todas
            document.forms["newDegree"].reset();
            sessionStorage.setItem("Users_idUser", user[0].Users_idUser);
            sessionStorage.setItem("TipoUsers_idUser", 1);
            window.location.href = 'http://127.0.0.1:5502/pagina_perfil_pro.html';
        }
    };
    xhttp2.send(JSON.stringify(info));
}



function validarInicio() {
    // Obtém a data selecionada pelo user
    var dataSelecionada = new Date(document.getElementById("i_inicio").value);
    // Obtém a data atual
    var dataAtual = new Date();
    // Compara as datas
    if (dataSelecionada > dataAtual) {
        alert("A data de inicio não pode ser superior ao dia de hoje!");
        // Limpa o campo de data
        document.getElementById("i_inicio").value = "";
    }
}


function validarFim() {
    // Obtém a data selecionada pelo user
    var dataSelecionada = new Date(document.getElementById("i_fim").value);
    // Obtém a data inserida no campo de inicio
    var dataInicio = new Date(document.getElementById("i_inicio").value);

    if (dataSelecionada < dataInicio){
        alert("A data de fim não pode ser inferior à data de inicio!");
        // Limpa o campo de data
        document.getElementById("i_fim").value = "";
    }

}


window.onload = init();