/**
 * Função chamada quando página é carregada
 */
function init() {
    var user;
    var pedidosAmizade;
    var amigos;
    var divPedidos = document.getElementById("div_pedidos_scroll");
    var divAmigos = document.getElementById("div_amigos_scroll");

    getUserLogged();

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

    function insertPedidos() {
        deleteDivPedidos();

        for(var elem of pedidosAmizade) {
            var div_pedido = document.createElement("div"); //div com toda a info do pedido
            div_pedido.className = "div_pedido";

            var div_pedido_row = document.createElement("div"); //div com informação em linha
            div_pedido_row.className = "div_pedido_row";

            var div_imagem = document.createElement("div"); //Div com imagem do user
            div_imagem.className = "div_pedido_img";
            var img = document.createElement("img");
            img.className = "img_pedido";
            img.src = "imagens/person_icon.png";
            div_imagem.appendChild(img);

            var h1_nome = document.createElement("h1");
            h1_nome.textContent = elem.nome;
            h1_nome.id = elem.idSoliciador;
            h1_nome.addEventListener("click", function (evt) {
                sessionStorage.setItem("Users_idUser", evt.target.id);
                sessionStorage.setItem("TipoUsers_idUser", 1);
                window.location.href = "http://127.0.0.1:5502/pagina_perfil_pro.html";
            });
            h1_nome.className = "h1_nome_pedido";

            var btn_aceitar = document.createElement("button");
            btn_aceitar.className = "btn_aceitar";
            btn_aceitar.textContent = "Aceitar";
            btn_aceitar.addEventListener("click", function () { aceitarPedido(elem.idPedidosAmizade); } );

            var btn_rejeitar = document.createElement("button");
            btn_rejeitar.className = "btn_rejeitar";
            btn_rejeitar.textContent = "Rejeitar";
            btn_rejeitar.addEventListener("click", function () { rejeitarPedido(elem.idPedidosAmizade); } );

            var hr = document.createElement("hr");
            hr.className = "hr_pedido";

            div_pedido_row.appendChild(div_imagem);
            div_pedido_row.appendChild(h1_nome);
            div_pedido_row.appendChild(btn_aceitar);
            div_pedido_row.appendChild(btn_rejeitar);
            div_pedido.appendChild(div_pedido_row);
            div_pedido.appendChild(hr);
            divPedidos.appendChild(div_pedido);
        }
        
    }

    function deleteDivPedidos() {
        while (divPedidos.firstChild) {
            divPedidos.removeChild(divPedidos.firstChild);
        }
    }

    function aceitarPedido(idPedido) {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_aceitar = new XMLHttpRequest();
        } else {
            xhr_aceitar = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_aceitar) {
            // Configurar a solicitação
            let url = "http://127.0.0.1:5502/pedidoAmizade/" + idPedido;
            xhr_aceitar.open('GET', url, true);
            xhr_aceitar.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            // Definir a função de retorno de chamada
            xhr_aceitar.onreadystatechange = function () {
                if ((xhr_aceitar.readyState === 4) && (xhr_aceitar.status === 200)) {
                    var pedido = JSON.parse(xhr_aceitar.responseText);
                    atualizarPedido(pedido);
                }
            };
        }

        // Enviar a solicitação
        xhr_aceitar.send();
    }

    function atualizarPedido(pedido) {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_atualizar = new XMLHttpRequest();
        } else {
            xhr_atualizar = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_atualizar) {
            // Configurar a solicitação
            let url = "http://127.0.0.1:5502/aceitarAmigo/" + pedido[0].idPedidosAmizade;
            xhr_atualizar.open('PATCH', url, true);
            xhr_atualizar.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            // Definir a função de retorno de chamada
            xhr_atualizar.onreadystatechange = function () {
                if ((xhr_atualizar.readyState === 4) && (xhr_atualizar.status === 200)) {
                    criarAmizade(pedido);
                }
            };
        }

        // Enviar a solicitação
        xhr_atualizar.send();
    }

    function criarAmizade(pedido) {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_criar_amizade = new XMLHttpRequest();
        } else {
            xhr_criar_amizade = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_criar_amizade) {
            // Configurar a solicitação
            let url = "http://127.0.0.1:5502/criarAmizade/" + pedido[0].Profissionais_idUser + "/" + pedido[0].idSoliciador;
            console.log(url);
            xhr_criar_amizade.open('POST', url, true);
            xhr_criar_amizade.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            // Definir a função de retorno de chamada
            xhr_criar_amizade.onreadystatechange = function () {
                if ((xhr_criar_amizade.readyState === 4) && (xhr_criar_amizade.status === 200)) {
                    criarAmizade2(pedido);
                }
            };
        }

        // Enviar a solicitação
        xhr_criar_amizade.send();
    }

    function criarAmizade2(pedido) {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_criar_amizade2 = new XMLHttpRequest();
        } else {
            xhr_criar_amizade2 = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_criar_amizade2) {
            // Configurar a solicitação
            let url = "http://127.0.0.1:5502/criarAmizade/" + pedido[0].idSoliciador + "/" + pedido[0].Profissionais_idUser;
            console.log(url);
            xhr_criar_amizade2.open('POST', url, true);
            xhr_criar_amizade2.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            // Definir a função de retorno de chamada
            xhr_criar_amizade2.onreadystatechange = function () {
                if ((xhr_criar_amizade2.readyState === 4) && (xhr_criar_amizade2.status === 200)) {
                    obterPedidosAmizade();
                    obterAmigos();
                }
            };
        }

        // Enviar a solicitação
        xhr_criar_amizade2.send();
    }

    function rejeitarPedido(idPedido) {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_rejeitar = new XMLHttpRequest();
        } else {
            xhr_rejeitar = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_rejeitar) {
            // Configurar a solicitação
            let url = "http://127.0.0.1:5502/rejeitarAmigo/" + idPedido;
            console.log(url);
            xhr_rejeitar.open('PATCH', url, true);
            xhr_rejeitar.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            // Definir a função de retorno de chamada
            xhr_rejeitar.onreadystatechange = function () {
                if ((xhr_rejeitar.readyState === 4) && (xhr_rejeitar.status === 200)) {
                    obterPedidosAmizade();
                }
            };
        }

        // Enviar a solicitação
        xhr_rejeitar.send();
    }

    function insertAmigos() {
        deleteDivAmigos();
        
        for(var elem of amigos) {
            var div_amigo = document.createElement("div"); //div com toda a info do amigo
            div_amigo.className = "div_pedido";

            var div_amigo_row = document.createElement("div"); //div com informação em linha
            div_amigo_row.className = "div_pedido_row";

            var p_idAmigo = document.createElement("p");
            p_idAmigo.textContent = elem.idAmigo;
            p_idAmigo.style.display = "none";

            var div_imagem = document.createElement("div"); //Div com imagem do user
            div_imagem.className = "div_pedido_img";
            var img = document.createElement("img");
            img.className = "img_pedido";
            img.src = "imagens/person_icon.png";
            div_imagem.appendChild(img);

            var h1_nome = document.createElement("h1");
            h1_nome.textContent = elem.nome;
            h1_nome.id = elem.idAmigo;
            h1_nome.addEventListener("click", function (evt) {
                sessionStorage.setItem("Users_idUser", evt.target.id);
                sessionStorage.setItem("TipoUsers_idUser", 1);
                window.location.href = "http://127.0.0.1:5502/pagina_perfil_pro.html";
            });
            h1_nome.className = "h1_nome_pedido";

            var btn_eliminar = document.createElement("button");
            btn_eliminar.className = "btn_rejeitar";
            btn_eliminar.textContent = "Eliminar";
            //btn_eliminar.addEventListener("click", function () { eliminarAmigo(elem.idAmigos); } );
            btn_eliminar.addEventListener("click", function () { eliminarAmigo(elem.idAmigo, elem.Profissionais_idUser); } );

            var hr = document.createElement("hr");
            hr.className = "hr_pedido";

            div_amigo_row.appendChild(p_idAmigo);
            div_amigo_row.appendChild(div_imagem);
            div_amigo_row.appendChild(h1_nome);
            div_amigo_row.appendChild(btn_eliminar);
            div_amigo.appendChild(div_amigo_row);
            div_amigo.appendChild(hr);
            divAmigos.appendChild(div_amigo);
        }
    }

    function deleteDivAmigos() {
        while (divAmigos.firstChild) {
            divAmigos.removeChild(divAmigos.firstChild);
        }
    }

    /*
    function eliminarAmigo(idAmigos) {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_eliminar = new XMLHttpRequest();
        } else {
            xhr_eliminar = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_eliminar) {
            // Configurar a solicitação
            let url = "http://127.0.0.1:5502/deleteAmigo/" + idAmigos;
            console.log(url);
            xhr_eliminar.open('DELETE', url, true);
            xhr_eliminar.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            // Definir a função de retorno de chamada
            xhr_eliminar.onreadystatechange = function () {
                if ((xhr_eliminar.readyState === 4) && (xhr_eliminar.status === 200)) {
                    obterAmigos();
                }
            };
        }

        // Enviar a solicitação
        xhr_eliminar.send();
    }
    */

    function eliminarAmigo(idAmigo, idProf) {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_eliminar = new XMLHttpRequest();
        } else {
            xhr_eliminar = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_eliminar) {
            // Configurar a solicitação
            let url = "http://127.0.0.1:5502/deleteAmigo/" + idAmigo + "/" + idProf;
            console.log(url);
            xhr_eliminar.open('DELETE', url, true);
            xhr_eliminar.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            // Definir a função de retorno de chamada
            xhr_eliminar.onreadystatechange = function () {
                if ((xhr_eliminar.readyState === 4) && (xhr_eliminar.status === 200)) {
                    deletePedido(idAmigo, idProf);
                }
            };
        }

        // Enviar a solicitação
        xhr_eliminar.send();
    }

    function deletePedido(idAmigo, idProf) {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_eliminarPedido = new XMLHttpRequest();
        } else {
            xhr_eliminarPedido = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_eliminarPedido) {
            // Configurar a solicitação
            let url = "http://127.0.0.1:5502/deletePedido/" + idAmigo + "/" + idProf;
            console.log(url);
            xhr_eliminarPedido.open('DELETE', url, true);
            xhr_eliminarPedido.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            // Definir a função de retorno de chamada
            xhr_eliminarPedido.onreadystatechange = function () {
                if ((xhr_eliminarPedido.readyState === 4) && (xhr_eliminarPedido.status === 200)) {
                    obterAmigos();
                }
            };
        }

        // Enviar a solicitação
        xhr_eliminarPedido.send();
    }

    function obterPedidosAmizade() {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr) {
            // Configurar a solicitação
            let url = "http://127.0.0.1:5502/pedidos/" + user[0].Users_idUser;
            xhr.open('GET', url, true);

            // Definir a função de retorno de chamada
            xhr.onreadystatechange = function () {
                if ((xhr.readyState === 4) && (xhr.status === 200)) {
                    pedidosAmizade = JSON.parse(xhr.responseText);
                    insertPedidos();
                }
            };
        }

        // Enviar a solicitação
        xhr.send();
    }

    function obterAmigos() {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr2 = new XMLHttpRequest();
        } else {
            xhr2 = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr2) {
            // Configurar a solicitação
            let url = "http://127.0.0.1:5502/amigos/" + user[0].Users_idUser;
            xhr2.open('GET', url, true);

            // Definir a função de retorno de chamada
            xhr2.onreadystatechange = function () {
                if ((xhr2.readyState === 4) && (xhr2.status === 200)) {
                    amigos = JSON.parse(xhr2.responseText);
                    insertAmigos();
                }
            };
        }

        // Enviar a solicitação
        xhr2.send();
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
                    obterPedidosAmizade();
                    obterAmigos();
                }
            };
        }

        // Enviar a solicitação
        xhr_userLogged.send();
    }
}

window.onload = init;