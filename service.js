
const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');
const connect = require('./connect.js');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");



module.exports.getConsultaOs = (req,res) => {
    return connect.execSQLQuery('select * from cliente', res);
}

module.exports.getConsultarOsId = (req,res) => {
    var nome  = req.body.nome;
    console.log(nome);
    
    var sql = "select * from cliente  where id="+ req.params.id;
    console.log(sql);
   return  connect.execSQLQuery(sql, res);
}

module.exports.inserirCliente = (req,res) => {
    var nome  = req.body.nome;
    var cpf = req.body.cpf;
    var telefone = req.body.telefone;
    var id = 23;
    console.log(nome);
    
    var sql = "INSERT INTO cliente (nome,cpf,telefone,id_usuario,datacadastro) VALUES ('" + nome + "', '" + cpf+"','" + telefone+"'," + id+",NOW())";
    console.log(sql);
    return connect.execSQLQuery(sql, res);
}




 