/**
 * Função chamada quando página é carregada
 */
function init() {
    var user;

    getUserLogged();

    function verifyUser() {
        var btn_menu_amigos = document.getElementById("btn_menu_amigos");
        var btn_menu_empresas = document.getElementById("btn_menu_empresas");
        
        switch(user[0].TipoUser_idTipoUser) {
            case 1:
                btn_menu_amigos.style.display = "none";
                btn_menu_empresas.style.display = "none";
                break;
            case 2:
                btn_menu_empresas.style.display = "none";
                break;
            case 3:
                btn_menu_amigos.style.display = "none";
                break;
            default:
        }
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