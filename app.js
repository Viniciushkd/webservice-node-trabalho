var express = require('express');
var load = require('express-load');
var cors = require('cors');

var app = express();
var bodyParser = require('body-parser');

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
global.db = mongoose.connect('mongodb://localhost:27017/banco_330870');

load('models').into(app);

var Funcionario = app.models.funcionarios;

//método do serviço
app.get('/', function (request, response) {
  response.send('Servidor no ar');
});

app.get('/funcionarios', function (request, response) {
  Funcionario.find(function (erro, funcionarios) {
    if (erro) {
      response.json(erro);
    }
    else {
      response.json(funcionarios);
    }
  });
});

app.get('/funcionarios/:id', function (request, response) {
  var id = request.params.id;
  console.log("id encontrado: " + id);
  Funcionario.findById(id, function (erro, funcionarios) {
    if (erro) {
      response.json(erro);
    }
    else {
      response.json(funcionarios);
    }
  });
});

app.post('/funcionarios', function (request, response) {
  var nome = request.body.nome;
  var cpf = request.body.cpf;
  var cargo = request.body.cargo; 
  var telefone = request.body.telefone;
  var email = request.body.email;

  var funcionario = {
    'nome': nome,
    'cpf': cpf, 
    'cargo': cargo,
    'telefone': telefone,
    'email': email
  };

  Funcionario.create(funcionario, function (erro, funcionario) {
    if (erro) {
      response.json(erro);
    }
    else {
      response.json(funcionario);
    }
  });

});

app.put('/funcionarios', function (request, response) {
  var id = request.params.id;

  Funcionario.findById(id, function (erro, funcionario) {
    if (erro) {
      response.json(erro);
    }
    else {

      var funcionario_upd = funcionario;
      funcionario_upd.nome = request.body.nome;
      funcionario_upd.cpf = request.body.cpf;
      funcionario_upd.cargo = request.body.cargo;
      funcionario_upd.telefone = request.body.telefone;
      funcionario_upd.email = request.body.email;

      funcionario_upd.save(function (erro, funcionario) {
        if (erro) {
          response.json(erro);
        }
        else {
          response.json(funcionario);
        }
      });
      response.json(funcionario);
    }
  });
  

});
app.delete('/funcionarios', function (request, response) {
  var id = request.params.id;

  Funcionario.remove(id, function (erro, funcionario) {
    if (erro) {
      response.json(erro);
    }
    else {
      response.send('removido');
    }
  });
});

app.listen(5000, function () {
  console.log('Webservice...');
});