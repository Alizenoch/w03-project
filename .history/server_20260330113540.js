const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const cors  require('cors');


const registerRoute = require('./routes/register');
const usersRoutes = require('./routes/register');
const {}

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  userNewUrlParser: true,
  userUnfiedTopology: true,
})
   .then(() => console.log("✅ MongoDB connected"))
   .catch(err => console.error("❌ Connection error: ", err));

// Import routes
const usersRoutes = require('./routes/users');

// Use routes
app.use('/users', usersRoutes);

app.use('/api', registerRoute);

// Swagger setup
const { swaggerUi, swaggerSpec } = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Simple test route
app.get('/', (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
