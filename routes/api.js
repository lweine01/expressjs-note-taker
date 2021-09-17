const router = require('express').Router();
const uuid = require('../helpers/uuid');
const fs = require('fs');
const db = require('../db/db.json');

const savedNotes = db && db.length ? db : [];

router.post('/api/notes', (req, res) => {
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

  module.exports = router;