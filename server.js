const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Standard connection string (ENOTFOUND এরর দূর করতে এটি সেরা)
const mongoURI = "mongodb://sakibulhasan5:54321sk@cluster0-shard-00-00.z021v.mongodb.net:27017,cluster0-shard-00-01.z021v.mongodb.net:27017,cluster0-shard-00-02.z021v.mongodb.net:27017/movieDB?ssl=true&replicaSet=atlas-9m6y0f-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB Successfully!'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

const movieSchema = new mongoose.Schema({
    title: String,
    image: String,
    rating: String,
    genre: String
});
const Movie = mongoose.model('Movie', movieSchema);

app.use(express.static(path.join(__dirname, '/')));

app.get('/api/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/add-sample', async (req, res) => {
    try {
        const sampleMovies = [
            { title: "Inception", image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg", rating: "8.8", genre: "Sci-Fi" },
            { title: "Interstellar", image: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg", rating: "8.7", genre: "Adventure" }
        ];
        await Movie.insertMany(sampleMovies);
        res.send("<h1>Success! Movies added. Now refresh your home page.</h1>");
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server active on port ${PORT}`));
