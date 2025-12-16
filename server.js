const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ডাটাবেস লিঙ্ক (সঠিক করা হয়েছে)
const mongoURI = "mongodb+srv://sakibtest:sakib123@cluster0.z021v.mongodb.net/movieDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB Successfully!'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const movieSchema = new mongoose.Schema({
  title: String,
  image: String,
  downloadLink: String,
  category: String
});
const Movie = mongoose.model('Movie', movieSchema);

app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// হোম পেজ রাউট
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
