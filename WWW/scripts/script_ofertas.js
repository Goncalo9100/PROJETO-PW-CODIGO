/**
 * Enumerado com áreas
 */
var areas = {
    0: "Construção",
    1: "Consultoria",
    2: "Medicina",
    3: "Financeira"
}

/**
 * Array de Ofertas
 */
var ofertas = [
    {
        empresa: "Builde",
        area: areas[1],
        duracao: 0,
        valor: 1000,
        descricao: "teste descrição",
        validade: new Date("2022-12-25")
    },

    {
        empresa: "Builder",
        area: areas[1],
        duracao: 16,
        valor: 10000,
        descricao: "teste descrição",
        validade: new Date("2023-02-01")
    },

    {
        empresa: "Consult",
        area: areas[0],
        duracao: 17,
        valor: 10000,
        descricao: "teste descrição",
        validade: new Date("2023-07-16")
    },

    {
        empresa: "Consultoria",
        area: areas[0],
        duracao: 70,
        valor: 10000,
        descricao: "teste descrição",
        validade: new Date("2023-05-09")
    }
];

/**
 * Função chamada quando página é carregada
 */
function init() {
    var valorFormato = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
    var todasOfertas = structuredClone(ofertas);
    var ofertasShow = structuredClone(ofertas);

    buildDropAreas();

    var div_body_ofertas = document.getElementById("div_body_ofertas");

    insertData(ofertasShow);

    //Evento para Enter
    var html = document.getElementById("html");
    html.addEventListener("keypress", function (evt) {
        if (evt.key === "Enter") {
            ofertasShow = structuredClone(todasOfertas);
            validateFilter();
        }
    });

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

    //Construir dropdown com as áres
    function buildDropAreas() {
        var select = document.getElementById("select_area");

        for (var x in areas) {
            select.options[select.options.length] = new Option(areas[x], areas[x]);
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
            var div_oferta_info1 = createDivInfo("Empresa:", elem.empresa, valorFormato.format(elem.valor));
            //Criar div com dados Área
            var div_oferta_info2 = createDivInfo("Área:", elem.area);
            //Criar div com dados Duração
            if (elem.duracao === 1) {
                duracaoTxt = elem.duracao + " Mês";
            } else if (elem.duracao > 1) {
                duracaoTxt = elem.duracao + " Meses";
            } else {
                duracaoTxt = "Sem duração";
            }
            var div_oferta_info3 = createDivInfo("Duração:", duracaoTxt);
            var div_oferta_info4 = createDivInfo("Validade:", elem.validade.getDate() + "-" + (elem.validade.getMonth() + 1) + "-" + elem.validade.getFullYear());
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
            console.log(selected_area);
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
        if (ofertasShow !== void 0 || ofertasShow.length > 0) {
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

        for (var elem of array) {
            if (elem.empresa === emp) {
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
            if (elem.area === area) {
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

        console.log(arrayFinal);

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
    function sortArrayValidade(array, array) {

        switch (ordem) {
            case "recente":
                array.sort((a, b) => {
                    let da = a.validade,
                        db = b.validade;

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
                    let da = a.validade,
                        db = b.validade;

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
}

window.onload = init;