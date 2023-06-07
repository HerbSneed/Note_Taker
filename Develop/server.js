const fs = require('fs');
const express = require('express');
const db = require('./db/db.json');


const app = express();
const PORT = 3001;


app.use(express.static('public'));
// app.use(express)

app.get('/', (req, res) => res.send('navigate to routes')
);

app.get('/send', (req, res) => 
  res.send.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/db', (req, res) => {
  res.json(db)
});

app.get('/api/db/:title', (req, res) => {
  var requestedTitle = req.params.title.toLowerCase();

  for (let i = 0; i < db.length; i++) {
    if (requestedTitle === db[i].title.toLowerCase()) {
      return res.json(db[i]);
    }
  }
  return res.json('No object found');
});


app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);

