const mysql = require('mysql');



function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
      host     : 'localhost',
      port     : '3306',
      user     : 'profes11_ospush',
      password : '190285bill',
      database : 'profes11_ospush'
    });
   
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
  }

  exports.execSQLQuery = execSQLQuery;