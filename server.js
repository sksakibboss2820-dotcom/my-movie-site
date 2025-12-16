const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// MongoDB connection string
const mongoURI = "mongodb+srv://sksakibboss2820:sakib2820@cluster0.z021v.mongodb.net/movieDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB Atlas!'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Movie Schema
const movieSchema = new mongoose.Schema({
    title: String,
    image: String,
    rating: String,
    genre: String
});
const Movie = mongoose.model('Movie', movieSchema);

app.use(express.static(path.join(__dirname, '/')));

// API route to get movies from DB
app.get('/api/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
