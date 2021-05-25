const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML Routes

// API Routes

// Listen
app.listen(PORT, () => console.log(`App listening on port ${PORT}`))