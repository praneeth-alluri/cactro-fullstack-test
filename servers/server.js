const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const pollRoutes = require('./routes/pollRoutes');
require('dotenv').config();
const app = express();

//middleware
app.use(express.json()); 
app.use(cors());

//routes
app.use('/api', pollRoutes); 

mongoose.connect('mongodb+srv://hellinokayu:BXvQ88wBjLI3MKEE@cluster0.pesch.mongodb.net/polls?retryWrites=true&w=majority&appName=cluster0')  
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB:', err)); 

// Server setup
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`);
}); 
