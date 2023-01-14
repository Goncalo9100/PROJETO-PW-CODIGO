const { Console } = require("console");
const fs = require("fs");
const connection = require("../config/connection");

let idUser;
let nomeUser;
let tipoUser;
let logged = 'N';


module.exports = function (app) {

    /**
 * Função que executa todas as operações necessárias para efetuar o login na aplicação
 * @param {*} Route caminho que despoleta esta função
 * @param {function} Callback recebe o email e a password que o utilizador introduziu e confirma se existe algum utilizador na base de dados com as mesmas credenciais
 */
    app.get('/loginEmpresa/:email/:password/:user', function (req, res) {
        let info = [req.params.email,req.params.password, req.params.user]; 
        
        let query = "select Users_idUser, nomeEmpresa from Empresas where email=? and password=? and Users_idUser=?";

        connection.query(query, info, function (error, results, fields) {
            if (error) {
                res.render(error)
            }
            else {
                idUser = results[0].Users_idUser;
                nomeUser = results[0].nomeEmpresa;
                tipoUser = 1;
                logged = 'S';

                res.end(JSON.stringify(results));
            }
        });

    });

    app.get('/userLogin/:email', function(req, res){
        console.log(req.params.email);
        let query = "select idUser, TipoUser_idTipoUser from Users where email=?";

        connection.query(query, req.params.email, function (error, results, fields) {
            if (error) {
                console.log(query);
                res.render(error)
            }
            else {
                console.log(query);
                console.log(results);
                res.end(JSON.stringify(results));
            }
        });
        
    })
    //-------------------------------------------------------------------------

    app.post('/reg_emp', function (req, res) {
        //Registo das empresas
        console.log("sucesso empresa");
        //Registo das empresas
        let info = [[req.body.Nome, req.body.Descricao, req.body.URLSite, req.body.URLLogo, req.body.Email, req.body.Password, req.body.Localidade, req.body.DataPedido, 'P']];
        console.log(req.body);
        let query = "INSERT INTO empresaconfirma (nomeEmpresa, descricao, urlSite, urlLogo, email, password, localidade, dataPedido, situacao) VALUES ?";

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

        let query = "select pedidosamizade.idPedidosAmizade, profissionais.nome from pedidosamizade inner join profissionais on pedidosamizade.idSoliciador = profissionais.Users_idUser where Profissionais_idUser = ? and situacao = 'P'";

        connection.query(query, req.params.idUser, function (error, results, fields) {
            if (error) {
                res.render(error)
            }
            else {
                res.end(JSON.stringify(results));
            }
        });
    });

    app.get('/amigos/:idUser', function (req, res) {
        console.log(req.params.idUser);

        let query = "select amigos.idAmigo, profissionais.nome from amigos inner join profissionais on amigos.idAmigo = profissionais.Users_idUser where Profissionais_idUser = ?";

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

    app.patch('/rejeitarAmigo/:idPedido', function (req, res) { 
        var query = "UPDATE pedidosamizade Set situacao='R' Where idPedidosAmizade=?";
        connection.query(query, req.params.idPedido, function(error,result){
            if(error){
                res.render(error)
            }
            else{
                console.log(result);
                res.status(200).send();
            }
        }); 
    });

    app.get('/getUserLogged', function (req, res) {
        if(logged=='S') {
            let query;

            switch(tipoUser) {
                case 1:
                    query = "select users.TipoUser_idTipoUser, empresas.Users_idUser, empresas.nomeEmpresa as nome from empresas inner join users on empresas.Users_idUser = users.idUser where Users_idUser=?"
                    break;
                case 2:
                    query = "select users.TipoUser_idTipoUser, profissionais.Users_idUser, profissionais.nome from profissionais inner join users on profissionais.Users_idUser = users.idUser where Users_idUser=?"
                    break;
                case 3:
                    query = "select users.TipoUser_idTipoUser, administradores.Users_idUser, administradores.nome from administradores inner join users on administradores.Users_idUser = users.idUser where Users_idUser=?"
                    break;
                default:
            }

            connection.query(query, idUser, function (error, results, fields) {
                if (error) {
                    res.render(error)
                }
                else {
                    //res.status(200).render('pagina_ofertas_empregos.ejs', { title: 'ofertas', sampleData: results});
                    res.end(JSON.stringify(results));
                }
                console.log(results);
            });
        }else{res.status(401).send();}
    });
}