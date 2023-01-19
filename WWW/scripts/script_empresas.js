/**
 * Função chamada quando página é carregada
 */
function init() {
    var user;
    var pedidosEmpresas;
    var empresas;
    var divPedidos = document.getElementById("div_pedidos_scroll");
    var divEmpresas = document.getElementById("div_empresas_scroll");

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
    * Função responsável por inserir pedidos de empresas registadas
    */
    function insertPedidos() {
        deleteDivPedidos();

        for (var elem of pedidosEmpresas) {
            var div_pedido = document.createElement("div"); //div com toda a info do pedido
            div_pedido.className = "div_pedido";

            var div_pedido_row = document.createElement("div"); //div com informação em linha
            div_pedido_row.className = "div_pedido_row";

            var div_imagem = document.createElement("div"); //Div com imagem do user
            div_imagem.className = "div_pedido_img";
            var img = document.createElement("img");
            img.className = "img_pedido";
            img.src = "imagens/company.png";
            div_imagem.appendChild(img);

            var h1_nome = document.createElement("h1");
            h1_nome.textContent = elem.nomeEmpresa;
            h1_nome.className = "h1_nome_pedido";

            var btn_aceitar = document.createElement("button");
            btn_aceitar.className = "btn_aceitar";
            btn_aceitar.textContent = "Aceitar";
            btn_aceitar.addEventListener("click", function () { aceitarPedido(elem); });

            var btn_rejeitar = document.createElement("button");
            btn_rejeitar.className = "btn_rejeitar";
            btn_rejeitar.textContent = "Rejeitar";
            btn_rejeitar.addEventListener("click", function () { rejeitarPedido(elem); });

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

    /**
    * Função responsável por limpar a div com informação dos pedidos
    */
    function deleteDivPedidos() {
        while (divPedidos.firstChild) {
            divPedidos.removeChild(divPedidos.firstChild);
        }
    }
    
    /**
    * Função responsável por aceitar o pedido de resgisto da empresa
    * @param empresa - id da empresa aceite
    */
    function aceitarPedido(empresa) {
        var data = {
            Nome: empresa.nomeEmpresa,
            Descricao: empresa.descricao,
            UrlSite: empresa.urlSite,
            UrlLogo: empresa.urlLogo,
            Email: empresa.email,
            Password: empresa.password,
            Localidade: empresa.localidade
        };

        atualizarPedido(data, empresa.idEmpresaConfirm);
    }
    
    /**
    * Função responsável por atualizar o pedido para Aceite
    * @param data - informação da empresa
    * @param idPedido - id do pedido
    */
    function atualizarPedido(data, idPedido) {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_atualizar = new XMLHttpRequest();
        } else {
            xhr_atualizar = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_atualizar) {
            // Configurar a solicitação
            let url = "http://127.0.0.1:5502/aceitarEmpresa/" + idPedido;
            xhr_atualizar.open('PATCH', url, true);
            xhr_atualizar.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            // Definir a função de retorno de chamada
            xhr_atualizar.onreadystatechange = function () {
                if ((xhr_atualizar.readyState === 4) && (xhr_atualizar.status === 200)) {
                    criarUser(data);
                }
            };
        }

        // Enviar a solicitação
        xhr_atualizar.send();
    } 

    /**
    * Função responsável por criar o user da nova empresa
    * @param data - informação da empresa
    */
    function criarUser(data) {
        var url = "/newUser/" + 1;

        var xhttp = new XMLHttpRequest();
        //Open first, before setting the request headers.
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //Ir buscar o user que foi criado
                getUser(data);
            }
        };

        xhttp.send(JSON.stringify(data));
    }

    /**
    * Função responsável por obter o user criado para a criação da empresa
    * @param data - informação da empresa
    */
    //Funcao que vai buscar o user criado
    function getUser(data) {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_getUser = new XMLHttpRequest();
        } else {
            xhr_getUser = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_getUser) {
            let url = "http://127.0.0.1:5502/getUser/" + data.Email;
            // Configurar a solicitação
            xhr_getUser.open('GET', url, true);

            // Definir a função de retorno de chamada
            xhr_getUser.onreadystatechange = function () {
                if ((xhr_getUser.readyState === 4) && (xhr_getUser.status === 200)) {
                    // Fazer algo com os dados recebidos
                    var resultado = JSON.parse(xhr_getUser.responseText);
                    var linhaResultado = resultado[0];

                    data.IdUser = linhaResultado["idUser"];

                    criarEmpresa(data);
                }
            };
        }

        // Enviar a solicitação
        xhr_getUser.send();
    }

    /**
    * Função responsável por criar a empresa
    * @param data - informação da empresa
    */
    function criarEmpresa(data) {
        var url = "/criarEmp";

        var xhttp2 = new XMLHttpRequest();
        //Open first, before setting the request headers.
        xhttp2.open("POST", url, true);
        xhttp2.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhttp2.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                obterPedidosEmpresas();
                obterEmpresas();
            }
        }
        xhttp2.send(JSON.stringify(data));
    }

    /**
    * Função responsável por rejeitar o pedido da empresa
    */
    function rejeitarPedido(empresa) {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_rejeitar = new XMLHttpRequest();
        } else {
            xhr_rejeitar = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_rejeitar) {
            // Configurar a solicitação
            let url = "http://127.0.0.1:5502/rejeitarEmpresa/" + empresa.idEmpresaConfirm;
            console.log(url);
            xhr_rejeitar.open('PATCH', url, true);
            xhr_rejeitar.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            // Definir a função de retorno de chamada
            xhr_rejeitar.onreadystatechange = function () {
                if ((xhr_rejeitar.readyState === 4) && (xhr_rejeitar.status === 200)) {
                    obterPedidosEmpresas();
                }
            };
        }

        // Enviar a solicitação
        xhr_rejeitar.send();
    }

    /**
    * Função responsável por inserir as empresas na div com empresas existentes
    */
    function insertEmpresas() {
        deleteDivEmpresas();

        for (var elem of empresas) {
            var div_empresa = document.createElement("div"); //div com toda a info da empresa
            div_empresa.className = "div_pedido";

            var div_empresa_row = document.createElement("div"); //div com informação em linha
            div_empresa_row.className = "div_pedido_row";

            var div_imagem = document.createElement("div"); //Div com imagem do user
            div_imagem.className = "div_pedido_img";
            var img = document.createElement("img");
            img.className = "img_pedido";
            img.src = "imagens/company.png";
            div_imagem.appendChild(img);

            var h1_nome = document.createElement("h1");
            h1_nome.textContent = elem.nomeEmpresa;
            h1_nome.id = elem.Users_idUser;
            h1_nome.addEventListener("click", function (evt) {
                sessionStorage.setItem("Users_idUser", evt.target.id);
                sessionStorage.setItem("TipoUsers_idUser", 2);
                window.location.href = "http://127.0.0.1:5502/pagina_perfil_emp.html";
            });
            h1_nome.className = "h1_nome_pedido";

            var btn_eliminar = document.createElement("button");
            btn_eliminar.className = "btn_rejeitar";
            btn_eliminar.textContent = "Eliminar";
            btn_eliminar.addEventListener("click", function () { eliminarEmpresa(elem.Users_idUser); });

            var hr = document.createElement("hr");
            hr.className = "hr_pedido";

            div_empresa_row.appendChild(div_imagem);
            div_empresa_row.appendChild(h1_nome);
            div_empresa_row.appendChild(btn_eliminar);
            div_empresa.appendChild(div_empresa_row);
            div_empresa.appendChild(hr);
            divEmpresas.appendChild(div_empresa);
        }
    }

    /**
    * Função responsável por eliminar a empresa já existente
    */
    function eliminarEmpresa(Users_idUser) {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_eliminarEmp = new XMLHttpRequest();
        } else {
            xhr_eliminarEmp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_eliminarEmp) {
            // Configurar a solicitação
            let url = "http://127.0.0.1:5502/deleteEmpresa/" + Users_idUser;
            console.log(url);
            xhr_eliminarEmp.open('DELETE', url, true);
            xhr_eliminarEmp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            // Definir a função de retorno de chamada
            xhr_eliminarEmp.onreadystatechange = function () {
                if ((xhr_eliminarEmp.readyState === 4) && (xhr_eliminarEmp.status === 200)) {
                    eliminarUser(Users_idUser);
                }
            };
        }

        // Enviar a solicitação
        xhr_eliminarEmp.send();
    }

    /**
    * Função responsável por eliminar a empresa já existente
    */
    function eliminarUser(Users_idUser) {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr_eliminarEmp = new XMLHttpRequest();
        } else {
            xhr_eliminarEmp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr_eliminarEmp) {
            // Configurar a solicitação
            let url = "http://127.0.0.1:5502/deleteUser/" + Users_idUser;
            console.log(url);
            xhr_eliminarEmp.open('DELETE', url, true);
            xhr_eliminarEmp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            // Definir a função de retorno de chamada
            xhr_eliminarEmp.onreadystatechange = function () {
                if ((xhr_eliminarEmp.readyState === 4) && (xhr_eliminarEmp.status === 200)) {
                    obterEmpresas();
                }
            };
        }

        // Enviar a solicitação
        xhr_eliminarEmp.send();
    }

    /**
    * Função responsável por limpar a div com as informações das empresas
    */
    function deleteDivEmpresas() {
        while (divEmpresas.firstChild) {
            divEmpresas.removeChild(divEmpresas.firstChild);
        }
    }

    /**
    * Função responsável por obter os pedidos das empresas
    */
    function obterPedidosEmpresas() {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr) {
            // Configurar a solicitação
            let url = "http://127.0.0.1:5502/pedidosEmp";
            xhr.open('GET', url, true);

            // Definir a função de retorno de chamada
            xhr.onreadystatechange = function () {
                if ((xhr.readyState === 4) && (xhr.status === 200)) {
                    pedidosEmpresas = JSON.parse(xhr.responseText);
                    insertPedidos();
                }
            };
        }

        // Enviar a solicitação
        xhr.send();
    }

    /**
    * Função responsável por obter as empresas existentes
    */
    function obterEmpresas() {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr2 = new XMLHttpRequest();
        } else {
            xhr2 = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr2) {
            // Configurar a solicitação
            let url = "http://127.0.0.1:5502/empresas";
            xhr2.open('GET', url, true);

            // Definir a função de retorno de chamada
            xhr2.onreadystatechange = function () {
                if ((xhr2.readyState === 4) && (xhr2.status === 200)) {
                    empresas = JSON.parse(xhr2.responseText);
                    insertEmpresas();
                }
            };
        }

        // Enviar a solicitação
        xhr2.send();
    }

    /**
    * Função responsável por obter as informações do user que está com login efetuado
    */
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
                    obterPedidosEmpresas();
                    obterEmpresas();
                }
            };
        }

        // Enviar a solicitação
        xhr_userLogged.send();
    }
}

window.onload = init;