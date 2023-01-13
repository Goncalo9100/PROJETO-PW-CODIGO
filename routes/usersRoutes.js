const { Console } = require("console");
const fs = require("fs");
const connection = require("../config/connection")

module.exports = function (app) {

    app.post('/reg_emp', function (req, res) {
        //Registo das empresas
        console.log("sucesso empresa");
        //Registo das empresas
        let info = [[req.body.IdUser, req.body.Nome, req.body.Descricao, req.body.URLSite, req.body.URLLogo, req.body.Email, req.body.Password]];
        console.log(req.body);
        let query = "INSERT INTO Empresas (Users_idUser,nomeEmpresa, descricao, urlSite, urlLogo, email, password) VALUES ?";

        console.log("INFO " + info);
        var delayInMilliseconds = 1000; //1 second

        setTimeout(function () {
            connection.query(query, [info], function (err, data) {
                if (err) {
                    console.log("Error inserting : %s ", err);
                }
                else {
                    console.log(data);
                    res.status(200).send();
                }
            });
        }, delayInMilliseconds);
    });

    //Cria novo profissional
    app.post('/reg_pro', function (req, res) {
        console.log("sucesso");
        //Registo dos profissionais
        let info = [[req.body.IdUser, req.body.Nome, req.body.Email, req.body.Password, req.body.DataNas, req.body.Localidade, req.body.Genero, req.body.Descricao, req.body.isVisible]];
        console.log(req.body);
        let query = "INSERT INTO Profissionais (Users_idUser,nome,email,password,dataNasc,localidade,genero,descricao,isVisible) VALUES ?";

        console.log("INFO " + info);
        var delayInMilliseconds = 1000; //1 second

        setTimeout(function () {
            connection.query(query, [info], function (err, data) {
                if (err) {
                    console.log("Error inserting : %s ", err);
                }
                else {
                    console.log(data);
                    res.status(200).send();
                }
            });
        }, delayInMilliseconds);
    });

    //Criar novo user
    app.post('/newUser/:idTipo', function (req, res) {
        let info = [[req.params.idTipo, '2022-10-13', req.body.Email]];
        console.log(info);
        let query = "INSERT INTO Users (TipoUser_idTipoUser,dataAdesao,email) VALUES ?";
        console.log("Query de insert: " + query);

        connection.query(query, [info], function (error, data) {
            if (error) {
                res.render(error)
            }
            else {
                console.log(data);
                res.status(200).send();
            }
        });
    });

    app.get('/getUser/:email', function (req, res) {
        console.log(req.params.email);
        //let info = [[req.params.email]];

        let query = "select * from Users where email = ?";

        connection.query(query, req.params.email, function (error, results, fields) {
            if (error) {
                res.render(error)
            }
            else {
                console.log(results);
                res.end(JSON.stringify(results));
            }
        });
    });

    app.get('/pedidos/:idUser', function (req, res) {
        console.log(req.params.idUser);

        let query = "select pedidosamizade.idPedidosAmizade, profissionais.nome from pedidosamizade inner join profissionais on pedidosamizade.idSoliciador = profissionais.idProfissional where Profissionais_idUser = ?";
        //let query = "select * from pedidosamizade"

        connection.query(query, req.params.idUser, function (error, results, fields) {
            if (error) {
                res.render(error)
            }
            else {
                console.log(results);
                res.end(JSON.stringify(results));
            }
        });
    });

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