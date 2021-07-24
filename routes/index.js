const express = require('express');


const notesRouter = require('./notes');

const app = express();

// use notes.js file to handle all requests with /api/notes URL path
app.use('/notes', notesRouter);


module.exports = app;
