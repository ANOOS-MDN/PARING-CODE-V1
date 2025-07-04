const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const code = require('./pair'); // moved to same folder for Vercel

app.use('/code', code);

app.use('/pair', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pair.html'));
});

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/main.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
