const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const savedNotes = db && db.length ? db : [];

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
  console.info(`${req.method} request received to get notes`);
  res.json(`${req.method} request received to get notes`);
});

app.post('/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    savedNotes.push(newNote);

    const noteStr = JSON.stringify(savedNotes, null, 2);

    fs.writeFile(`./db/db.json`, noteStr, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Note for ${newNote.title} has been written to JSON file`
          )
    );

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);