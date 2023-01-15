/**
 * Função chamada quando página é carregada
 */
function init() {
    var user;
    var experiencias;
    var cursos;
    var div_experiencias_scroll = document.getElementById("div_experiencias_scroll");
    var div_cursos_scroll = document.getElementById("div_cursos_scroll");

    getUserLogged();

    function inserirExperiencias() {
        deleteDivExperiencias();

        for(var elem of experiencias) {
            var div_experiencia = document.createElement("div");
            div_experiencia.className = "div_experiencia";

            var div_experiencia_left = document.createElement("div");
            div_experiencia_left.className = "div_experiencia_left";

            var p_experiencia = document.createElement("p");
            p_experiencia.className = "p_experiencia";
            p_experiencia.textContent = "t";

            var div_experiencia_right = document.createElement("div");
            div_experiencia_right.className = "div_experiencia_right";

            var div_experiencia_right_top = document.createElement("div");
            div_experiencia_right_top.className = "div_experiencia_right_top";

            var p_exp_right_top1 = document.createElement("p");
            p_exp_right_top1.className = "p_exp_right_top1";
            p_exp_right_top1.textContent = elem.cargo + " na " + elem.empresa;

            var p_exp_right_top2 = document.createElement("p");
            p_exp_right_top2.className = "p_exp_right_top2";
            if (elem.dataFim) {
                p_exp_right_top2.textContent = elem.dataInicio + " até " + elem.dataFim;
            }else{
                p_exp_right_top2.textContent = elem.dataInicio + " até Presente";
            }

            var p_exp_right_top3 = document.createElement("p");
            p_exp_right_top3.className = "p_exp_right_top3";
            p_exp_right_top3.textContent = elem.localizacao;

            div_experiencia_right_top.appendChild(p_exp_right_top1);
            div_experiencia_right_top.appendChild(p_exp_right_top2);
            div_experiencia_right.appendChild(div_experiencia_right_top);
            div_experiencia_right.appendChild(p_exp_right_top3);
            div_experiencia_left.appendChild(p_experiencia);
            div_experiencia.appendChild(div_experiencia_left);
            div_experiencia.appendChild(div_experiencia_right);
            div_experiencias_scroll.appendChild(div_experiencia);
            console.log(div_experiencia);
        }
    }

    function insertCursos() {
        deleteDivCursos();

        for(var elem of cursos) {
            var div_experiencia = document.createElement("div");
            div_experiencia.className = "div_experiencia";

            var div_experiencia_left = document.createElement("div");
            div_experiencia_left.className = "div_experiencia_left";

            var p_experiencia = document.createElement("p");
            p_experiencia.className = "p_experiencia";
            p_experiencia.textContent = "t";

            var div_experiencia_right = document.createElement("div");
            div_experiencia_right.className = "div_experiencia_right";

            var div_experiencia_right_top = document.createElement("div");
            div_experiencia_right_top.className = "div_experiencia_right_top";

            var p_exp_right_top1 = document.createElement("p");
            p_exp_right_top1.className = "p_exp_right_top1";
            p_exp_right_top1.textContent = elem.cargo + " na " + elem.empresa;

            var p_exp_right_top2 = document.createElement("p");
            p_exp_right_top2.className = "p_exp_right_top2";
            if (elem.dataFim) {
                p_exp_right_top2.textContent = elem.dataInicio + " até " + elem.dataFim;
            }else{
                p_exp_right_top2.textContent = elem.dataInicio + " até Presente";
            }

            var p_exp_right_top3 = document.createElement("p");
            p_exp_right_top3.className = "p_exp_right_top3";
            p_exp_right_top3.textContent = elem.localizacao;

            div_experiencia_right_top.appendChild(p_exp_right_top1);
            div_experiencia_right_top.appendChild(p_exp_right_top2);
            div_experiencia_right.appendChild(div_experiencia_right_top);
            div_experiencia_right.appendChild(p_exp_right_top3);
            div_experiencia_left.appendChild(p_experiencia);
            div_experiencia.appendChild(div_experiencia_left);
            div_experiencia.appendChild(div_experiencia_right);
            div_cursos_scroll.appendChild(div_experiencia);
            console.log(div_experiencia);
        }
    }

    function deleteDivExperiencias() {
        while (div_experiencias_scroll.firstChild) {
            div_experiencias_scroll.removeChild(div_experiencias_scroll.firstChild);
        }
    }

    function deleteDivCursos() {
        while (div_cursos_scroll.firstChild) {
            div_cursos_scroll.removeChild(div_cursos_scroll.firstChild);
        }
    }

    function verifyUser() {
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

            div_header.appendChild(linkPerfil);
        }
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
                    verifyUser();
                }
            };
        }

        // Enviar a solicitação
        xhr_userLogged.send();
    }
}

window.onload = init;