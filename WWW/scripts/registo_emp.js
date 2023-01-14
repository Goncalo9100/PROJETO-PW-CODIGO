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

//Função que regista uma nova empresa
/*function newUserEmp() {
    var descricao = document.getElementById('desc_emp').value;

    var data = {
        Nome: document.getElementById('nome_emp').value,
        Email: document.getElementById('email_emp').value,
        Password: document.getElementById('password_emp').value,
        URLSite: document.getElementById('url_site').value,
        URLLogo: document.getElementById('url_logo').value,
        Descricao: descricao,
    };
    console.log(data);

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
}*/

//Função que cria uma nova empresa
function createEmpConf() {
    var descricao = document.getElementById('desc_emp').value;

    //Obter data atual para pedido de empresa
    var currentdate = new Date(); 
    var datetime = currentdate.getFullYear() + "-"
                    + (currentdate.getMonth()+1) + "-" 
                    + currentdate.getDate() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

    var data = {
        Nome: document.getElementById('nome_emp').value,
        Email: document.getElementById('email_emp').value,
        Password: document.getElementById('password_emp').value,
        URLSite: document.getElementById('url_site').value,
        URLLogo: document.getElementById('url_logo').value,
        Localidade: document.getElementById('localidade').value,
        Descricao: descricao,
        DataPedido: datetime,
    };
    console.log(data);

    var url = "/reg_emp";

    var xhttp2 = new XMLHttpRequest();
    //Open first, before setting the request headers.
    xhttp2.open("POST", url, true);
    xhttp2.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Empresa criada');
            //Limpar as caixas de texto todas
            document.forms["reg_empresa"].reset();
        }
    }
    xhttp2.send(JSON.stringify(data));
}

//Funcao que vai buscar o user criado
/*function getUser(data) {
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

                createEmp(data);
            }
        };
    }

    // Enviar a solicitação
    xhr.send();
}*/

window.onload = init;