const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection (Corrected URI without underscore)
const mongoURI = "mongodb+srv://sakibtest:sakib123@cluster0.z021v.mongodb.net/movieDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB Successfully!'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Movie Schema
const movieSchema = new mongoose.Schema({
  title: String,
  image: String,
  downloadLink: String,
  category: String
});

const Movie = mongoose.model('Movie', movieSchema);

// API Route to get movies
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add sample movies
app.get('/add-sample', async (req, res) => {
  try {
    const sampleMovies = [
      {
        title: "Avatar: The Way of Water",
        image: "https://image.tmdb.org/t/p/w500/t6Sna4vR9p9z989p9z989p9z989.jpg",
        downloadLink: "#",
        category: "Sci-Fi"
      }
    ];
    await Movie.insertMany(sampleMovies);
    res.send("<h1>✅ Success! Sample movies added to database.</h1><a href='/'>Go to Home</a>");
  } catch (err) {
    res.status(500).send("Error adding movies: " + err.message);
  }
});

// Serve Frontend (Root Route)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all route to prevent 404 on frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
