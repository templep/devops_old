const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('./database/database.db')
db.run("create table if not exists users(username TEXT PRIMARY KEY, password TEXT)")


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/index.html'));
});

app.post("/", function (req, res) {
    console.log(req.body);
    db.get(`SELECT username usr, password pswd FROM users WHERE username='${req.body.username}'`,[],(err, row)=>{
        if(err){
            console.log(err)
        }
        else{
            if(row === undefined){
                db.run(`INSERT INTO users(username, password) values('${req.body.username}', '${req.body.password}')`)
                res.sendFile(path.join(__dirname, 'html/success.html'));
            }
            else{
                if(req.body.password === row.pswd){
                    res.sendFile(path.join(__dirname, 'html/success.html'));
                }
            }
        }
    })  
});  

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});
