/**
 * Função chamada quando página é carregada
 */
function init(){

var btn_logintab = document.getElementById("btn_tabaut");
var btn_registab = document.getElementById("btn_tabreg");

//Evento que faz alterar a cor do texto das link tabs na página de lógin e de registo
btn_logintab.addEventListener("click", function(evt){
    btn_logintab.style.color ="#123370"; //Azul
    btn_registab.style.color ="#aaaaaa"; //Cinzento
});

btn_registab.addEventListener("click", function(evt){
    btn_registab.style.color ="#123370"; //Azul
    btn_logintab.style.color ="#aaaaaa"; //Cinzento
});
}


function login(){
    var info = {
        email: document.getElementById('i_email').value,
        password: document.getElementById('i_password').value
    };

    var url = "http://127.0.0.1:5502/userLogin/" + info.email;

    var xhttp = new XMLHttpRequest();
    //Open first, before setting the request headers.
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200)
        {   
            var resultado = JSON.parse(xhttp.responseText);
            loginFinal(resultado, info);
        }
    };
    xhttp.send();
}

function loginFinal(resultado, info){
    let url;

    console.log(resultado[0].TipoUser_idTipoUser);
   
    switch(resultado[0].TipoUser_idTipoUser){
        //Empresa
        case 1:
            url = "http://127.0.0.1:5502/loginEmpresa/";
            break;
        //Profissional
        case 2:
            url = "http://127.0.0.1:5502/loginProfissional/";
            break;
        //Administrador
        case 3:
            url = "http://127.0.0.1:5502/loginAdmin/";
            break;
        default:
    }

    let data = { 
        User: resultado[0].idUser,
        Password: info.password,
        Email: info.email
    };

    url += info.email + "/" + info.password + "/" + resultado[0].idUser;

    var xhttp2 = new XMLHttpRequest();
    //Open first, before setting the request headers.
    xhttp2.open("GET", url, true);
    xhttp2.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp2.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200)
        {   
            window.location.href = 'http://127.0.0.1:5502/pagina_inicial.html';
        }else if(this.readyState == 4 && this.status == 204){
            document.getElementById("errologin").textContent = "E-mail ou password errada!";
            //alert('Email ou Password errados');
        }
    };
    xhttp2.send(JSON.stringify(data));
}

window.onload = init;