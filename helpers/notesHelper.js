const fs = require('fs');
const util = require('util');
// use a promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
// write content in to db.json
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  // first read the existing content in db.json
  fs.readFile(file, 'utf8', (err, data) => {
    // if there's an error, throw console error
    if (err) {
      console.error(err);
    } else {
      // next parse the data in db.json, and push new content in to parsed data array.
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      // then use writeToFile function to write the updated array back into db.json
      writeToFile(file, parsedData);
    }
  });
};

const removeNote = (id, file) => {
  // same thing here, first read the existing content in db.json
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // again, parse the data in db.json, but this time use .filter to return a new array that filters out the note that the user wants to delete 
      const parsedData = JSON.parse(data);
      const noteRemoved = parsedData.filter(data => data.id !== id)
      // again use writeToFile function to write the new updated array into db.json
      writeToFile(file, noteRemoved);
    }
  });
}

module.exports = { readFromFile, writeToFile, readAndAppend, removeNote };
