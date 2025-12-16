const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// এই লিঙ্কটি একদম হুবহু কপি করবেন, কোনো পরিবর্তন করবেন না
const mongoURI = "mongodb+srv://sakibtest:sakib123@cluster0.z021v.mongodb.net/movieDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB Successfully!'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

app.get('/api/movies', async (req, res) => {
  try {
    const movies = await require('mongoose').model('Movie', new mongoose.Schema({title:String, image:String})).find();
    res.json(movies);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) res.status(404).send("Error: public/index.html not found! Please create the file.");
  });
});

app.listen(port, () => console.log(`🚀 Server on port ${port}`));
