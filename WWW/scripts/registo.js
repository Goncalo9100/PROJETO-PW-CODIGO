/**
 * Função chamada quando página é carregada
 */
function init(){

    var btn_empre = document.getElementById("btn_empre"); //Botão de registo da tab de empresas
    var btn_profi = document.getElementById("btn_profi"); //Botão de registo da tab de profissionais
    var div_emp = document.getElementById("reg_emp"); //DIV com a informação para registar uma empresa
    var div_pro = document.getElementById("reg_pro");//DIV com a informação para registar um profissional
    
    btn_empre.addEventListener("click", function(evt){
        btn_empre.style.color ="#123370"; //Azul
        btn_profi.style.color ="#aaaaaa"; //Cinzento
        div_emp.style.display = "initial";
        div_pro.style.display = "none";
    });
    
    btn_profi.addEventListener("click", function(evt){
        btn_profi.style.color ="#123370"; //Azul
        btn_empre.style.color ="#aaaaaa"; //Cinzento
        div_emp.style.display = "none";
        div_pro.style.display = "initial";
    });
    
    }
    
    
    window.onload = init;