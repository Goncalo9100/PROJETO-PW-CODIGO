
/**
 * Exportar
 * @param {*} app 
 */
const { Console } = require("console");
const fs = require("fs");
const connection = require("../config/connection");

let idUser; //id do User
let nomeUser; //nome do User
let tipoUser; //tipo do User
let logged = 'N'; //Variavel para guardar se tem login efetuado ou não (N="Não" e S="Sim")


/**
 * Exportar
 * @param {*} app 
 */
module.exports = function (app) {
    /**
    * Função que confirma e seleciona a amizade que existe entre dois users
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o UserId do amigo e confirma se existe o pedido de amizade entre os dois users
    */
    app.get('/confirmAmizade/:amigo', function (req, res) { 

        let info=[req.params.amigo, idUser, 'R', idUser, req.params.amigo, 'R'];

        let query = "select * from pedidosamizade where ( Profissionais_idUser=? and idSoliciador=? and situacao<>? ) or ( Profissionais_idUser=? and idSoliciador=? and situacao<>? )";
        try {
            connection.query(query, info, function (error, results, fields) {
                if (error) {
                    //Tratar o erro aqui
                    res.status(500).send({ error: 'Ocorreu um erro ao processar sua solicitação' });
                } else if (results.length === 0) {
                    res.status(400).send({ error: 'Não existe pedidos de amizade' });
                }
                else {
                    res.status(200).end(JSON.stringify(results));
                }
            });
        } catch (err) {
            //Tratar o erro aqui
            res.status(500).send({ error: 'Ocorreu um erro inesperado' });
        }
    });

    /**
    * Função que executa todas as operações para obter as experiências
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o UserId do utilizador em que estamos a ver as experiencias
    */
    app.get('/experiencias/:user', function (req, res) {

        let query = "select * from experienciapro where Users_idUser=?";
        try {
            connection.query(query, req.params.user, function (error, results, fields) {
                if (error) {
                    //Tratar o erro aqui
                    res.status(500).send({ error: 'Ocorreu um erro ao processar sua solicitação' });
                } else {
                    res.status(200).end(JSON.stringify(results));
                }
            });
        } catch (err) {
            //Tratar o erro aqui
            res.status(500).send({ error: 'Ocorreu um erro inesperado' });
        }
    });

    /**
    * Função que verifica se e-mail de profissional já está em base de dados
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o email do utilizador e confirma se o email já está em uso
    */
    app.get('/confirmEmailPro/:email', function (req, res) {

        let query = "select * from profissionais where email=?";
        try {
            connection.query(query, req.params.email, function (error, results, fields) {
                if (error) {
                    //Tratar o erro aqui
                    res.status(500).send({ error: 'Ocorreu um erro ao processar sua solicitação' });
                } else if (results.length === 0) {
                    res.status(400).send({ error: 'Ocorreu um erro ao processar sua solicitação' });
                }
                else {
                    res.status(200).end(JSON.stringify(results));
                }
            });
        } catch (err) {
            //Tratar o erro aqui
            res.status(500).send({ error: 'Ocorreu um erro inesperado' });
        }
    });

    /**
    * Função que verifica se e-mail da empresa já está em base de dados
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o email da empresa e confirma se o email já está em uso
    */
    app.get('/confirmEmailEmp/:email', function (req, res) {

        let info = [req.params.email, "P", "A"];

        let query = "select * from empresaconfirma where email=? and situacao=? or situacao=?";
        try {
            connection.query(query, info, function (error, results, fields) {
                if (error) {
                    //Tratar o erro aqui
                    res.status(500).send({ error: 'Ocorreu um erro ao processar sua solicitação' });
                } else if (results.length === 0) {
                    res.status(400).send({ error: 'Não existe em base de dados' });
                }
                else {
                    res.status(200).end(JSON.stringify(results));
                }
            });
        } catch (err) {
            //Tratar o erro aqui
            res.status(500).send({ error: 'Ocorreu um erro inesperado' });
        }
    });

    /**
    * Função que executa todas as operações para obter os cursos
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o UserId do utilizador em que estamos a ver os cursos
    */
    app.get('/cursos/:user', function (req, res) {

        let query = "select * from habilitacoes where Users_idUser=?";
        try {
            connection.query(query, req.params.user, function (error, results, fields) {
                if (error) {
                    //Tratar o erro aqui
                    res.status(500).send({ error: 'Ocorreu um erro ao processar sua solicitação' });
                } else {
                    res.status(200).end(JSON.stringify(results));
                }
            });
        } catch (err) {
            //Tratar o erro aqui
            res.status(500).send({ error: 'Ocorreu um erro inesperado' });
        }
    });

    /**
    * Função que executa todas as operações para obter a informação do perfil do user profissional
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o UserId do user e obtêm as informações do mesmo
    */
    app.get('/userPro/:user', function (req, res) {

        let query = "select profissionais.Users_idUser, profissionais.nome, profissionais.descricao, profissionais.localidade, users.dataAdesao from profissionais inner join users on profissionais.Users_idUser = users.idUser where Users_idUser=?";

        try {
            connection.query(query, req.params.user, function (error, results, fields) {
                if (error) {
                    //Tratar o erro aqui
                    res.status(500).send({ error: 'Ocorreu um erro ao processar sua solicitação' });
                } else {
                    res.status(200).end(JSON.stringify(results));
                }
            });
        } catch (err) {
            //Tratar o erro aqui
            res.status(500).send({ error: 'Ocorreu um erro inesperado' });
        }
    });

    /**
    * Função que executa todas as operações para obter a informação da empresa
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o UserId da empresa e obtêm as informações da mesma
    */
    app.get('/userEmp/:user', function (req, res) {

        let query = "select empresas.Users_idUser, empresas.nomeEmpresa, empresas.descricao, empresas.localidade, users.dataAdesao from empresas inner join users on empresas.Users_idUser = users.idUser where Users_idUser=?";

        try {
            connection.query(query, req.params.user, function (error, results, fields) {
                if (error) {
                    //Tratar o erro aqui
                    res.status(500).send({ error: 'Ocorreu um erro ao processar sua solicitação' });
                } else {
                    res.status(200).end(JSON.stringify(results));
                }
            });
        } catch (err) {
            //Tratar o erro aqui
            res.status(500).send({ error: 'Ocorreu um erro inesperado' });
        }
    });

    /**
    * Função que executa todas as operações para criar uma nova oferta de emprego
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe todas as informações para criar a nova oferta e cria a mesma
    */
    app.post('/newOferta', function (req, res) {

        let info = [[req.body.IdUser, req.body.Area, req.body.Descricao, req.body.Duracao, req.body.Renumeracao, req.body.Validade]];
        console.log(info);
        let query = "INSERT INTO OfertasEmprego (Empresas_Users_idUser, Area_idArea, descricao, duracao, valor, dataValidade) VALUES ?";

        connection.query(query, [info], function (err, data) {
            if (err) {
            }
            else {
                res.status(200).send();
            }
        });
    });

    /**
    * Função que executa todas as operações para criar uma nova experiencia do utilizador
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe todas as informações para criar a nova experiencia
    */
    app.post('/newExperience', function (req, res) {

        let info = [[req.body.IDUser, req.body.Cargo, req.body.Empresa, req.body.URLLogo, req.body.Localizacao, req.body.Descricao, req.body.DataInicio, req.body.DataFim]];
        console.log(info);

        let query = "INSERT INTO experienciapro (Users_idUser, cargo, empresa, urlLogoEmp, localizacao, descriFunc, dataInicio, dataFim) VALUES ?";

        connection.query(query, [info], function (err, data) {
            if (err) {
                console.log("Error inserting : %s ", err);
            }
            else {
                res.status(200).send();
            }
        });

    });

    /**
    * Função que executa todas as operações para criar um novo curso feito pelo utilizador
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe todas as informações para criar o novo curso feito
    */
    app.post('/newDegree', function (req, res) {

        let info = [[req.body.IDUser, req.body.Curso, req.body.TipoCurso, req.body.Estab, req.body.Media, req.body.DataInicio, req.body.DataFim]];
        console.log(info);
        let query = "INSERT INTO habilitacoes (Users_idUser, curso, tipoCurso, estabelEnsino, mediaFinal, dataInicio, dataFim) VALUES ?";

        connection.query(query, [info], function (err, data) {
            if (err) {
            }
            else {
                res.status(200).send();
            }
        });
    });

    /**
    * Função que executa todas as operações necessárias para efetuar o login na aplicação para empresas
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o email, password e o UserId para fazer o login 
    */
    app.get('/loginEmpresa/:email/:password/:user', function (req, res) {
        let info = [req.params.email, req.params.password, req.params.user];
        console.log(info);
        let query = "select Users_idUser, nomeEmpresa from Empresas where email=? and password=? and Users_idUser=?";
        try {
            connection.query(query, info, function (error, results, fields) {
                if (error) {
                    //Tratar o erro aqui
                    res.status(500).send({ error: 'Ocorreu um erro ao processar sua solicitação' });
                }
                else if (results.length > 0) {
                    //Processar os resultados e enviá-los de volta para o cliente
                    idUser = results[0].Users_idUser;
                    nomeUser = results[0].nomeEmpresa;
                    tipoUser = 1;
                    logged = 'S';
                    res.status(200).send(results);
                } else {
                    //Se não houver resultados, enviar uma mensagem personalizada para o lado do cliente
                    res.status(204).send({ message: 'Não foram encontrados resultados para sua pesquisa' });
                }
            });
        } catch (err) {
            //Tratar o erro aqui
            res.status(500).send({ error: 'Ocorreu um erro inesperado' });
        }
    });

    /**
    * Função que executa todas as operações necessárias para efetuar o login na aplicação para profissionais
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o email, a password e o UserId para fazer o login
    */
    app.get('/loginProfissional/:email/:password/:user', function (req, res) {
        let info = [req.params.email, req.params.password, req.params.user];

        let query = "select Users_idUser, nome from profissionais where email=? and password=? and Users_idUser=?";

        try {
            connection.query(query, info, function (error, results, fields) {
                if (error) {
                    //Tratar o erro aqui
                    res.status(500).send({ error: 'Ocorreu um erro ao processar sua solicitação' });
                }
                else if (results.length > 0) {
                    //Processar os resultados e enviá-los de volta para o cliente
                    idUser = results[0].Users_idUser;
                    nomeUser = results[0].nome;
                    tipoUser = 2;
                    logged = 'S';
                    res.status(200).send(results);
                } else {
                    //Se não houver resultados, enviar uma mensagem personalizada para o lado do cliente
                    res.status(204).send({ message: 'Não foram encontrados resultados para sua pesquisa' });
                }
            });
        } catch (err) {
            //Tratar o erro aqui
            res.status(500).send({ error: 'Ocorreu um erro inesperado' });
        }

    });


    /**
     * Função que executa todas as operações necessárias para efetuar o login na aplicação para administradores
     * @param {*} Route caminho que despoleta esta função
     * @param {function} Callback recebe o email, password e o UserId para fazer o login
     */
    app.get('/loginAdmin/:email/:password/:user', function (req, res) {
        let info = [req.params.email, req.params.password, req.params.user];

        let query = "select Users_idUser, Nome from administradores where email=? and password=? and Users_idUser=?";

        try {
            connection.query(query, info, function (error, results, fields) {
                if (error) {
                    //Tratar o erro aqui
                    res.status(500).send({ error: 'Ocorreu um erro ao processar sua solicitação' });
                }
                else if (results.length > 0) {
                    //Processar os resultados e enviá-los de volta para o cliente
                    idUser = results[0].Users_idUser;
                    nomeUser = results[0].Nome;
                    tipoUser = 3;
                    logged = 'S';
                    res.status(200).send(results);
                } else {
                    //Se não houver resultados, enviar uma mensagem personalizada para o lado do cliente
                    res.status(204).send({ message: 'Não foram encontrados resultados para sua pesquisa' });
                }
            });
        } catch (err) {
            //Tratar o erro aqui
            res.status(500).send({ error: 'Ocorreu um erro inesperado' });
        }
    });

    /**
    * Função que executa todas as operações para obter o id do User que está a fazer login
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o email para obter o UserId
    */
    app.get('/userLogin/:email', function (req, res) {
        console.log(req.params.email);
        let query = "select idUser, TipoUser_idTipoUser from Users where email=?";

        try {
            connection.query(query, req.params.email, function (error, results, fields) {
                if (error) {
                    res.render(error)
                }
                else {
                    res.status(200).end(JSON.stringify(results));
                }
            });
        } catch { }
    })

    /**
    * Função que executa todas as operações para fazer logOut
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback faz logOut do user logado
    */
    app.get('/logOut', function (req, res) {
        idUser = 0;
        nomeUser = "";
        tipoUser = 0;
        logged = 'N';
        res.status(200).send();
    })

    /**
    * Função que executa todas as operações para criar um novo registo de uma nova empresa
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe todas as informações para criar o registo
    */
    app.post('/reg_emp', function (req, res) {
        //Registo das empresas
        let info = [[req.body.Nome, req.body.Descricao, req.body.URLSite, req.body.URLLogo, req.body.Email, req.body.Password, req.body.Localidade, req.body.DataPedido, 'P']];
        console.log(req.body);
        let query = "INSERT INTO empresaconfirma (nomeEmpresa, descricao, urlSite, urlLogo, email, password, localidade, dataPedido, situacao) VALUES ?";

        var delayInMilliseconds = 1000; //1 second

        setTimeout(function () {
            connection.query(query, [info], function (err, data) {
                if (err) {
                }
                else {
                    res.status(200).send();
                }
            });
        }, delayInMilliseconds);
    });

    /**
    * Função que executa todas as operações para criar uma nova empresa
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe todas as informações para criar a nova empresa
    */
    app.post('/criarEmp', function (req, res) {
        console.log(req);
        let info = [[req.body.IdUser, req.body.Nome, req.body.Descricao, req.body.UrlSite, req.body.UrlLogo, req.body.Email, req.body.Password, req.body.Localidade]];
        let query = "INSERT INTO empresas (Users_idUser, nomeEmpresa, descricao, urlSite, urlLogo, email, password, localidade) VALUES ?";
        var delayInMilliseconds = 500; //1 second

        setTimeout(function () {
            connection.query(query, [info], function (err, data) {
                if (err) {
                }
                else {
                    res.status(200).send();
                }
            });
        }, delayInMilliseconds);
    });

   /**
    * Função que executa todas as operações para criar um novo profissional
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe todas as informações para criar um novo profissional
    */
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
                }
                else {
                    res.status(200).send();
                }
            });
        }, delayInMilliseconds);
    });

    /**
    * Função que executa todas as operações para criar um novo pedido de amizade
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o UserId do profissional e cria o pedido de amizade com o user que está logado
    */
    app.post('/enviarPedidoAmizade/:idProfissional', function (req, res) {
        let info = [[req.params.idProfissional, idUser, "P"]];

        let query = "INSERT INTO pedidosamizade (Profissionais_idUser,idSoliciador,situacao) VALUES ?";

        connection.query(query, [info], function (error, data) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).send(JSON.stringify(data));
            }
        });
    });

    /**
    * Função que executa todas as operações para criar um novo User
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o tipo e o email para criar o novo user
    */
    app.post('/newUser/:idTipo', function (req, res) {
        var date = new Date();
        var datetime = date.getFullYear() + "-"
            + (date.getMonth() + 1) + "-"
            + date.getDate() + " "
            + date.getHours() + ":"
            + date.getMinutes() + ":"
            + date.getSeconds();
        let info = [[req.params.idTipo, datetime, req.body.Email]];
        console.log(info);
        let query = "INSERT INTO Users (TipoUser_idTipoUser,dataAdesao,email) VALUES ?";
        console.log("Query de insert: " + query);

        connection.query(query, [info], function (error, data) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).send(JSON.stringify(data));
            }
        });
    });

    /**
    * Função que executa todas as operações para obter as informações do User da tabela de users
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o email para obter o user
    */
    app.get('/getUser/:email', function (req, res) {
        console.log(req.params.email);
        //let info = [[req.params.email]];

        let query = "select * from Users where email = ?";

        connection.query(query, req.params.email, function (error, results, fields) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).end(JSON.stringify(results));
            }
        });
    });

    /**
    * Função que executa todas as operações para obter todos os pedidos de amizade para um user especifico
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o UserId para obter os pedidos de amizade
    */
    app.get('/pedidos/:idUser', function (req, res) {
        console.log(req.params.idUser);

        let query = "select pedidosamizade.idPedidosAmizade, profissionais.nome, pedidosamizade.idSoliciador from pedidosamizade inner join profissionais on pedidosamizade.idSoliciador = profissionais.Users_idUser where Profissionais_idUser = ? and situacao = 'P'";

        connection.query(query, req.params.idUser, function (error, results, fields) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).end(JSON.stringify(results));
            }
        });
    });

    /**
    * Função que executa todas as operações para obter os amigos de um user
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o UserId do user para obter os amigos
    */
    app.get('/amigos/:idUser', function (req, res) {
        console.log(req.params.idUser);

        let query = "select amigos.idAmigos, amigos.idAmigo, profissionais.nome, amigos.idAmigo, amigos.Profissionais_idUser from amigos inner join profissionais on amigos.idAmigo = profissionais.Users_idUser where Profissionais_idUser = ?";

        connection.query(query, req.params.idUser, function (error, results, fields) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).end(JSON.stringify(results));
            }
        });
    });

    /**
    * Função que executa todas as operações para eliminar um amigo
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o id do amigo e o id do profissional para eliminar a amizade
    */
    app.delete('/deleteAmigo/:idAmigo/:idProf', function (req, res) {
        let info = [req.params.idAmigo, req.params.idProf, req.params.idProf, req.params.idAmigo];
        var query = "DELETE FROM amigos Where ( idAmigo=? and Profissionais_idUser=? ) or (idAmigo=? and Profissionais_idUser=?)";

        connection.query(query, info, function (error, data) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).send(data);
            }

        });
    });

    /**
    * Função que executa todas as operações para eliminar o pedido de amizade antes enviado e validado
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o id do Amigo e do profissional para eliminar o pedido de amizade 
    */
    app.delete('/deletePedido/:idAmigo/:idProf', function (req, res) {
        let info = [req.params.idAmigo, req.params.idProf, req.params.idProf, req.params.idAmigo];
        var query = "DELETE FROM pedidosamizade Where ( idSoliciador=? and Profissionais_idUser=? ) or (idSoliciador=? and Profissionais_idUser=?)";

        connection.query(query, info, function (error, data) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).send(data);
            }

        });
    });

    /**
    * Função que executa todas as operações para eliminar uma empresa
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o UserId da empresa que é para eliminar
    */
    app.delete('/deleteEmpresa/:Users_idUser', function (req, res) {
        var query = "DELETE FROM empresas Where Users_idUser=?";

        connection.query(query, req.params.Users_idUser, function (error, data) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).send(data);
            }

        });
    });

    /**
    * Função que executa todas as operações para eliminar um user
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o UserId para eliminar o user
    */
    app.delete('/deleteUser/:Users_idUser', function (req, res) {
        var query = "DELETE FROM users Where idUser=?";

        connection.query(query, req.params.Users_idUser, function (error, data) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).send(data);
            }

        });
    });

    /**
    * Função que executa todas as operações para obter todas as ofertas que existem
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback obtêm todas as ofertas que existem
    */
    app.get('/ofertas', function (req, res) {
        let query = "select ofertasemprego.idOferta, empresas.nomeEmpresa, area.descricao as areaDescricao, ofertasemprego.descricao, ofertasemprego.duracao, ofertasemprego.valor, ofertasemprego.dataValidade from ofertasemprego inner join empresas on ofertasemprego.Empresas_Users_idUser = empresas.Users_idUser inner join area on ofertasemprego.Area_idArea = area.idArea";
        connection.query(query, function (error, results, fields) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).end(JSON.stringify(results));
            }
        });
    });

    /**
    * Função que executa todas as operações para obter as áreas que existem
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback obtêm todas as áreas que existem
    */
    app.get('/areas', function (req, res) {
        let query = "select * from area";
        connection.query(query, function (error, results, fields) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).end(JSON.stringify(results));
            }
        });
    });

    /**
    * Função que executa todas as operações para obter os profissionais
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback obtêm todos os profissionais
    */
    app.get('/profissionais', function (req, res) {
        let query = "select * from profissionais";
        connection.query(query, function (error, results, fields) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).end(JSON.stringify(results));
            }
        });
    });

    /**
    * Função que executa todas as operações para obter todas as empresas
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback obtêm todas as empresas
    */
    app.get('/empresas', function (req, res) {
        let query = "select * from empresas";
        connection.query(query, function (error, results, fields) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).end(JSON.stringify(results));
            }
        });
    });

    /**
    * Função que executa todas as operações para obter todos os pedidos de empresas que se querem registar
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback obtêm todos os pedidos das empresas que se querem registar
    */
    app.get('/pedidosEmp', function (req, res) {
        let query = "select * from empresaconfirma where situacao = 'P'";
        connection.query(query, function (error, results, fields) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).end(JSON.stringify(results));
            }
        });
    });

    /**
    * Função que executa todas as operações para crejeitar um pedido de amizade
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o id do pedido para rejeitar o mesmo
    */
    app.patch('/rejeitarAmigo/:idPedido', function (req, res) {
        var query = "UPDATE pedidosamizade Set situacao='R' Where idPedidosAmizade=?";
        connection.query(query, req.params.idPedido, function (error, result) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).send();
            }
        });
    });

    /**
    * Função que executa todas as operações para rejeitar uma empresa
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o id do pedido da empresa que se quer rejeitar 
    */
    app.patch('/rejeitarEmpresa/:idEmpresaConfirm', function (req, res) {
        var query = "UPDATE empresaconfirma Set situacao='R' Where idEmpresaConfirm=?";
        connection.query(query, req.params.idEmpresaConfirm, function (error, result) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).send();
            }
        });
    });

    /**
    * Função que executa todas as operações para obter um certo pedido de amizade
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o id do pedido de amizade para obter as informações do mesmo
    */
    app.get('/pedidoAmizade/:idPedido', function (req, res) {
        let query = "select * from pedidosamizade where idPedidosAmizade = ?";
        connection.query(query, req.params.idPedido, function (error, results, fields) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).end(JSON.stringify(results));
            }
        });
    });

    /**
    * Função que executa todas as operações para aceitar um pedido de amizade
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o id do pedido de amizade para aceitar o mesmo
    */
    app.patch('/aceitarAmigo/:idPedido', function (req, res) {
        var date = new Date();
        var datetime = date.getFullYear() + "-"
            + (date.getMonth() + 1) + "-"
            + date.getDate() + " "
            + date.getHours() + ":"
            + date.getMinutes() + ":"
            + date.getSeconds();
        let info = [datetime, req.params.idPedido];
        var query = "UPDATE pedidosamizade Set situacao='A', dataConfirmacao=? Where idPedidosAmizade=?";
        connection.query(query, info, function (error, result) {
            console.log(query);
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).send(JSON.stringify(result));
            }
        });
    });

    /**
    * Função que executa todas as operações para aceitar um pedido de empresa
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o id do pedido de empresa para aceitar o mesmo
    */
    app.patch('/aceitarEmpresa/:idPedido', function (req, res) {
        var query = "UPDATE empresaconfirma Set situacao='A' Where idEmpresaConfirm=?";
        connection.query(query, req.params.idPedido, function (error, result) {
            console.log(query);
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).send(JSON.stringify(result));
            }
        });
    });

    /**
    * Função que executa todas as operações para criar uma amizade
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o id profissional e do amigo para criar a amizade
    */
    app.post('/criarAmizade/:idProf/:idAmigo', function (req, res) {
        let info = [[req.params.idProf, req.params.idAmigo]];
        console.log(info);
        let query = "INSERT INTO amigos (Profissionais_idUser,idAmigo) VALUES ?";

        connection.query(query, [info], function (error, data) {
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).send();
            }
        });
    });

    /**
    * Função que executa todas as operações para a obter as informações do user que está com login efetuado
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback obtêm as informações do user que está com login efetuado
    */
    app.get('/getUserLogged', function (req, res) {
        if (logged == 'S') {
            let query;

            switch (tipoUser) {
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
                    res.status(200).end(JSON.stringify(results));
                }
            });
        } else { res.status(401).send(); }
    });

    /**
    * Função que executa todas as operações para ãtualizar informações do perfil do profissional
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o nome, descricao, localiadde e UserId a atualizar e atualiza as informações do profissional
    */
    app.patch('/atualizarProf/:nome/:descricao/:localidade/:Users_idUser', function (req, res) {

        let info = [req.params.nome, req.params.descricao, req.params.localidade, req.params.Users_idUser];

        var query = "UPDATE profissionais Set nome=?, descricao=?, localidade=? Where Users_idUser=?";
        connection.query(query, info, function (error, result) {
            console.log(query);
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).send(JSON.stringify(result));
            }
        });
    });

    /**
    * Função que executa todas as operações para ãtualizar informações do perfil da empresa
    * @param {*} Route caminho que despoleta esta função
    * @param {function} Callback recebe o nome, descricao, localiadde e UserId a atualizar e atualiza as informações da empresa
    */
    app.patch('/atualizarEmp/:nome/:descricao/:localidade/:Users_idUser', function (req, res) {

        let info = [req.params.nome, req.params.descricao, req.params.localidade, req.params.Users_idUser];

        var query = "UPDATE empresas Set nomeEmpresa=?, descricao=?, localidade=? Where Users_idUser=?";
        connection.query(query, info, function (error, result) {
            console.log(query);
            if (error) {
                res.render(error)
            }
            else {
                res.status(200).send(JSON.stringify(result));
            }
        });
    });
}