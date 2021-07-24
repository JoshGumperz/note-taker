const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
// use port number Heroku gives us, otherwise just use 3001
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// use index.js file from routes folder to handle all requests with /api URL path
app.use('/api', api);
// middleware to use what's in public folder for all static content
app.use(express.static('public'));
// for all requests to the initial / URL path, display index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// for all requests to the /notes URL path, display notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// for everything else, use index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);