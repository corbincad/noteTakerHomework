const fs = require('fs')
const util = require('util')
const readFileAsync =  util.promisify(fs.readfile);
const writeFileAsync = util.promisify(fs.writefile);

class Call {

    constructor(){

        this.lastId = 0;
    }

    read(){

        return readFileAsync("db/db.json", "utf-8")
    }

    write(note){
        
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }

    getNote(){

        return this.read().then(notes => {

            let parseNotes;
            try{parseNotes = [].concat(JSON.parse(notes))}
            catch(err){parseNotes = []}
            return parseNotes
        })
    }

    addNote(note){

        const {title, text} = note

        if (!title || !text) {

            throw new Error("Title and Text cannot be blank")
        }
        const newNote = {title, text, id: ++this.lastId}
        return this.getNote()
        .then(notes => [...notes, newNote])
        .then(updatedNotes => this.write(updatedNotes))
        .then(() => newNote)
    }
        
    removeNote(id){

        return this.getNotes()
        .then(notes => notes.filter(note => note.id !==parseInt(id)))
        .then(filteredNotes => this.write(filteredNotes))
    }

}

module.exports = new Call()

