
var express  = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const dbMsql = require('mySql');


//executando query SQL   
function execSql(sql,response){
    
    const db = dbMsql.createConnection ({// string de conexão com o banco de dados
        host:'dbproducaounin9.mysql.database.azure.com', // insira seu host
        user:'dbuserprod@dbproducaounin9', // insira seu usuário do banco de dados
        password:'eA7xs#6%Q', // senha 
        database:'dbproducaounin9', // nome da base
        port:3306,
        ssl: true,
        
    });
    
    db.connect(function(erro){
        if(erro) throw (erro);
        else
        console.log("conectado com sucesso");
        
    });
    
    db.query(sql, function(error,results, fiedls){
        if(error)
        response.json(error);
        else
        response.json(results);
        console.log("query executada com sucesso");
        db.end();
    });
    
    
}

app.get('/usuarios/:id', function(request, response){
    let id = request.params.id;
    const sqlQuery = `select * from usuario where id  = ${id}`;
    execSql(sqlQuery,response);
});

app.get('/usuarios', function(request, response){
    const sqlQuery = `select * from usuario`;
    execSql(sqlQuery,response);
});



app.post('/usuarios', function(req,res){
    const { usuario, senha} = req.body;
    const sqlQuery = `insert into usuario(usuario,senha) values('${usuario}','${senha}');`
    execSql(sqlQuery,res);
})


app.delete('/usuarios/:id', function(req,res){
    const id = req.params.id
    const sqlQuery = `delete from usuario where id = ${id};`;
    execSql(sqlQuery,res);
    
})

app.put('/usuarios', function(req,res){
    const {id, usuario, senha} = req.body;
    const sqlQuery = `update usuario 
    set usuario = "${usuario}", senha = "${senha}"
    where id = ${id};`;
    
    execSql(sqlQuery,res);
    
});

app.get("/" ,function(req,res){
    res.send('hello word')
});

app.listen(3000, function(){
    console.log('porta de saida localhost:3000/usuario');

});

module.exports = app;
