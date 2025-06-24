require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON from request body

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' MongoDB connected'))
.catch(err => console.error(' MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('👋 Welcome to Prep & Plate backend!');
});

// Start server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
