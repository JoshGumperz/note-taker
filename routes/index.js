const express = require('express');


const notesRouter = require('./notes.html');

const app = express();

app.use('/notes', notesRouter);


module.exports = app;
