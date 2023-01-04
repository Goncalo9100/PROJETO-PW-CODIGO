const database = require("../config/connection")

module.exports = function (app) {

    //rest api para obter os dados de um simples produto.
    app.get('/ofertas', function (req, res) {
        let query = "select ofertasemprego.idOferta, empresas.nomeEmpresa, area.descricao as areaDescricao, ofertasemprego.descricao, ofertasemprego.duracao, ofertasemprego.valor, ofertasemprego.dataValidade from ofertasemprego inner join empresas on ofertasemprego.Empresas_Users_idUser = empresas.Users_idUser inner join area on ofertasemprego.Area_idArea = area.idArea";
        database.query(query, function (error, results, fields) {
            //if (error) throw error;

            if (error) {
                res.render(error)
            }
            else {
                res.status(200).render('pagina_ofertas_empregos.ejs', { title: 'ofertas', action: 'list', sampleData: results });
            }
            //res.end(JSON.stringify(results));
            //console.log(results);
        });
    });

}

//'select * from ofertasemprego'