module.exports = function (app) {

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var funcionario = Schema({
        nome: { type: String, required: true },
        email: { type: String },
        idade: { type: Number },
        dataContratacao: { type: Date }
    });
    return mongoose.model('funcionarios', funcionario);
};