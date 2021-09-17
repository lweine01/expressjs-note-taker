const path = require('path');
const router = require('express').Router();

router.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'))
  // console.info(`${req.method} request received to get notes`);
  // res.json(`${req.method} request received to get notes`);
});

module.exports = router;