// src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');


const connectDB = require('./config/db');

const app = express();


app.use(cors());
app.use(express.json());

const chatRoutes = require('./routes/chat');
app.use('/api/chat', chatRoutes);
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Serve static frontend (if any)
app.use(express.static(path.join(__dirname, '..', 'public')));

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));

// Fallback for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/', (req, res) => {
  res.send("IRL ranning");
});

const start = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();
