module.exports = function (app) {

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var funcionario = Schema({
        nome: { type: String, required: true },
        cpf: { type: String },
        cargo: { type: String },
        telefone: { type: Number },
        email: { type: String }
    });
    return mongoose.model('funcionarios', funcionario);
};