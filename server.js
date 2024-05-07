const express = require('express');
const bodyParse = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3003

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loginDB'
});

db.getConnection((error) => {
    if(error){
        console.error(`Erro ao conectar com o banco de dados: ${error.message}`)
    } else {
        console.log('Conectado ao banco de dados!');
    }
});

app.set('view engine, ejs');
app.use(express.static('public'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({
    extended: true
}));


app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/view/html/register.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/view/html/login.html');
});

app.post('/logout', (req, res) => {
    res.redirect('/login');
});



//
app.post('/register', async (req, res) => {

    const {name, username, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const sql = 'insert into users(name, username, password) values(?, ?, ?)'

    db.query(sql, [name, username, hashedPassword], (error, result) => {

        if (error) {
            const msg = "Erro ao registrar suário:" + error.message
            res.render(__dirname + '/view/register.ejs', {msg});

        } else {
            const msg = "Usuário registrado com sucesso com o id: " + result.insertId
            console.log(msg);
            res.redirect('/login');
        }
    });
});

app.post('/login', (req, res) => {
    const {username, password} = req.body
    const sql = 'select * from users where username = ?'
    db.query(sql, [username], async (error, result) => {

        if (error) {
            
            const msg = 'Erro ao buscar usuários: ' + error.message
            res.render(__dirname + '/view/login.ejs', {msg})

        } else {

            if (result.length === 0) {

                const msg = 'Usuário não encontrado'
                res.render(__dirname + '/view/html/login.ejs', {msg})

            } else {
                
                const match = await bcrypt.compare(password, result[0].password)

                if (match) {
                    const msg = result[0].name
                    res.render(__dirname + '/view/page.ejs', {msg});
                } else {
                    const msg = 'Senha errada!'
                    res.render(__dirname + '/view/html/login.ejs', {msg});
                }
            }
        }
    });
});



app.listen(port, ()=> {
    console.log(`Servidor rodando na porta: ${port}`)
});