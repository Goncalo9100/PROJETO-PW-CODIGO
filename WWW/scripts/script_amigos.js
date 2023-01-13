/**
 * Função chamada quando página é carregada
 */
function init() {
    var pedidosAmizade;
    var divPedidos = document.getElementById("div_pedidos_scroll");

    obterPedidosAmizade();

    function insertPedidos() {
        deleteDivPedidos();

        for(var elem of pedidosAmizade) {
            var div_pedido = document.createElement("div"); //div com toda a info do pedido
            div_pedido.className = "div_pedido";

            var div_pedido_row = document.createElement("div"); //div com toda a info do pedido
            div_pedido_row.className = "div_pedido_row";

            var p_idPed = document.createElement("p");
            p_idPed.style.display = "none";

            var div_imagem = document.createElement("div"); //Div com imagem do user
            div_imagem.className = "div_pedido_img";
            var img = document.createElement("img");
            img.className = "img_pedido";
            img.src = "imagens/person_icon.png";
            div_imagem.appendChild(img);

            var h1_nome = document.createElement("h1");
            h1_nome.textContent = elem.nome;
            h1_nome.className = "h1_nome_pedido";

            var btn_aceitar = document.createElement("button");
            btn_aceitar.className = "btn_aceitar";
            btn_aceitar.textContent = "Aceitar";
            btn_aceitar.addEventListener("click", function () { aceitarPedido(elem.idPedidosAmizade); } );

            var btn_rejeitar = document.createElement("button");
            btn_rejeitar.className = "btn_rejeitar";
            btn_rejeitar.textContent = "Rejeitar";
            btn_rejeitar.addEventListener("click", function () { rejeitarPedido(elem.idPedidosAmizade); } );

            var hr = document.createElement("hr");
            hr.className = "hr_pedido";

            div_pedido_row.appendChild(p_idPed);
            div_pedido_row.appendChild(div_imagem);
            div_pedido_row.appendChild(h1_nome);
            div_pedido_row.appendChild(btn_aceitar);
            div_pedido_row.appendChild(btn_rejeitar);
            div_pedido.appendChild(div_pedido_row);
            div_pedido.appendChild(hr);
            divPedidos.appendChild(div_pedido);
        }
    }

    function deleteDivPedidos() {
        console.log(divPedidos);
        while (divPedidos.firstChild) {
            divPedidos.removeChild(divPedidos.firstChild);
        }
    }

    function aceitarPedido(idPedido) {
        console.log(idPedido);
    }

    function rejeitarPedido(idPedido) {
        console.log(idPedido);
    }

    function obterPedidosAmizade() {
        // Criar a instância de XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr) {
            // Configurar a solicitação
            let url = "http://127.0.0.1:5502/pedidos/" + 2;
            xhr.open('GET', url, true);

            // Definir a função de retorno de chamada
            xhr.onreadystatechange = function () {
                if ((xhr.readyState === 4) && (xhr.status === 200)) {
                    pedidosAmizade = JSON.parse(xhr.responseText);
                    insertPedidos();
                }
            };
        }

        // Enviar a solicitação
        xhr.send();
    }
}

window.onload = init;