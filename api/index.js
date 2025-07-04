const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");

let code = require('../pair'); // Update this if needed

app.use('/code', code);

app.use('/pair', (req, res) => {
  res.sendFile(path.join(__dirname, '../pair.html'));
});

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../main.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
