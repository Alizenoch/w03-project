// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
// const helmet = require('helmet');
// const cors = require('cors');

const registerRoute = require('./routes/users');
const usersRoutes = require('./routes/users');
const { swaggerUi, swaggerSpec } = require('./swagger');
const postRoutes = require('./routes/post');
const app = express();

// Middleware
app.use(express.json());
// app.use(helmet()); // security headers
// app.use(cors());   // enable CORS for frontend apps

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ Connection error: ", err));

// Routes
app.use('/users', usersRoutes);
app.use('/api', registerRoute);

app.use('/post', postRoutes)

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Simple test route
app.get('/', (req, res) => {
  res.send("API is running...");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log("🔌 MongoDB connection closed");
  process.exit(0);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
