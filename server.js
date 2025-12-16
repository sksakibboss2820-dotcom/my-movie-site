const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// আপনার ডেটাবেস কানেকশন লিঙ্ক
const dbURI = 'mongodb+srv://sakibulhasan5:54321sk@cluster0.v8xrx2q.mongodb.net/?appName=Cluster0';

mongoose.connect(dbURI)
  .then(() => console.log('✅ Success: Connected to MongoDB Atlas!'))
  .catch((err) => console.log('❌ Connection Error:', err));

app.get('/', (req, res) => {
  res.send('ST Movies Server is running and connected to Database!');
});
app.use(express.json());
app.use(express.static(__dirname));
const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: String,
    genre: String,
    videoUrl: String
}));

app.post('/add-movie', async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).send("✅ Movie Added Successfully!");
    } catch (error) {
        res.status(400).send("❌ Error: " + error.message);
    }
});
app.listen(PORT, () => {
  console.log(`🚀 Server is active on port ${PORT}`);
});
app.get('/all-movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).send("❌ Error: " + error.message);
    }
});
