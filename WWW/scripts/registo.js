/**
 * Função chamada quando página é carregada
 */
function init() {

    var btn_empre = document.getElementById("btn_empre"); //Botão de registo da tab de empresas
    var btn_profi = document.getElementById("btn_profi"); //Botão de registo da tab de profissionais
    var div_emp = document.getElementById("reg_emp"); //DIV com a informação para registar uma empresa
    var div_pro = document.getElementById("reg_pro");//DIV com a informação para registar um profissional

    btn_empre.addEventListener("click", function (evt) {
        btn_empre.style.color = "#123370"; //Azul
        btn_profi.style.color = "#aaaaaa"; //Cinzento
        div_emp.style.display = "initial";
        div_pro.style.display = "none";
    });

    btn_profi.addEventListener("click", function (evt) {
        btn_profi.style.color = "#123370"; //Azul
        btn_empre.style.color = "#aaaaaa"; //Cinzento
        div_emp.style.display = "none";
        div_pro.style.display = "initial";
    });
}

var user;

/**
* Função que regista um novo user
*/
function newUserPro() {
    const dataAtual = new Date();
    let day = dataAtual.getDate();
    let month = dataAtual.getMonth();
    let year = dataAtual.getFullYear();

    var gen = document.getElementById('genero_pro');
    var visible = document.getElementById('visiblePro');
    var descricao = document.getElementById('desc_pro').value;
    var dataNas = document.getElementById('dataNasc_pro').value;
    var localidade = document.getElementById('local_pro').value;
    var vis = 0;

    //Transforma dados para não dar erro na BD
    if (visible.checked == true) {
        vis = 1;
    }

    //Validação para a descrição
    if (descricao === '') {
        descricao = "Não tenho nada a dizer! :(";
    }

    //Validação para a data de nascimento
    let currentDate = `${year}-${month}-${day}`;

    var anoNas = dataNas.slice(0, 4);
    var mesNas = dataNas.slice(4, 2);

    //Calcular Idade
    let idade = parseInt(year) - parseInt(anoNas);
    if (month > mesNas) {
        idade = idade + 1;
    } else {
        idade = idade - 1;
    }
    if (idade < 18) {
        document.getElementById("erroDatNas").textContent = "Tens de ter mais de 18 anos para te registares!";
        return false;
    }
    if (dataNas > currentDate) {
        document.getElementById("erroDatNas").textContent = "A data de nascimento está superior à data atual!";
        return false;
    } else {
        document.getElementById("erroDatNas").textContent = "";
    }

    //Validação para a localidade
    if (localidade === '') {
        localidade = "N/A";
    }

    var data = {
        Nome: document.getElementById('nome_pro').value,
        Email: document.getElementById('email_pro').value,
        Password: document.getElementById('password_pro').value,
        DataNas: dataNas,
        Localidade: localidade,
        Genero: gen.options[gen.selectedIndex].text,
        Descricao: descricao,
        isVisible: vis
    };
    console.log(data);

    var url = "/newUser/" + 2;

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
* Função que regista um novo profissional
* @param dataPro - informação do profissional
*/
function createPro(dataPro) {
    console.log(dataPro);

    var url = "/reg_pro";

    var xhttp2 = new XMLHttpRequest();
    //Open first, before setting the request headers.
    xhttp2.open("POST", url, true);
    xhttp2.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Utilizador criado');
            //Limpar as caixas de texto todas
            document.forms["reg_profissional"].reset();
        }
    }
    xhttp2.send(JSON.stringify(dataPro));
}

/**
* Função que obtem o user criado
* @param data - informação inserida
*/
function getUser(data) {
    // Criar a instância de XMLHttpRequest
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (xhr) {
        let url = "http://127.0.0.1:5502/getUser/" + data.Email;
        // Configurar a solicitação
        xhr.open('GET', url, true);

        // Definir a função de retorno de chamada
        xhr.onreadystatechange = function () {
            if ((xhr.readyState === 4) && (xhr.status === 200)) {
                // Fazer algo com os dados recebidos
                var resultado = JSON.parse(xhr.responseText);
                var linhaResultado = resultado[0];

                data.IdUser = linhaResultado["idUser"];

                createPro(data);
            }
        };
    }

    // Enviar a solicitação
    xhr.send();
}

/**
* Função que confirma se o email já existe
*/
function confirmEmail() {
    var data = {
        Email: document.getElementById('email_pro').value
    }

    // Criar a instância de XMLHttpRequest
    if (window.XMLHttpRequest) {
        xhr_confirm = new XMLHttpRequest();
    } else {
        xhr_confirm = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (xhr_confirm) {
        let url = "http://127.0.0.1:5502/confirmEmailPro/" + data.Email;
        // Configurar a solicitação
        xhr_confirm.open('GET', url, true);

        // Definir a função de retorno de chamada
        xhr_confirm.onreadystatechange = function () {
            if ((xhr_confirm.readyState === 4) && (xhr_confirm.status !== 200)) {
                newUserPro();
            } else if ((xhr_confirm.readyState === 4) && (xhr_confirm.status === 200)) {
                console.log(xhr_confirm.status);
                alert("E-mail já registado em base de dados");
            }
        };
    }

    // Enviar a solicitação
    xhr_confirm.send();
}

window.onload = init;