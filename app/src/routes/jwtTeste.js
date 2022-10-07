const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const SECRET = 'kaikejwt'

app.use(bodyParser.json());

app.get('/', (req, res) =>{
  res.json({message : "Tudo ok por aqui"})
})

app.get('/clientes', (req, res) =>{
  res.json([{  id: 1, nome: 'kaike'}]);
})

app.post('/loginn', (req, res) =>{
  if(req.body.user === 'kaike' && req.body.password === '123'){
    const token = jwt.sign({userId: 1}, SECRET, {expiresIn: 300});
    return res.json({auth: true, token});
  }

  res.status(401).end();
})

app.listen(4000);