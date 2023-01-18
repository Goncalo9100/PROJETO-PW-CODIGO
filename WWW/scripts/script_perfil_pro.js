/**
 * Função chamada quando página é carregada
 */
function init() {
    var user;
    var experiencias;
    var infoUser;
    var cursos;
    var div_experiencias_scroll = document.getElementById("div_experiencias_scroll");
    var div_cursos_scroll = document.getElementById("div_cursos_scroll");

    getUserLogged();

    function inserirExperiencias() {
        deleteDivExperiencias();

        for (var elem of experiencias) {
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
                var datFim = new Date(elem.dataFim);
                var datInicio = new Date(elem.dataInicio);
                var fimString;
                var iniString;
                if (datFim.getFullYear() == '9999') {
                    fimString = "Presente";
                } else {
                    fimString = datFim.getMonth() + 1 + "/" + datFim.getFullYear();
                }

                iniString = datInicio.getMonth() + 1 + "/" + datInicio.getFullYear();

                p_exp_right_top2.textContent = iniString + " até " + fimString;
            } else {
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
        }
    }

    function insertCursos() {
        deleteDivCursos();

        for (var elem of cursos) {
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
            p_exp_right_top1.textContent = elem.curso + " em " + elem.estabelEnsino;

            var p_exp_right_top2 = document.createElement("p");
            p_exp_right_top2.className = "p_exp_right_top2";
            if (elem.dataFim) {
                var datFim = new Date(elem.dataFim);
                var datInicio = new Date(elem.dataInicio);
                var fimString;
                var iniString;
                if (datFim.getFullYear() == '9999') {
                    fimString = "Presente";
                } else {
                    fimString = datFim.getMonth() + 1 + "/" + datFim.getFullYear();
                }

                iniString = datInicio.getMonth() + 1 + "/" + datInicio.getFullYear();

                p_exp_right_top2.textContent = iniString + " até " + fimString;
            } else {
                p_exp_right_top2.textContent = elem.dataInicio + " até Presente";
            }

            var p_exp_right_top3 = document.createElement("p");
            p_exp_right_top3.className = "p_exp_right_top3";
            p_exp_right_top3.textContent = elem.tipoCurso;

            div_experiencia_right_top.appendChild(p_exp_right_top1);
            div_experiencia_right_top.appendChild(p_exp_right_top2);
            div_experiencia_right.appendChild(div_experiencia_right_top);
            div_experiencia_right.appendChild(p_exp_right_top3);
            div_experiencia_left.appendChild(p_experiencia);
            div_experiencia.appendChild(div_experiencia_left);
            div_experiencia.appendChild(div_experiencia_right);
            div_cursos_scroll.appendChild(div_experiencia);
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
            linkPerfil.id = "a_user";
            linkPerfil.textContent = user[0].nome;
            linkPerfil.className = "a_perfil";
            linkPerfil.addEventListener("click", function (evt) {
                sessionStorage.setItem("Users_idUser", user[0].Users_idUser);
                sessionStorage.setItem("TipoUsers_idUser", user[0].TipoUser_idTipoUser);
                switch (user[0].TipoUser_idTipoUser) {
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

            var idUser = sessionStorage.getItem("Users_idUser");
            var img_editar = document.getElementById("img_editar");
            var img_save = document.getElementById("img_save");
            var btn_menu_terminar_sessao = document.getElementById("btn_menu_terminar_sessao");
            btn_menu_terminar_sessao.addEventListener("click", function () {
                getLogOut();
            });
            if (user[0].Users_idUser != idUser) {
                btn_menu_terminar_sessao.style.display = "none";
                img_editar.style.display = "none";
                document.getElementById("img_editar_info_left").style.display = "none";
                document.getElementById("img_editar_info_right").style.display = "none";

                //Pedido à base de dados para ver se é amigo
                confirmarAmizade();
            }


            img_editar.addEventListener("click", function () {

                img_editar.style.display = "none";
                img_save.style.display = "inline";

                const input_nome = document.getElementById('input_nome');
                input_nome.removeAttribute('disabled');
                input_nome.style.border = "solid black";

                const input_descricao = document.getElementById('input_descricao');
                input_descricao.removeAttribute('disabled');
                input_descricao.style.border = "solid black";

                const input_localidade = document.getElementById('input_localidade');
                input_localidade.removeAttribute('disabled');
                input_localidade.style.border = "solid black";
            });

            img_save.addEventListener("click", function () {

                atualizarUser();

                img_editar.style.display = "inline";
                img_save.style.display = "none";

                const input_nome = document.getElementById('input_nome');
                input_nome.setAttribute('disabled', "");
                input_nome.style.border = "none";

                const input_descricao = document.getElementById('input_descricao');
                input_descricao.setAttribute('disabled', "");
                input_descricao.style.border = "none";

                const input_localidade = document.getElementById('input_localidade');
                input_localidade.setAttribute('disabled', "");
                input_localidade.style.border = "none";
            });
        }
    }

    function confirmarAmizade() { 
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_confami = new XMLHttpRequest();
        } else {
            xhr_confami = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_confami) {
            let url = "http://127.0.0.1:5502/confirmAmizade/" + sessionStorage.getItem("Users_idUser");
            // Configurar a solicitação
            xhr_confami.open('GET', url, true);

            // Definir a função de retorno de chamada
            xhr_confami.onreadystatechange = function () {
                if ((xhr_confami.readyState === 4) && (xhr_confami.status !== 200)) {
                    var btnAmizade = document.getElementById("enviarPedido");
                    btnAmizade.style.display = "inline";
                    btnAmizade.addEventListener("click", function () {
                        criarPedidoAmizade();
                    });
                } else if ((xhr_confami.readyState === 4) && (xhr_confami.status === 200)) {
                    console.log(xhr_confami.status);
                }
            };
        }

        // Enviar a solicitação
        xhr_confami.send();
    }

    function criarPedidoAmizade() {
        var url = "/enviarPedidoAmizade/" + sessionStorage.getItem("Users_idUser");

        var xhttp_pedidoEnviar = new XMLHttpRequest();
        //Open first, before setting the request headers.
        xhttp_pedidoEnviar.open("POST", url, true);
        xhttp_pedidoEnviar.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhttp_pedidoEnviar.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert('Pedido Enviado');
                document.getElementById("enviarPedido").style.display = "none";
                //Dar refresh à pagina
                //document.location.reload(true);
            }
        }
        xhttp_pedidoEnviar.send();
    }

    function atualizarUser() {
        var xhr_atualizarUser;

        let info = {
            Users_idUser: sessionStorage.getItem("Users_idUser"),
            Nome: "",
            Descricao: "",
            Localidade: ""
        }

        if (document.getElementById('input_nome').value) {
            info.Nome = document.getElementById('input_nome').value;
        } else {
            info.Nome = document.getElementById('input_nome').placeholder;
        }

        if (document.getElementById('input_descricao').value) {
            info.Descricao = document.getElementById('input_descricao').value;
        } else {
            info.Descricao = document.getElementById('input_descricao').placeholder;
        }

        if (document.getElementById('input_localidade').value) {
            info.Localidade = document.getElementById('input_localidade').value;
        } else {
            info.Localidade = document.getElementById('input_localidade').placeholder;
        }

        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_atualizarUser = new XMLHttpRequest();
        } else {
            xhr_atualizarUser = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var url = "http://127.0.0.1:5502/atualizarProf/" + info.Nome + "/" + info.Descricao + "/" + info.Localidade + "/" + info.Users_idUser;

        if (xhr_atualizarUser) {
            // Configurar a solicitação
            xhr_atualizarUser.open('PATCH', url, true);

            // Definir a função de retorno de chamada
            xhr_atualizarUser.onreadystatechange = function () {
                if ((xhr_atualizarUser.readyState === 4) && (xhr_atualizarUser.status === 200)) {
                    document.getElementById('input_nome').value = "";
                    document.getElementById('input_descricao').value = "";
                    document.getElementById('input_localidade').value = "";
                    document.getElementById("a_user").textContent = info.Nome;
                    obterInfoUserPro();
                }
            };
        }

        // Enviar a solicitação
        xhr_atualizarUser.send();
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

    function obterInfoUserPro() {
        var url = "/userPro/" + sessionStorage.getItem("Users_idUser");

        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_infopro = new XMLHttpRequest();
        } else {
            xhr_infopro = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_infopro) {
            // Configurar a solicitação
            xhr_infopro.open('GET', url, true);

            // Definir a função de retorno de chamada
            xhr_infopro.onreadystatechange = function () {
                if ((xhr_infopro.readyState === 4) && (xhr_infopro.status === 200)) {
                    infoUser = JSON.parse(xhr_infopro.responseText);
                    console.log(infoUser);
                    inserirInfoUser();
                }
            };
        }

        // Enviar a solicitação
        xhr_infopro.send();
    }

    function inserirInfoUser() {
        var adesao = new Date(infoUser[0].dataAdesao);

        document.getElementById("input_descricao").placeholder = infoUser[0].descricao;
        document.getElementById("input_nome").placeholder = infoUser[0].nome;
        document.getElementById("input_localidade").placeholder = infoUser[0].localidade;
        document.getElementById("label_adesao").textContent = "Aderiu a " + adesao.getDate() + "/" + adesao.getMonth() + 1 + "/" + adesao.getFullYear();

    }

    function obterExperiencias() {
        var url = "/experiencias/" + sessionStorage.getItem("Users_idUser");

        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_exp = new XMLHttpRequest();
        } else {
            xhr_exp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_exp) {
            // Configurar a solicitação
            xhr_exp.open('GET', url, true);

            // Definir a função de retorno de chamada
            xhr_exp.onreadystatechange = function () {
                if ((xhr_exp.readyState === 4) && (xhr_exp.status === 200)) {
                    experiencias = JSON.parse(xhr_exp.responseText);
                    inserirExperiencias();
                }
            };
        }

        // Enviar a solicitação
        xhr_exp.send();
    }

    function obterCursos() {
        var url = "/cursos/" + sessionStorage.getItem("Users_idUser");

        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_curso = new XMLHttpRequest();
        } else {
            xhr_curso = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_curso) {
            // Configurar a solicitação
            xhr_curso.open('GET', url, true);

            // Definir a função de retorno de chamada
            xhr_curso.onreadystatechange = function () {
                if ((xhr_curso.readyState === 4) && (xhr_curso.status === 200)) {
                    cursos = JSON.parse(xhr_curso.responseText);
                    insertCursos();
                }
            };
        }

        // Enviar a solicitação
        xhr_curso.send();
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
                    obterInfoUserPro();
                    obterExperiencias();
                    obterCursos();

                }
            };
        }

        // Enviar a solicitação
        xhr_userLogged.send();
    }
}

window.onload = init;