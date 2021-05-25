const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

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

// Listen
app.listen(PORT, () => console.log(`App listening on port ${PORT}`))