/**
 * Função chamada quando página é carregada
 */
function init() {
    var user;
    var profissionais;
    var profissionaisShow;
    var empresas;
    var empresasShow;

    //inicializar botões da parte do filtro empresa/curriculo
    getUserLogged();
    init_btn_filtro_emp_curr();
    obterEmpresas();

    var div_body_empresas = document.getElementById("div_container_empresas");
    var div_body_profissionais = document.getElementById("div_container_curriculos");

    //Adicionar evento a botão para limpar o filtro
    var btn_filtro = document.getElementById("btn_curriculos_filtro");
    btn_filtro.addEventListener("click", function (evt) {
        cleanFilterProf();
    });

    //Adicionar evento a botão para limpar o filtro
    var btn_filtro = document.getElementById("btn_empresas_filtro");
    btn_filtro.addEventListener("click", function (evt) {
        cleanFilterEmp();
    });

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
    * Função que inicializa os eventos dos botões de empresas e curriculos
    */
    function init_btn_filtro_emp_curr() {
        var btn_empresas = document.getElementById("btn_empresas");
        var btn_curriculos = document.getElementById("btn_curriculos");
        var div_cont_left_filt_curr = document.getElementById("div_container_left_filtros_curriculos");
        var div_cont_left_filt_emp = document.getElementById("div_container_left_filtros_empresas");
        var div_container_empresas = document.getElementById("div_container_empresas");
        var div_container_curriculos = document.getElementById("div_container_curriculos");

        btn_empresas.addEventListener("click", function (evt) {
            div_cont_left_filt_curr.style.display = "none";
            div_cont_left_filt_emp.style.display = "initial";
            div_container_curriculos.style.display = "none";
            div_container_empresas.style.display = "initial";
            btn_empresas.style.backgroundColor = "#ebebeba1";
            btn_curriculos.style.backgroundColor = "rgba(255, 255, 255, 0)";
            section_checked = 1;
        });

        btn_curriculos.addEventListener("click", function (evt) {

            if (!user) {
                alert("Tem de ter login efetuado para aceder a esta secção!");
            } else {
                div_cont_left_filt_curr.style.display = "initial";
                div_cont_left_filt_emp.style.display = "none";
                div_container_curriculos.style.display = "initial";
                div_container_empresas.style.display = "none";
                btn_empresas.style.backgroundColor = "rgba(255, 255, 255, 0)";
                btn_curriculos.style.backgroundColor = "#ebebeba1";
                section_checked = 2;
            }
        });
    };

    /**
    * Função responsável por inserir as empresas na div correspondente à informação das empresas
    * @param dataEmpresas - Objeto com a informação de cada empresa
    */
    function insertEmpresas(dataEmpresas) {
        deleteDataDivEmpresas();

        for (var elem of dataEmpresas) {
            var div_empresa = document.createElement("div"); //Div com a info das empresas
            div_empresa.className = "div_curr";

            var div_info_row = document.createElement("div"); //Div com imagem e info da Empresa
            div_info_row.className = "div_info_row";

            var div_info_row_right = document.createElement("div"); //Div com info da Empresa
            div_info_row_right.className = "div_info_row_right";

            var div_imagem = document.createElement("div"); //Div com imagem
            div_imagem.className = "div_info_img";
            var img = document.createElement("img");
            img.className = "img_info";
            img.src = "imagens/company.png";
            div_imagem.appendChild(img);

            var div_nome = document.createElement("div");
            div_nome.className = "div_info";
            var h_nome = document.createElement("h1");
            h_nome.className = "h1_nome";
            h_nome.textContent = elem.nomeEmpresa;
            h_nome.id = elem.Users_idUser;
            h_nome.addEventListener("click", function (evt) {
                sessionStorage.setItem("Users_idUser", evt.target.id);
                sessionStorage.setItem("TipoUsers_idUser", 1);
                window.location.href = "http://127.0.0.1:5502/pagina_perfil_emp.html";
            });
            div_nome.appendChild(h_nome);

            var div_tipo = document.createElement("div");
            div_tipo.className = "div_info";
            var p_tipo = document.createElement("p");
            p_tipo.className = "p_info";
            p_tipo.textContent = "Empresa";
            div_tipo.appendChild(p_tipo);

            var div_localidade = document.createElement("div");
            div_localidade.className = "div_info";
            var p_localidade = document.createElement("p");
            p_localidade.className = "p_info";
            p_localidade.textContent = elem.localidade;
            div_localidade.appendChild(p_localidade);

            var div_descricao = document.createElement("div");
            div_descricao.className = "div_info";
            var p_descricao = document.createElement("p");
            p_descricao.className = "p_descricao";
            p_descricao.textContent = elem.descricao;
            div_descricao.appendChild(p_descricao);

            var hr = document.createElement("hr");
            hr.className = "hr_curriculo";

            div_info_row_right.appendChild(div_nome);
            div_info_row_right.appendChild(div_tipo);
            div_info_row_right.appendChild(div_localidade);
            div_info_row.appendChild(div_imagem);
            div_info_row.appendChild(div_info_row_right);
            div_empresa.appendChild(div_info_row);
            div_empresa.appendChild(div_descricao);
            div_empresa.appendChild(hr);
            div_body_empresas.appendChild(div_empresa);
        }
    }

    /**
    * Função responsável por inserir as informações dos curriculos dos profissionais na div correspondente à informação dos mesmos
    * @param dataProf - Objeto com a informação de cada curriculos dos profissionais
    */
    function insertProfissionais(dataProf) {
        deleteDataDivProfissionais();

        for (var elem of dataProf) {
            if (!(user[0].TipoUser_idTipoUser === 1 && elem.isVisible === 0)) {
                var div_prof = document.createElement("div"); //Div com a info dos profissionais
                div_prof.className = "div_curr";

                var div_info_row = document.createElement("div"); //Div com imagem e info da pessoa
                div_info_row.className = "div_info_row";

                var div_info_row_right = document.createElement("div"); //Div com info da pessoa
                div_info_row_right.className = "div_info_row_right";

                var div_imagem = document.createElement("div"); //Div com imagem
                div_imagem.className = "div_info_img";
                var img = document.createElement("img");
                img.className = "img_info";
                img.src = "imagens/person_icon.png";
                div_imagem.appendChild(img);

                var div_nome = document.createElement("div");
                div_nome.className = "div_info";
                var h_nome = document.createElement("h1");
                h_nome.className = "h1_nome";
                h_nome.textContent = elem.nome;
                h_nome.id = elem.Users_idUser;
                h_nome.addEventListener("click", function (evt) {
                    sessionStorage.setItem("Users_idUser", evt.target.id);
                    sessionStorage.setItem("TipoUsers_idUser", 2);
                    window.location.href = "http://127.0.0.1:5502/pagina_perfil_pro.html";
                });
                div_nome.appendChild(h_nome);
                

                var div_tipo = document.createElement("div");
                div_tipo.className = "div_info";
                var p_tipo = document.createElement("p");
                p_tipo.className = "p_info";
                p_tipo.textContent = "Profissional";
                div_tipo.appendChild(p_tipo);

                var div_genero = document.createElement("div");
                div_genero.className = "div_info";
                var p_genero = document.createElement("p");
                p_genero.className = "p_info";
                p_genero.textContent = elem.genero;
                div_genero.appendChild(p_genero);

                var div_idade = document.createElement("div");
                div_idade.className = "div_info";
                var p_idade = document.createElement("p");
                p_idade.className = "p_info";
                p_idade.textContent = calculateAge(elem.dataNasc) + " Anos";
                div_idade.appendChild(p_idade);

                var div_local = document.createElement("div");
                div_local.className = "div_info";
                var p_local = document.createElement("p");
                p_local.className = "p_info";
                p_local.textContent = elem.localidade;
                div_local.appendChild(p_local);

                var div_descricao = document.createElement("div");
                div_descricao.className = "div_info";
                var p_descricao = document.createElement("p");
                p_descricao.className = "p_descricao";
                p_descricao.textContent = elem.descricao;
                div_descricao.appendChild(p_descricao);

                var hr = document.createElement("hr");
                hr.className = "hr_curriculo";

                div_info_row.appendChild(div_imagem);
                div_info_row_right.appendChild(div_nome);
                div_info_row_right.appendChild(div_tipo);
                div_info_row_right.appendChild(div_genero);
                div_info_row_right.appendChild(div_idade);
                div_info_row_right.appendChild(div_local);
                div_info_row.appendChild(div_info_row_right);
                div_prof.appendChild(div_info_row);
                div_prof.appendChild(div_descricao);
                div_prof.appendChild(hr);
                div_body_profissionais.appendChild(div_prof);
            }
        }
    }

    /**
    * Função responsável por calcular a idade
    * @param data - data de nascimento
    */
    function calculateAge(data) {
        return new Date().getFullYear() - new Date(data).getFullYear();
    }

    /**
    * Função responsável por limpar a div com informação das empresas
    */
    function deleteDataDivEmpresas() {
        while (div_body_empresas.firstChild) {
            div_body_empresas.removeChild(div_body_empresas.firstChild);
        }
    }

    /**
    * Função responsável por limpar a div com informação dos profissionais
    */
    function deleteDataDivProfissionais() {
        while (div_body_profissionais.firstChild) {
            div_body_profissionais.removeChild(div_body_profissionais.firstChild);
        }
    }

    /**
    * Função responsável por limpar o filtro dos profissionais
    */
    function cleanFilterProf() {
        deleteDataDivProfissionais();
        insertProfissionais(profissionais);

        var radioButtonsIdade = document.querySelectorAll('input[name="idade"]');
        for (var radioButtonIdade of radioButtonsIdade) {
            if (radioButtonIdade.checked) {
                radioButtonIdade.checked = false;
                break;
            }
        }

        var inputIdade = document.getElementById("idade_num");
        inputIdade.value = "";

        var inputLocal = document.getElementById("curriculo_localidade");
        inputLocal.value = "";
    }

    /**
    * Função responsável por limpar o filtro das empresas
    */
    function cleanFilterEmp() {
        deleteDataDivEmpresas();
        insertEmpresas(empresas);

        var inputLocalidade = document.getElementById("empresa_localidade");
        inputLocalidade.value = "";

        var inputNome = document.getElementById("input_procura");
        inputNome.value = "";
    }

    /**
    * Função responsável por validar o filtro e aplicar o filtro à informação dos profissionais
    */
    function validateFilterProf() {
        var radioButtonsIdade = document.querySelectorAll('input[name="idade"]');
        for (var radioButtonIdade of radioButtonsIdade) {
            if (radioButtonIdade.checked) {
                var radioValueIdade = radioButtonIdade.value;
                break;
            }
        }

        var inputIdade = document.getElementById("idade_num").value;
        var inputLocal = document.getElementById("curriculo_localidade").value;

        //Executar filtros
        if (radioValueIdade) {
            switch (radioValueIdade) {
                case "jovem":
                    profissionaisShow = filterByIdade(profissionaisShow, "crescente");
                    break;
                case "velho":
                    profissionaisShow = filterByIdade(profissionaisShow, "decrescente");
                    break;
            }
        }

        if (inputIdade) {
            profissionaisShow = getElemsByIdade(profissionaisShow, inputIdade);
        }

        if (inputLocal) {
            profissionaisShow = getElemsByLocal(profissionaisShow, inputLocal);
        }

        //Exibir ofertas e atualizar array show
        if (profissionaisShow !== void 0) {
            insertProfissionais(profissionaisShow);
        } else {
            cleanFilterProf();
        }
    }

    /**
    * Função responsável por filtrar por idade
    * @param {Array} array - array com a info a filtrar
    * @param ordem - ordem a filtrar 
    */
    function filterByIdade(array, ordem) {
        switch (ordem) {
            case "crescente":
                array.sort((a, b) => {
                    let da = calculateAge(a.dataNasc);
                    db = calculateAge(b.dataNasc);

                    if (da < db) {
                        return -1;
                    }
                    if (da > db) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case "decrescente":
                array.sort((a, b) => {
                    let da = calculateAge(a.dataNasc),
                        db = calculateAge(b.dataNasc);

                    if (da > db) {
                        return -1;
                    }
                    if (da < db) {
                        return 1;
                    }
                    return 0;
                });
                break;
        }

        return array;
    }

    /**
    * Função responsável por obter os elementos por idade
    * @param {Array} array - array com a info a pesquisar
    * @param valor - valor a pesquisar 
    */
    function getElemsByIdade(array, valor) {
        var arrayFinal = [];

        for (var elem of array) {
            if (calculateAge(elem.dataNasc) == valor) {
                arrayFinal.push(elem);
            }
        }

        if (valor !== "") {
            return arrayFinal;
        } else {
            return array;
        }
    }

    /**
    * Função responsável por obter os elementos por localidade
    * @param {Array} array - array com a info a pesquisar
    * @param valor - valor a pesquisar 
    */
    function getElemsByLocal(array, valor) {
        var arrayFinal = [];

        for (var elem of array) {
            if (elem.localidade === valor) {
                arrayFinal.push(elem);
            }
        }

        if (valor !== "") {
            return arrayFinal;
        } else {
            return array;
        }
    }

    /**
    * Função responsável por validar o filtro e aplicar o filtro à informação das empresas
    */
    function validateFilterEmp() {
        var inputNome = document.getElementById("input_procura").value;
        var inputLocalidade = document.getElementById("empresa_localidade").value;

        if (inputNome) {
            empresasShow = getElemsByName(empresasShow, inputNome);
        }

        if (inputLocalidade) {
            empresasShow = getElemsByLocal(empresasShow, inputLocalidade);
        }

        //Exibir ofertas e atualizar array show
        if (empresasShow !== void 0) {
            insertEmpresas(empresasShow);
        } else {
            cleanFilterEmp();
        }
    }

    /**
    * Função responsável por obter os elementos por nome
    * @param {Array} array - array com a info a pesquisar
    * @param valor - valor a pesquisar 
    */
    function getElemsByName(array, valor) {
        var arrayFinal = [];

        for (var elem of array) {
            if (elem.nomeEmpresa === valor) {
                arrayFinal.push(elem);
            }
        }

        if (valor !== "") {
            return arrayFinal;
        } else {
            return array;
        }
    }

    /**
    * Função responsável por obter oa informação dos profissionais existentes
    */
    function obterProfissionais() {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr) {
            // Configurar a solicitação
            xhr.open('GET', 'http://127.0.0.1:5502/profissionais', true);

            // Definir a função de retorno de chamada
            xhr.onreadystatechange = function () {
                if ((xhr.readyState === 4) && (xhr.status === 200)) {
                    // Fazer algo com os dados recebidos
                    profissionais = JSON.parse(xhr.responseText);
                    profissionaisShow = structuredClone(profissionais);

                    var btn_curriculos = document.getElementById("btn_curriculos");
                    btn_curriculos.addEventListener("click", function (evt) {
                        insertProfissionais(profissionaisShow);
                    });

                    var radioIdade = document.getElementById("radio_idade");
                    radioIdade.addEventListener("change", function (evt) {
                        profissionaisShow = structuredClone(profissionais);
                        validateFilterProf();
                        var inputIdade = document.getElementById("idade_num");
                        inputIdade.value = "";
                    });

                    var inputIdade = document.getElementById("idade_num");
                    inputIdade.addEventListener("change", function (evt) {
                        profissionaisShow = structuredClone(profissionais);
                        validateFilterProf();
                        var radioButtonsIdade = document.querySelectorAll('input[name="idade"]');
                        for (var radioButtonIdade of radioButtonsIdade) {
                            if (radioButtonIdade.checked) {
                                radioButtonIdade.checked = false;
                                break;
                            }
                        }
                    });

                    var inputLocal = document.getElementById("curriculo_localidade");
                    inputLocal.addEventListener("change", function (evt) {
                        profissionaisShow = structuredClone(profissionais);
                        validateFilterProf();
                    });
                }
            };
        }

        // Enviar a solicitação
        xhr.send();
    }

    /**
    * Função responsável por obter a informação das empresas existentes
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
            xhr2.open('GET', 'http://127.0.0.1:5502/empresas', true);

            // Definir a função de retorno de chamada
            xhr2.onreadystatechange = function () {
                if ((xhr2.readyState === 4) && (xhr2.status === 200)) {
                    // Fazer algo com os dados recebidos
                    empresas = JSON.parse(xhr2.responseText);
                    empresasShow = structuredClone(empresas);
                    insertEmpresas(empresasShow);

                    var btn_curriculos = document.getElementById("btn_empresas");
                    btn_curriculos.addEventListener("click", function (evt) {
                        insertEmpresas(empresasShow);
                    });

                    var btn_procura = document.getElementById("btn_procura");
                    btn_procura.addEventListener("click", function (evt) {
                        empresasShow = structuredClone(empresas);
                        validateFilterEmp();
                    });

                    var inputLocal = document.getElementById("empresa_localidade");
                    inputLocal.addEventListener("change", function (evt) {
                        empresasShow = structuredClone(empresas);
                        validateFilterEmp();
                    });
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
                    obterProfissionais();
                }
            };
        }

        // Enviar a solicitação
        xhr_userLogged.send();
    }
}

window.onload = init;