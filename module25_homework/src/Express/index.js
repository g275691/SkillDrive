const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/skilldrive2', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true})
.then(() => console.log('Connection to MongoDB has been established!'));

const { usersRouter } =  require('./user-router');
app.use('/users', cors(), usersRouter);

app.listen(8000, () => {
    console.log(`Server is 8000`)
})