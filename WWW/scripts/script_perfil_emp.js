/**
 * Função chamada quando página é carregada
 */
function init() {
    var user;
    var infoEmp;

    getUserLogged();



    function verifyUser() {
        console.log(user);
        if (user) {
            var btn_menu_amigos = document.getElementById("btn_menu_amigos");
            var btn_menu_empresas = document.getElementById("btn_menu_empresas");
            var a_login = document.getElementById("a_login");
            var a_register = document.getElementById("a_register");
            
            switch(user[0].TipoUser_idTipoUser) {
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
            linkPerfil.textContent =  user[0].nome;
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

            var btn_menu_terminar_sessao = document.getElementById("btn_menu_terminar_sessao");
            btn_menu_terminar_sessao.addEventListener("click", function() {
                getLogOut();
            });
            if (user[0].TipoUser_idTipoUser === 1) {
                btn_menu_terminar_sessao.style.marginLeft = "32.5%";
            }else if(user[0].TipoUser_idTipoUser === 3){
                btn_menu_terminar_sessao.style.marginLeft = "26.5%";
            }

            var idUser = sessionStorage.getItem("Users_idUser");
            if(user[0].Users_idUser != idUser) {
                btn_menu_terminar_sessao.style.display = "none";
            }
        }
    }

    function getLogOut() {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_logOut = new XMLHttpRequest();
        } else {
            xhr_logOut = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_logOut) {
            // Configurar a solicitação
            xhr_logOut.open('GET', 'http://127.0.0.1:5502/logOut', true);

            // Definir a função de retorno de chamada
            xhr_logOut.onreadystatechange = function () {
                if ((xhr_logOut.readyState === 4) && (xhr_logOut.status === 200)) {
                    window.location.href = "http://127.0.0.1:5502/pagina_inicial.html";
                }
            };
        }

        // Enviar a solicitação
        xhr_logOut.send();
    }

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

                    var perfilUser = sessionStorage.getItem("Users_idUser");
                    var perfilUserTipo = sessionStorage.getItem("TipoUsers_idUser");
                    verifyUser();
                    obterInfoUserEmp();

                }else if(xhr_userLogged.status === 401){
                    var btn_menu_terminar_sessao = document.getElementById("btn_menu_terminar_sessao");
                    btn_menu_terminar_sessao.style.display = "none";
                }
            };
        }

        // Enviar a solicitação
        xhr_userLogged.send();
    }

    function obterInfoUserEmp(){
        var url = "/userEmp/" + sessionStorage.getItem("Users_idUser"); 

        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_infoemp = new XMLHttpRequest();
        } else {
            xhr_infoemp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_infoemp) {
            // Configurar a solicitação
            xhr_infoemp.open('GET', url, true);

            // Definir a função de retorno de chamada
            xhr_infoemp.onreadystatechange = function () {
                if ((xhr_infoemp.readyState === 4) && (xhr_infoemp.status === 200)) {
                    infoEmp = JSON.parse(xhr_infoemp.responseText);
                    console.log(infoEmp);
                    inserirInfoEmp();
                }
            };
        }

        // Enviar a solicitação
        xhr_infoemp.send();
    }

    function inserirInfoEmp(){
        var adesao = new Date(infoEmp[0].dataAdesao);

        document.getElementById("input_descricao").placeholder = infoEmp[0].descricao;
        document.getElementById("input_nome").placeholder = infoEmp[0].nomeEmpresa;
        document.getElementById("input_localizacao").placeholder = infoEmp[0].localidade;
        document.getElementById("label_adesao").textContent = "Aderiu a " + adesao.getDate() + "/" + adesao.getMonth()+1 + "/" + adesao.getFullYear();
        
    }
}

window.onload = init;