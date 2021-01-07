const _express = require('express');
const _server = _express();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "mysql-ip",
  user: "root",
  password: "root",
  database: "consultasDB"
});


const _port = 4000;

_server.get('/retoibm/sumar/:sumando01/:sumando02', function(request, response) {
  try{
    var _sumando01 = new Number(request.params.sumando01);
    var _sumando02 = new Number(request.params.sumando02);
    var _resultado = _sumando01 + _sumando02;
    
    if (typeof _resultado !== "undefined" && _resultado!==null && !isNaN(_resultado)){    
      return response.status(200).json({resultado : _resultado});
    }else{
      return response.status(400).json({resultado : "Bad Request"});
    }
    
    con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO consultasDB.consultas
            (sumado01
             , sumado02
             , resultado)
        VALUES ('_sumando01'
                , '_sumando02'
                , '_resultado');";
    con.query(sql, function (err, result) {
    if (err) throw err;
    });
    });
    
    
  }
  catch(e){
    return response.status(500).json({resultado : e});
  }
});


_server.listen(_port, () => {
   console.log(`Server listening at ${_port}`);
});
