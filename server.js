
const express = require("express");
const fs = require("fs");
const path = require("path");

// set port and server
const app = express();
const PORT = process.env.PORT || 8080;


// data parsing with express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// server is directed to route files
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//new note added
app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let notelength = (noteList.length).toString();

// new id created for length
  newNote.id = notelength;
  //push new note to json
  noteList.push(newNote);

  //write to json
  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
})

//delete note 
app.delete("/api/notes/:id", (req, res) => {
  let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteId = (req.params.id).toString();

  //save new notes as a new array

  noteList = noteList.filter(selected =>{
      return selected.id != noteId;
  })

  //display the updated note after written in json
  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
});


//the port has ears
app.listen(PORT, () => console.log("Server listening on port " + PORT));