/**
 * Função chamada quando página é carregada
 */
function init() {
    var valorFormato = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
    var user;
    var todasOfertas;
    var ofertasShow;
    var areas;

    getUserLogged();
    obterOfertas();
    obterAreas();

    var div_body_ofertas = document.getElementById("div_body_ofertas");

    //Adicionar evento a botão para limpar o filtro
    var btn_ofertas_filtro = document.getElementById("btn_ofertas_filtro");
    btn_ofertas_filtro.addEventListener("click", function (evt) {
        cleanFilter();
    });

    //Adicionar evento a botão para procura
    var btn_procura = document.getElementById("btn_procura");
    btn_procura.addEventListener("click", function (evt) {
        ofertasShow = structuredClone(todasOfertas);
        validateFilter();
    });

    function verifyUser() {
        if (user) {
            var btn_menu_amigos = document.getElementById("btn_menu_amigos");
            var btn_menu_empresas = document.getElementById("btn_menu_empresas");
            var a_login = document.getElementById("a_login");
            var a_register = document.getElementById("a_register");
            var a_adcionar_oferta = document.getElementById("a_adcionar_oferta");

            console.log(btn_menu_amigos);
            
            switch(user[0].TipoUser_idTipoUser) {
                case 1:
                    a_adcionar_oferta.style.display = "inline";
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

    /**
    * Função que insere as ofertas na div com a informação
    * @param {Array} ofertas - array com as ofertas a inserir
    */
    function insertData(ofertas) {
        var duracaoTxt = "";
        deleteDataDivOfertas();
        for (var elem of ofertas) {
            var div_oferta = document.createElement("div"); //Div com a info da oferta
            div_oferta.className = "div_oferta";

            //Criar div com dados empresa/valor
            var div_oferta_info1 = createDivInfo("Empresa:", elem.nomeEmpresa, valorFormato.format(elem.valor));
            //Criar div com dados Área
            var div_oferta_info2 = createDivInfo("Área:", elem.areaDescricao);
            //Criar div com dados Duração
            if (elem.duracao === 1) {
                duracaoTxt = elem.duracao + " Mês";
            } else if (elem.duracao > 1) {
                duracaoTxt = elem.duracao + " Meses";
            } else {
                duracaoTxt = "Sem duração";
            }
            var div_oferta_info3 = createDivInfo("Duração:", duracaoTxt);

            let data = new Date(elem.dataValidade);
            var div_oferta_info4 = createDivInfo("Validade:", data.getDate() + "-" + (data.getMonth() + 1) + "-" + data.getFullYear());
            //Criar p com dados Descrição
            var p = document.createElement("p");
            p.textContent = elem.descricao;
            //Criar hr
            var hr = document.createElement("hr");
            hr.className = "hr_oferta";

            //Inserir divs com informação dentro da div_oferta
            div_oferta.appendChild(div_oferta_info1);
            div_oferta.appendChild(div_oferta_info2);
            div_oferta.appendChild(div_oferta_info3);
            div_oferta.appendChild(div_oferta_info4);
            div_oferta.appendChild(p);
            div_oferta.appendChild(hr);
            //Inserir div_oferta dentro da div com as ofertas
            div_body_ofertas.appendChild(div_oferta);
        }
    }

    /**
    * Função que remove as ofertas na div com a informação
    */
    function deleteDataDivOfertas() {
        while (div_body_ofertas.firstChild) {
            div_body_ofertas.removeChild(div_body_ofertas.firstChild);
        }
    }

    /**
    * Função que cria a div com a informação
    * @param {String} title - legenda da informação
    * @param info1 - valor da informação
    * @param info2 - 2º valor da informação
    */
    function createDivInfo(title, info1, info2) {
        var div_oferta_info = document.createElement("div");
        div_oferta_info.className = "div_oferta_info";

        var b = document.createElement("b");
        b.textContent = title;

        var p1 = document.createElement("p");
        p1.className = "p_oferta_info";
        p1.textContent = info1;

        if (info2) {
            var b1 = document.createElement("b");
            b1.className = "p_oferta_info_val";
            b1.textContent = info2;
        }

        div_oferta_info.appendChild(b);
        div_oferta_info.appendChild(p1);
        if (b1) {
            div_oferta_info.appendChild(b1);
        }

        return div_oferta_info;
    }

    /**
    * Função que valida o filtro e aplica o conjunto de filtros aplicado
    */
    function validateFilter() {
        var input_procura = document.getElementById("input_procura").value;
        var selected_area = document.getElementById("select_area").value;

        var radioButtonsDur = document.querySelectorAll('input[name="dur"]');
        for (var radioButtonDur of radioButtonsDur) {
            if (radioButtonDur.checked) {
                var radioValueDur = radioButtonDur.value;
                break;
            }
        }

        var radioButtonsValid = document.querySelectorAll('input[name="valid"]');
        for (var radioButtonValid of radioButtonsValid) {
            if (radioButtonValid.checked) {
                var radioValueValid = radioButtonValid.value;
                break;
            }
        }

        var radioButtonsRemun = document.querySelectorAll('input[name="remun"]');
        for (var radioButtonRemun of radioButtonsRemun) {
            if (radioButtonRemun.checked) {
                var radioValueRemun = radioButtonRemun.value;
                break;
            }
        }

        //Executar filtros
        if (input_procura) {
            ofertasShow = getElemsByEmpresa(ofertasShow, input_procura);
        }
        if (radioValueDur) {
            switch (radioValueDur) {
                case "um_ano":
                    ofertasShow = getElemsByDur(ofertasShow, 0, 11);
                    break;
                case "um_a_cinco":
                    ofertasShow = getElemsByDur(ofertasShow, 12, 59);
                    break;
                case "cinco_mais":
                    ofertasShow = getElemsByDur(ofertasShow, 60, Infinity);
                    break;
            }
        }
        if (selected_area && selected_area !== "nenhuma") {
            ofertasShow = getElemsByArea(ofertasShow, selected_area);
        }
        if (radioValueValid) {
            switch (radioValueValid) {
                case "recente":
                    ofertasShow = sortArrayValidade(ofertasShow, "recente");
                    break;
                case "antiga":
                    ofertasShow = sortArrayValidade(ofertasShow, "antiga");
                    break;
            }
        }
        if (radioValueRemun) {
            switch (radioValueRemun) {
                case "menor":
                    
                    ofertasShow = sortArrayRemun(ofertasShow, "menor");
                    break;
                case "maior":
                    ofertasShow = sortArrayRemun(ofertasShow, "maior");
                    break;
            }
        }

        //Exibir ofertas e atualizar array show
        if (ofertasShow !== void 0 || ofertasShow.length > 0) {~
            insertData(ofertasShow);
        } else {
            cleanFilter();
        }
    }

    /**
    * Função que retorna a empresa filtrada
    * @param {Array} array - Array com a informação atual
    * @param {String} emp - Empresa
    */
    function getElemsByEmpresa(array, emp) {
        var arrayFinal = [];

        console.log(array);

        for (var elem of array) {
            if (elem.nomeEmpresa === emp) {
                arrayFinal.push(elem);
            }
        }

        if (emp !== "") {
            return arrayFinal;
        } else {
            return array;
        }
    }

    /**
    * Função que filtra a informação por área
    * @param {Array} array - Array com a informação atual
    * @param {String} area - area
    */
    function getElemsByArea(array, area) {
        var arrayFinal = [];

        for (var elem of array) {
            if (elem.areaDescricao === area) {
                arrayFinal.push(elem);
            }
        }

        if (area !== "") {
            return arrayFinal;
        } else {
            return array;
        }
    }

    /**
    * Função que filtra a informação por duração (range)
    * @param {Array} array - Array com a informação atual
    * @param {Int} durMin - duração minima
    * @param {Int} durMax - duração máxima
    */
    function getElemsByDur(array, durMin, durMax) {
        var arrayFinal = [];

        for (var elem of array) {
            if (elem.duracao >= durMin && elem.duracao <= durMax) {
                arrayFinal.push(elem);
            }
        }

        return arrayFinal;
    }

    /**
    * Função que filtra a informação por Validade
    * @param {Array} array - Array com a informação atual
    * @param {String} array - oderm (crescente ou decrescente)
    */
    function sortArrayValidade(array, ordem) {

        switch (ordem) {
            case "recente":
                array.sort((a, b) => {
                    let da = a.dataValidade,
                        db = b.dataValidade;

                    if (da < db) {
                        return -1;
                    }
                    if (da > db) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case "antiga":
                array.sort((a, b) => {
                    let da = a.dataValidade,
                        db = b.dataValidade;

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
    * Função que filtra a informação por Remuneração (Valor)
    * @param {Array} array - Array com a informação atual
    * @param {String} array - oderm (crescente ou decrescente)
    */
    function sortArrayRemun(array, ordem) {

        switch (ordem) {
            case "menor":
                array.sort((a, b) => {
                    let da = a.valor,
                        db = b.valor;

                    if (da < db) {
                        return -1;
                    }
                    if (da > db) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case "maior":
                array.sort((a, b) => {
                    let da = a.valor,
                        db = b.valor;

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
    * Função que limpa o filtro e retorna a informação completa das ofertas
    */
    function cleanFilter() {
        deleteDataDivOfertas();
        insertData(todasOfertas);

        var inputEmpresa = document.getElementById("input_procura");
        inputEmpresa.value = "";

        var select_area = document.getElementById("select_area");
        select_area.value = "nenhuma";

        var radioButtonsDur = document.querySelectorAll('input[name="dur"]');
        for (var radioButtonDur of radioButtonsDur) {
            if (radioButtonDur.checked) {
                radioButtonDur.checked = false;
                break;
            }
        }

        var radioButtonsValid = document.querySelectorAll('input[name="valid"]');
        for (var radioButtonValid of radioButtonsValid) {
            if (radioButtonValid.checked) {
                radioButtonValid.checked = false;
                break;
            }
        }

        var radioButtonsRemun = document.querySelectorAll('input[name="remun"]');
        for (var radioButtonRemun of radioButtonsRemun) {
            if (radioButtonRemun.checked) {
                radioButtonRemun.checked = false;
                break;
            }
        }
    }

    function obterOfertas() {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr) {
            // Configurar a solicitação
            xhr.open('GET', 'http://127.0.0.1:5502/ofertas', true);

            // Definir a função de retorno de chamada
            xhr.onreadystatechange = function () {
                if ((xhr.readyState === 4) && (xhr.status === 200)) {
                    // Fazer algo com os dados recebidos
                    todasOfertas = JSON.parse(xhr.responseText);
                    ofertasShow = structuredClone(todasOfertas);
                    insertData(ofertasShow);

                    var html = document.getElementById("html");
                    html.addEventListener("keypress", function (evt) {
                        if (evt.key === "Enter") {
                            ofertasShow = structuredClone(todasOfertas);
                            validateFilter();
                        }
                    });

                    var radio_dur = document.getElementById("radio_dur");
                    radio_dur.addEventListener("change", function(evt) {
                        ofertasShow = structuredClone(todasOfertas);
                        validateFilter();
                    });

                    var select_area = document.getElementById("select_area");
                    select_area.addEventListener("change", function(evt) {
                        ofertasShow = structuredClone(todasOfertas);
                        validateFilter();
                    });

                    var radio_valid = document.getElementById("radio_valid");
                    radio_valid.addEventListener("change", function(evt) {
                        ofertasShow = structuredClone(todasOfertas);
                        validateFilter();
                    });

                    var radio_remun = document.getElementById("radio_remun");
                    radio_remun.addEventListener("change", function(evt) {
                        ofertasShow = structuredClone(todasOfertas);
                        validateFilter();
                    });
                }
            };
        }

        // Enviar a solicitação
        xhr.send();
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

                    var select = document.getElementById("select_area");

                    for (var i=0; i<areas.length; i++) {
                        select.options[select.options.length] = new Option(areas[i].descricao, areas[i].descricao);
                    }
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
                }
            };
        }

        // Enviar a solicitação
        xhr_userLogged.send();
    }
}

window.onload = init;