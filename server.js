const express = require('express');
const path = require('path'); 
const fs = require('fs');
const dbData = require('./develop/db/db.json');

const PORT = 3001;

const app = express();

app.use(express.json()); // To handle JSON in POST requests

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'develop', 'public', 'index.html')));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'develop','public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(dbData);
});

app.use(express.static(path.join(__dirname, 'develop','public')));





app.post('/api/notes', (req, res) => {
    
    const newNote = req.body;

    newNote.id = dbData.length + 1;
    dbData.push(newNote);

    // write the updated data back to the db.json file
    fs.writeFile('./db/db.json', JSON.stringify(dbData), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to save note' });
        }
        res.json({ message: 'Note successfully saved' });
    });
});

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
