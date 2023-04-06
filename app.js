const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connection = require('./src/backend/db/connection');

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static('public'));

// Parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
connection
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log('Connected and listening');
    });
  })
  .catch((err) => {
    console.log(`Error connecting to MongoDB: ${JSON.stringify(err)}`);
  });

// Login route
const loginRouter = require('./src/backend/routes/login');
app.use('/login', loginRouter);

// Get current user's information
const myUserRouter = require('./src/backend/routes/myuser');
app.use('/myuser', myUserRouter);

//Get all user's information
const usersRouter = require('./src/backend/routes/users');
app.use('/users', usersRouter);

// Define endpoint for password reset request
const lostRouter = require('./src/backend/routes/lost');
app.use('/password/lost', lostRouter);

//reset password
const resetRouter = require('./src/backend/routes/reset');
app.use('/password/reset', resetRouter);

//Photos Route // Get current user's photos
const photoRouter = require('./src/backend/routes/photo');
app.use('/photo', photoRouter);

// Get all user's photos - based on the profile Route
app.use('/users/:username', usersRouter);

// Get a specific photo - based on the photo Route and Delete photo
app.use('/photo/:id', photoRouter);