const fs = require('fs');

var originalNote = {};

var originalNoteString = JSON.stringify(originalNote);

fs.writeFile('notes.json' , originalNoteString);

var noteString = fs.readFile('notes.json');
var note = JSON.parse(noteString);