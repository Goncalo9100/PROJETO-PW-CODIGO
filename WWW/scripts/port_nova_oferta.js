function init() {
    obterAreas();


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

                    var select = document.getElementById("area");

                    for (var i = 0; i < areas.length; i++) {
                        select.options[select.options.length] = new Option(areas[i].descricao, areas[i].descricao);
                    }
                }
            };
        }

        // Enviar a solicitação
        xhr2.send();
    }
}




function novaOferta() {

}

window.onload = init();