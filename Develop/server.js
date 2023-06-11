const express = require("express");
const path = require("path");
const app = express();
const PORT = 3004;
const fs = require("fs");
const uuid = require("./helpers/uuid.js");

//Middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// HTML Routes
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);


// API Routes

// GET
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error reading notes from the database");
    }

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// Post
app.post("/api/notes", (req, res) => {
  // Request Body
  console.info(`${req.method} request received to add a review`);
  const { title, text } = req.body;

  if (title && text) {
    const activeNote = {
      title,
      text,
      id: uuid(),
    };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const newNote = JSON.parse(data);

        newNote.push(activeNote);
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(newNote, null, 2),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info(
                  `Note for ${activeNote.title} has been written to JSON file`
                )
        );
      }
    });

    const response = {
      status: "success",
      body: activeNote,
    };
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting review");
  }
});

// Delete
app.delete("/api/notes/:id", (req, res) => {
  console.info(`${req.method} request received to add a review`);
  const { id } = req.params;
console.log('id',id);
  if (id) {
    const activeNote = {
      title:'1',
      text: 'w',
      id,
    };
    console.info(activeNote);

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const newNote = JSON.parse(data);
        const findIndex = (arr, id) => {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
              return i;
            }
          }
        };
        const index = findIndex(newNote, activeNote.id);
        console.log(index);

        newNote.splice(index, 1);
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(newNote, null, 2),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info(
                  `Note for ${activeNote.title} has been deleted in JSON file`
                )
        );
      }
    });

    const response = {
      status: "success",
      body: activeNote,
    };
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in deleting review");
  }
});

//Listening
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);