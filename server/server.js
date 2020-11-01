// import dependencies and initialize express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const uri = ATLAS_URI="mongodb+srv://ettienesmithcv:CjH1ro9aDyco1W7r@cluster0.mhunj.gcp.mongodb.net/vehicles?authSource=admin&replicaSet=atlas-e2d7s0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"//process.env.ATLAS_URI;

const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const usersRouter = require('./routes/users');

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//app.use(express.json());

// routes and api calls
app.use('/users', usersRouter);

// default path to serve up index.html (single page application)
app.all('', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public', 'index.html'));
});

// start node server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend available http://localhost:${port}`);
});

// error handler for unmatched routes or api calls
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

module.exports = app;
