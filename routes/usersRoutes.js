const database = require("../config/connection")

module.exports = function (app) {

    //rest api para obter os dados de um simples produto.
    app.get('/produtos', function (req, res) {
        database.query('select * from tbl_livro', function (error, results, fields) {
        //if (error) throw error;

        if(error){
            res.render(error)
        }
        else{
            res.status(200).render('pagina_ofertas_empregos.ejs', {title:'ofertas', action:'list', sampleData:results});
        }
        //res.end(JSON.stringify(results));
        //console.log(results);
        });
    });

}