

const fs = require('fs');

var fetchNote = () => {
	try {
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (error) {
		return [];
	}
};

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json' , JSON.stringify(notes));
};

var logNote = (note) => {
	console.log("=======================");
	console.log(`Title : ${note.title}`);
	console.log(`Body  : ${note.body}`);
};

var addNote = (title , body) => {
	var notes = fetchNote();
	var note = {
		title : title,
		body : body ,
	};

	var duplicatedNote = notes.filter((note) => note.title === title);
	if (duplicatedNote.length === 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

var getAll = () => {
	var notes = fetchNote();
	return notes;
};

var getNote = (title) => {
	var notes = fetchNote();
	var note = notes.filter((note) => note.title === title);
	if (note.length !== 0) {
		return note[0];
	}
};

var removeNote = (title) => {
	var notes = fetchNote();
	var filteredNotes = notes.filter((note) => note.title !== title);
	saveNotes(filteredNotes);
	return notes.length !== filteredNotes.length;
};

module.exports = {
	addNote , 
	getAll ,
	getNote , 
	removeNote ,
	logNote ,
};