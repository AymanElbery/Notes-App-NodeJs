const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes');
const titleOptions =  {
    describe: "Title of a new note",
    demand: true ,
    alias: 't',
};
const bodyOptions =  {
    describe: "Body of a new note",
    demand: true ,
    alias: 'b',
};

const argv = yargs
            .command('add' , 'Add a new note' , {
                title: titleOptions,
                body: bodyOptions,
            })
            .command('remove' , 'Remove an existing note' , {
                title: titleOptions,
            })
            .command('read' , 'Read an existing note' , {
                title: titleOptions,
            })
            .command('list' , 'List all notes ' )
            .help()
            .argv;
var command = argv._[0];

switch (command) {
    case "add":
        var note = notes.addNote(argv.title , argv.body);
        if (note) {
            console.log("Note created succefully");
            notes.logNote(note);
        }else{
            console.log("Note titel taken before !");
        }
        break;
    case "list":
        var allNotes = notes.getAll();
        if (allNotes.length > 0) {
            console.log(`Listing ${allNotes.length} note(s) :`);
            allNotes.forEach(note => {
                notes.logNote(note);
            });
        }
        break;
    case "read":
        var note = notes.getNote(argv.title);
        if (note) {
            console.log("Note found succefully");
            notes.logNote(note);
        }else{
            console.log("Note with this title not found !");
        }
        break;
    case "remove":
        var removedNote = notes.removeNote(argv.title);
        var message = (removedNote) ? "Note was removed succefully" : "Note not found !";
        console.log(message);
        break;
    default:
        console.log("Command not recognized !");
        break;
}

