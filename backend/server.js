const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require('fs');
const path = require('path');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing and connecting all files in the frontend (html with js and css)
app.use(express.static('../frontend'));

// HTML Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/notes.html'));
});

// If no matching route is found default to home
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/index.html'));
// });

// API Routes
app.get('/api/notes', (req, res) => {
    fs.readFile('db.json', (err, data) => {
        if(err){
            return
        } else {
            let notes = JSON.parse(data);
            res.json(notes);
        }
    })
})

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    fs.readFile('db.json', (err, data) => {
        if(err){
            fs.writeFileSync('db.json', JSON.stringify(newNote));
        } else {
            fs.writeFileSync('db.json', JSON.stringify(newNote));
        }
    })
    res.status(201).send("Ok");
})

app.get('/api/notes/:note_id', (req, res) => {
    let rawData = fs.readFileSync('db.json');
    let notes = JSON.parse(rawData);
    const chosenNote = req.params.note_id;
    if(notes){
        // Method 1
        // for(let i = 0; i < notes.length; i++){
        //     if(chosenNote == notes[i].id){
        //         return res.json(notes[i]);
        //     }
        // }

        // Method 2 
        // for(let note of notes){
        //     if(chosenNote == note.id){
        //         return res.json(note);
        //     }
        // }

        // Method 3
        const foundNote = notes.find(note => note.id == chosenNote); // Se debe poner solo == y no === porque si no, la info sale undefined ya que el dato traido del frontend es string y el del file json es number
        if(foundNote){
            return res.json(foundNote);
        } else {
            return res.status(404).send("Not Found");
        }
    } return res.json(false);
})

app.delete('/api/notes/:note_id', (req, res) => {
    let rawData = fs.readFileSync('db.json');
    let notes = JSON.parse(rawData);
    const chosenNote = req.params.note_id;
    const foundNote = notes.findIndex(note => note.id == chosenNote);
    notes.splice(foundNote, 1);
    fs.writeFileSync('db.json', JSON.stringify(notes));
    res.status(201).send("Ok");
})

// Listen
app.listen(PORT, () => console.log(`App listening on port ${PORT}`))