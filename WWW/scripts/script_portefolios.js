function init() {

    //inicializar botões da parte do filtro empresa/curriculo
    init_btn_filtro_emp_curr();
    
    function init_btn_filtro_emp_curr(){
        var btn_empresas = document.getElementById("btn_empresas");
        var btn_curriculos = document.getElementById("btn_curriculos");
        var div_cont_left_filt_curr = document.getElementById("div_container_left_filtros_curriculos");
        var div_cont_left_filt_emp = document.getElementById("div_container_left_filtros_empresas");
    
        btn_empresas.addEventListener("click", function(evt) {
            div_cont_left_filt_curr.style.display = "none";
            div_cont_left_filt_emp.style.display = "initial";
        });
    
        btn_curriculos.addEventListener("click", function(evt) {
            div_cont_left_filt_curr.style.display = "initial";
            div_cont_left_filt_emp.style.display = "none";
        });
    };
}

window.onload = init;