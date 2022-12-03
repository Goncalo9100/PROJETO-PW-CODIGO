function init() {

    //inicializar botões da parte do filtro empresa/curriculo
    init_btn_filtro_emp_curr();
    
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
}

window.onload = init;