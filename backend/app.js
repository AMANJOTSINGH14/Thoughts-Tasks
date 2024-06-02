const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const thoughtRoutes= require('./routes/thoughtRoutes')
const app = express();

mongoose.connect("mongodb+srv://singhaman46:FMdadrGVzVFDCEwJ@cluster0.fuhcftd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").
then(()=>{
  console.log('hey mongoose workiun')
}).catch((error)=>{
  console.log(error)
})
app.use(cors({
    origin: 'http://localhost:3001', // Your frontend URL
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization,X-Custom-Header,UserId'
  }));
// mongodb+srv://singhaman46:FMdadrGVzVFDCEwJ@cluster0.fuhcftd.mongodb.net/?retryWrites=true&w=majority
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Custom-Header, UserId');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, PATCH, POST, DELETE, OPTIONS');
    next();
  });
app.use('/api/user', userRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/thoughts', thoughtRoutes);

module.exports = app;
