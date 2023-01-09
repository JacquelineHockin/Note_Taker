// dependencies
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  // creates notes var
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    var notes = JSON.parse(data);
    console.log("notes1", notes);

    // updates the db when a note is added/deleted
    function updateDb() {
      fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return true;
      });
    }

    // API route GET request
    app.get("/api/notes", function (req, res) {
      //returns saved notes as JSON
      res.json(notes);
    });

    // API route POST request
    app.post("/api/notes", function (req, res) {
      // Receives new note, adds to db, returns new note
      let newNote = req.body;
      newNote.id = uuidv4();
      notes.push(newNote);
      updateDb();
      res.json(newNote);
      return console.log("Added new note: " + newNote.title);
    });
  });
};
