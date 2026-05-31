const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://task-manager-app-anjali.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Debug
console.log("PORT =", process.env.PORT);
console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("JWT_SECRET =", process.env.JWT_SECRET);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API running' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch(err => {
    console.error('MongoDB Error:', err);
  });