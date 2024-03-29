function init() {
    var user;

    getUserLogged();

    /**
    * Função que verifica o user logado e aplica regras para objetos do ecrã 
    */
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

    /**
    * Função responsável por obter as informações do user que está com login efetuado
    */
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

                    document.getElementById("newExperience").onsubmit = function(evt){
                        //alert(user[0].Users_idUser);
                        newExperience(user[0].Users_idUser);
                        evt.preventDefault();
                    };

                    document.getElementById("newDegree").onsubmit = function(evt){
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

/**
* Função para criar uma nova experiência na base de dados
*/
function newExperience(Users_idUser) {
    var dataFim = document.getElementById("i_fim").value;

    if(dataFim ===""){
        dataFim = "9999-12-31";
    }

    let info = {
        IDUser: Users_idUser, 
        Cargo: document.getElementById("i_cargo").value,
        Empresa: document.getElementById("i_empresa").value,
        URLLogo: document.getElementById("i_logoempresa").value,
        Localizacao: document.getElementById("i_localizacao").value,
        DataInicio: document.getElementById("i_inicio").value,
        DataFim: dataFim,
        Descricao: document.getElementById("descr_func").value
    }

    var url = "/newExperience";

    var xhttp = new XMLHttpRequest();
    //Open first, before setting the request headers.
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert('Experiencia criada');
            //Limpar as caixas de texto todas
            document.forms["newExperience"].reset();
            sessionStorage.setItem("Users_idUser", user[0].Users_idUser);
            sessionStorage.setItem("TipoUsers_idUser", 1);
            window.location.href = 'http://127.0.0.1:5502/pagina_perfil_pro.html';
        }
    };
    xhttp.send(JSON.stringify(info));
}

window.onload = init();