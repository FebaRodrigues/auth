require('dotenv').config();//.env filene configration cheyyanam
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');//frontend backend connect aakn vendi
const bodyParser = require('body-parser');//idh form aayond middleware ayit use akane

const app = express();//app use akit express edikkam

// Middleware
app.use(cors());//frontend backend check akan vedi
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })//uniqe aagan vendi  useNewUrlParser: true, useUnifiedTopology: true
  .then(() => console.log('Connected to MongoDB atlas'))//connect ayal ee msg verum
  .catch((err) => console.error('MongoDB atlas connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);//starting route authentication vendit

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));//edh portlek run aagano adh idhil eldi kodkne