const fs = require("fs");
const connection = require("../config/connection")

module.exports = function (app) {

    //rest api para obter ofertas.
    app.get('/ofertas', function (req, res) {
        let query = "select ofertasemprego.idOferta, empresas.nomeEmpresa, area.descricao as areaDescricao, ofertasemprego.descricao, ofertasemprego.duracao, ofertasemprego.valor, ofertasemprego.dataValidade from ofertasemprego inner join empresas on ofertasemprego.Empresas_Users_idUser = empresas.Users_idUser inner join area on ofertasemprego.Area_idArea = area.idArea";
        connection.query(query, function (error, results, fields) {
            if (error) {
                res.render(error)
            }
            else {
                //res.status(200).render('pagina_ofertas_empregos.ejs', { title: 'ofertas', sampleData: results});
                res.end(JSON.stringify(results));
            }
            console.log(results);
        });
    });

    //rest api para obter areas.
    app.get('/areas', function (req, res) {
        let query = "select * from area";
        connection.query(query, function (error, results, fields) {
            if (error) {
                res.render(error)
            }
            else {
                //res.status(200).render('pagina_ofertas_empregos.ejs', { title: 'ofertas', sampleData: results});
                res.end(JSON.stringify(results));
            }
            console.log(results);
        });
    });

    //rest api para obter areas.
    app.get('/profissionais', function (req, res) {
        let query = "select * from profissionais";
        connection.query(query, function (error, results, fields) {
            if (error) {
                res.render(error)
            }
            else {
                //res.status(200).render('pagina_ofertas_empregos.ejs', { title: 'ofertas', sampleData: results});
                res.end(JSON.stringify(results));
            }
            console.log(results);
        });
    });

    //rest api para obter areas.
    app.get('/empresas', function (req, res) {
        let query = "select * from empresas";
        connection.query(query, function (error, results, fields) {
            if (error) {
                res.render(error)
            }
            else {
                //res.status(200).render('pagina_ofertas_empregos.ejs', { title: 'ofertas', sampleData: results});
                res.end(JSON.stringify(results));
            }
            console.log(results);
        });
    });
}