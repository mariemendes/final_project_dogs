const express = require('express');
const router = express.Router();
const UserModels = require('../models/UserModels');
const Photo = require('../models/PhotoModels.js');

//Get all user's information
router.get('/', async (req, res) => {
  try {
    let listUsers = await UserModels.findOne({});
    if (!Array.isArray(listUsers)) {
      // Convert the single object to an array
      listUsers = [listUsers];
    }
    listUsers = listUsers.map((user) => {
      return {
        username: user.username,
        password: user.petname,
      };
    });
    res.send(listUsers);
  } catch (err) {
    console.log(err);
  }
});

// Register new user
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new UserModels({ username, email, password });
  try {
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    if (err.code === 11000) {
      // handle duplicate user error
      res.status(400).send({ message: 'User with this email already exists' });
    } else {
      // handle other errors
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

router.get('/:username', async (req, res) => {
  const username = req.params.username;

  let listPhotos = [];

  try {
    if (username) {
      listPhotos = await Photo.find({ username });
    } else {
      listPhotos = await Photo.find();
    }

    listPhotos = listPhotos.map((photo) => {
      return {
        id: photo._id,
        username: photo.username,
        petname: photo.petname,
        petage: photo.petage,
        petweight: photo.petweight,
        data: photo.petimg.data.toString('base64'),
        contentType: photo.petimg.contentType,
      };
    });
    res.send(listPhotos);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
