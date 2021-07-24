const notes = require('express').Router();
const { readFromFile, readAndAppend, removeNote } = require('../helpers/notesHelper.js');
const uniqid = require('uniqid')

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {
  // retrieve title and text from request body
  const { title, text } = req.body;
  // if request body has content in it, then create a new note with the title and text we retrieved, and give it a unique id
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uniqid()
    };
    // use readAndAppend function from notesHelper to append new note into db.json
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

// DELETE Route for deleting a note
notes.delete('/:id', (req, res) => {
  // get the id for the note the user wants to delete
  const id = req.params.id;
  // use removeNote function from notesHelper to remove the note with the id the user targetted
  removeNote(id, "./db/db.json");
  res.json('Note removed');
});

module.exports = notes;
