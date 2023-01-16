//Função para criar uma nova experiência na base de dados
function newExperience() {
    var dataFim = document.getElementById("i_fim").value;

    if(dataFim ===""){
        dataFim = "9999-12-31";
    }

    let info = {
        //@TODO quando souber qual é o user que está logado, colocar aqui o user
        IDUser: 1, //Este user é o que está na tabela de profissionais e não na dos users
        Cargo: document.getElementById("i_cargo").value,
        Empresa: document.getElementById("i_empresa").value,
        URLLogo: document.getElementById("i_logoempresa").value,
        Localizacao: document.getElementById("i_localizacao").value,
        DataInicio: document.getElementById("i_inicio").value,
        DataFim: dataFim,
        Descricao: document.getElementById("descr_func").value
    }

    var url = "/newExperience";

    var xhttp = new XMLHttpRequest();
    //Open first, before setting the request headers.
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Experiencia criada');
            //Limpar as caixas de texto todas
            document.forms["newExperience"].reset();
            //@TODO aqui tenho de saber que user é para retornar à pagina de perfil
            window.location.href = 'http://127.0.0.1:5502/pagina_inicial.html';
        }
    };
    xhttp.send(JSON.stringify(info));
}

function newDegree(){
    var tipo = document.getElementById("tipocurso");

    let info = {
        //@TODO Validações às datas de inicio e fim
        //@TODO quando souber qual é o user que está logado, colocar aqui o user
        IDUser: 1, //Este user é o que está na tabela de profissionais e não na dos users
        Curso: document.getElementById("i_curso").value,
        Estab: document.getElementById("i_estab").value,
        TipoCurso: tipo.options[tipo.selectedIndex].text,
        Media: document.getElementById("i_media").value,
        DataInicio: document.getElementById("i_inicio").value,
        DataFim: document.getElementById("i_fim").value
    }

    var url = "/newDegree";

    var xhttp2 = new XMLHttpRequest();
    //Open first, before setting the request headers.
    xhttp2.open("POST", url, true);
    xhttp2.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Curso criado');
            //Limpar as caixas de texto todas
            document.forms["newDegree"].reset();
            //@TODO aqui tenho de saber que user é para retornar à pagina de perfil
            window.location.href = 'http://127.0.0.1:5502/pagina_inicial.html';
        }
    };
    xhttp2.send(JSON.stringify(info));
}

function validarInicio(){
    
}