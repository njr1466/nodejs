
const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');
const connect = require('./connect.js');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const md5 = require('md5-nodejs');

const osservice = require('./service.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:3000"]
    }
  },
  // ['.routes/*.js']
  apis: ["app.js","SwaggerDoc.js"]
};



const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/testeservico/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



//definindo as rotas
const router = express.Router();

/**
 * @swagger
 * /acesso:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
  router.get('/testeservico', (req, res) => res.json({ message: 'Funcionando!' }));
  

  // CONSULTAR DADOS
  /**
 * @swagger
 * /testeservico/os:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
  router.get('/testeservico/clientes', (req, res) =>{
      osservice.getConsultaOs(req,res);
     })

// INSERIR DADOS
/**
 * @swagger
 * /testeservico/clientes:
 *  post:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
  router.post('/testeservico/clientes', (req, res) =>{

    osservice.inserirCliente(req,res);
})

// INSERIR USUARIO
/**
 * @swagger
 * /testeservico/clientes:
 *  post:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
  router.post('/testeservico/usuarios', (req, res) =>{
    var login = 'aluno';
    var email  = req.body.email;
    var senha  = req.body.senha;
    senha = md5(senha);
    var sql = "INSERT INTO usuario (login,email,senha) VALUES ('" + login + "', '" + email+"','" + senha+"')";
    console.log(sql);
    return connect.execSQLQuery(sql, res);
})


// CONSULTAR DADOS POR ID
/**
 * @swagger
 * /testeservico/os/21:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/testeservico/clientes/:id', (req, res) =>{

    osservice.getConsultarOsId(req,res);
})


// ALTERAR DADOS POR ID
/**
 * @swagger
 * /os:
 *  put:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.put('/testeservico/clientes/:id', (req, res) =>{

    var nome  = req.body.nome;
    console.log(nome);
    
    var sql = "update cliente set nome='" + req.body.nome + "', cpf='" + req.body.cpf + "', telefone='" + req.body.telefone + "' where id="+ req.params.id;
    console.log(sql);
    connect.execSQLQuery(sql, res);
})


// LOGIN DADOS 
/**
 * @swagger
 * /os:
 *  put:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/testeservico/login/', (req, res) =>{

    var email  = req.body.email;
    var senha  = req.body.senha;
    senha = md5(senha);

    
    var sql = "select email from usuario where email='" + email + "' and senha = '" + senha + "'";
    console.log(sql);
    connect.execSQLQuery(sql, res);
})

// DELETAR DADOS POR ID
/**
 * @swagger
 * /os:
 *  delete:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete('/testeservico/clientes/:id', (req, res) =>{

    var nome  = req.body.nome;
    console.log(nome);
    
    var sql = "delete from cliente where id="+ req.params.id;
    console.log(sql);
    connect.execSQLQuery(sql, res);
})



  app.use('/', router);
 




app.listen(port);
console.log('API funcionando 2!');