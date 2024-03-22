// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/social_network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
