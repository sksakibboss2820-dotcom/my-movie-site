const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// ডাটাবেস লিঙ্কটি এখানে আরও পরিষ্কার করে দেওয়া হয়েছে
const mongoURI = "mongodb+srv://sksakibboss2820:sakib2820@cluster0.z021v.mongodb.net/movieDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB Atlas!'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

const movieSchema = new mongoose.Schema({
    title: String,
    image: String,
    rating: String,
    genre: String
});
const Movie = mongoose.model('Movie', movieSchema);

app.use(express.static(path.join(__dirname, '/')));

// ১. মুভি লিস্ট পাওয়ার রুট
app.get('/api/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ২. স্যাম্পল মুভি যোগ করার রুট
app.get('/add-sample', async (req, res) => {
    try {
        const sampleMovies = [
            { title: "Inception", image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg", rating: "8.8", genre: "Sci-Fi" },
            { title: "Interstellar", image: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg", rating: "8.7", genre: "Adventure" }
        ];
        await Movie.insertMany(sampleMovies);
        res.send("<h1>Success! Movies added. Now refresh your home page.</h1>");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// ৩. রুট এরর এড়ানোর সবচেয়ে সহজ পদ্ধতি
app.use((req, res, next) => {
    if (req.path.startsWith('/api') || req.path === '/add-sample') {
        return next();
    }
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
