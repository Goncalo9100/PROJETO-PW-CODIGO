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



window.onload = init;