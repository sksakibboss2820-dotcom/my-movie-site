const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// ১. আপনার নতুন পাসওয়ার্ড "54321sk" দিয়ে আপডেট করা লিঙ্ক
const mongoURI = "mongodb+srv://sakibulhasan5:54321sk@cluster0.z021v.mongodb.net/movieDB?retryWrites=true&w=majority";

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

// ২. মুভি লিস্টের API
app.get('/api/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ৩. স্যাম্পল মুভি যোগ করার লিঙ্ক
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
