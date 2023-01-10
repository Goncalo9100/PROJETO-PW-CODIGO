/**
 * Função chamada quando página é carregada
 */
function init() {
    var profissionais;
    var empresas;

    //inicializar botões da parte do filtro empresa/curriculo
    init_btn_filtro_emp_curr();
    obterEmpresas();
    obterProfissionais();
    
    var div_body_empresas = document.getElementById("div_container_empresas");
    var div_body_profissionais = document.getElementById("div_container_curriculos"); 
    
    /**
    * Função que inicializa os botões e os eventos dos mesmos
    */
    function init_btn_filtro_emp_curr(){
        var btn_empresas = document.getElementById("btn_empresas");
        var btn_curriculos = document.getElementById("btn_curriculos");
        var div_cont_left_filt_curr = document.getElementById("div_container_left_filtros_curriculos");
        var div_cont_left_filt_emp = document.getElementById("div_container_left_filtros_empresas");
        var div_container_empresas = document.getElementById("div_container_empresas");
        var div_container_curriculos = document.getElementById("div_container_curriculos");
    
        btn_empresas.addEventListener("click", function(evt) {
            div_cont_left_filt_curr.style.display = "none";
            div_cont_left_filt_emp.style.display = "initial";
            div_container_curriculos.style.display = "none";
            div_container_empresas.style.display = "initial";
            btn_empresas.style.backgroundColor = "#ebebeba1";
            btn_curriculos.style.backgroundColor = "rgba(255, 255, 255, 0)";
        });
    
        btn_curriculos.addEventListener("click", function(evt) {
            div_cont_left_filt_curr.style.display = "initial";
            div_cont_left_filt_emp.style.display = "none";
            div_container_curriculos.style.display = "initial";
            div_container_empresas.style.display = "none";
            btn_empresas.style.backgroundColor = "rgba(255, 255, 255, 0)";
            btn_curriculos.style.backgroundColor = "#ebebeba1";
        });
    };

    function insertEmpresas(dataEmpresas) {
        deleteDataDivEmpresas();

        for (var elem of dataEmpresas) {
            var div_empresa = document.createElement("div"); //Div com a info da empresa
            div_empresa.className = "div_curr";
 
            var div_nome = document.createElement("div");
            div_nome.className = "div_info";
            var h_nome = document.createElement("h1");
            h_nome.className = "h1_nome";
            h_nome.textContent = elem.nomeEmpresa;
            div_nome.appendChild(h_nome);

            var div_descricao = document.createElement("div");
            div_descricao.className = "div_info";
            var p_descricao = document.createElement("p");
            p_descricao.className = "p_descricao";
            p_descricao.textContent = elem.descricao;
            div_descricao.appendChild(p_descricao);

            var hr = document.createElement("hr");
            hr.className = "hr_curriculo";

            div_empresa.appendChild(div_nome);
            div_empresa.appendChild(div_descricao);
            div_empresa.appendChild(hr);
            div_body_empresas.appendChild(div_empresa);
        }
    }

    function insertProfissionais(dataProf) {
        deleteDataDivProfissionais();

        for(var elem of dataProf) {
            var div_prof = document.createElement("div"); //Div com a info da empresa
            div_prof.className = "div_curr";

            var div_nome = document.createElement("div");
            div_nome.className = "div_info";
            var h_nome = document.createElement("h1");
            h_nome.className = "h1_nome";
            h_nome.textContent = elem.nome;
            div_nome.appendChild(h_nome);

            var div_tipo = document.createElement("div");
            div_tipo.className = "div_info";
            var p_tipo = document.createElement("p");
            p_tipo.className = "p_info";
            p_tipo.textContent = "tipo......";
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
            p_idade.textContent = elem.dataNasc;
            div_idade.appendChild(p_idade);

            var div_descricao = document.createElement("div");
            div_descricao.className = "div_info";
            var p_descricao = document.createElement("p");
            p_descricao.className = "p_descricao";
            p_descricao.textContent = elem.descricao;
            div_descricao.appendChild(p_descricao);

            var hr = document.createElement("hr");
            hr.className = "hr_curriculo";

            div_prof.appendChild(div_nome);
            div_prof.appendChild(div_tipo);
            div_prof.appendChild(div_genero);
            div_prof.appendChild(div_idade);
            div_prof.appendChild(div_descricao);
            div_prof.appendChild(hr);
            div_body_profissionais.appendChild(div_prof);
        }
    }

    function deleteDataDivEmpresas() {
        while (div_body_empresas.firstChild) {
            div_body_empresas.removeChild(div_body_empresas.firstChild);
        }
    }

    function deleteDataDivProfissionais() {
        while (div_body_profissionais.firstChild) {
            div_body_profissionais.removeChild(div_body_profissionais.firstChild);
        }
    }

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

                    var btn_curriculos = document.getElementById("btn_curriculos");
                    btn_curriculos.addEventListener("click", function(evt) {
                        insertProfissionais(profissionais);
                    });
                }
            };
        }

        // Enviar a solicitação
        xhr.send();
    }

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
                    insertEmpresas(empresas);

                    var btn_curriculos = document.getElementById("btn_empresas");
                    btn_curriculos.addEventListener("click", function(evt) {
                        insertEmpresas(empresas);
                    });
                }
            };
        }

        // Enviar a solicitação
        xhr2.send();
    }
}

window.onload = init;