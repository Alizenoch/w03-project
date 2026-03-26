const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log("✅ MongoDB connected"))
   .catch(err => console.error("❌ Connection error: ", err));
 
   // Import User model
   const User = require('./models/User');

   // CRUD Routes

   // CREATE
   app.post('user', async (req, res) => {
    try {
        const user = User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

   });

   // READ ALL 
   app.get('/user', async (req, res) => {
    const users = await User.find();
   });

   // READ ONE
   app.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User  not found" });
        res.json(user);
    } catch (err) {
    }
   } )

   // Simple test route
   app.get('/', (req, res) => {
    res.send("API is running...");
   });

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));