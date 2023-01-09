var bodyParser = require('body-parser');
var logger = require('morgan');
var express = require('express');
var cors = require("cors");

var app = express();

//app.set("port", process.env.PORT || 4000);

/**
 * Configurações do Express
 */                                                                               
app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(express.static(__dirname + '/public/'));

app.use(cors());
app.use(logger("dev"));
//inicio da configuração do body-parser
app.use(bodyParser.json());       // para suportar 'body' JSON-encoded
app.use(bodyParser.urlencoded({   // para supportar 'body' URL-encoded
    extended: true
}));
//fim de configuração do body-parser

/**
 * Definição estátitica, fornece as páginas HTML tal como estão na pasta www
 */
app.use(express.static('WWW'));

/**
 * Roteamento
 */
require('./routes/usersRoutes')(app);


var server = app.listen(5502, "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Aplicação Express à escuta em http://%s:%s/pagina_ofertas_emprego.html", host, port)

});


/*
app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/pagina_inicial.html`);
});
*/

exports = module.exports = app;