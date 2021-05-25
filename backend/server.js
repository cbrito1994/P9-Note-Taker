const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require('fs');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML Routes
app.get('/tables', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/reserve', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/notes.html'));
});

// If no matching route is found default to home
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// API Routes
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    console.log(newNote)
    fs.writeFile('notes.json', JSON.stringify(newNote));
})

app.get('/api/notes/:note_id', (req, res) => {
    let rawData = fs.readFile('notes.json');
    let notes = JSON.parse(rawData);
    const postId = req.body.id;
    const chosenNote = req.params.note_id;
    console.log(rawData)
    console.log(notes)
    console.log(postId);
    console.log(chosenNote);
    if(rawData){
        for(let note of notes){
            if(postId === note.id){
                return res.json(note);
            } return
        }
    } return
})

// Listen
app.listen(PORT, () => console.log(`App listening on port ${PORT}`))