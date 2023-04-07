const express = require('express');
const router = express.Router();
const Photo = require('../models/PhotoModels.js');
const tokenVerify = require('../middlewares/tokenVerify.js');
const multer = require('multer');
const upload = multer();
const sharp = require('sharp');

router.post('/', tokenVerify, upload.single('petimg'), async (req, res) => {
  const { username } = req.user;

  try {
    const { petname, petage, petweight } = req.body;
    let { buffer, mimetype } = req.file;
    // Check if file buffer and mimetype are present
    if (!buffer || !mimetype) {
      return res.status(400).send('Invalid file');
    }
    buffer = await sharp(buffer).jpeg({ quality: 25 }).toBuffer();

    const photo = new Photo({
      username,
      petname,
      petage,
      petweight,
      petimg: {
        data: buffer,
        contentType: mimetype,
      },
    });
    await photo.save();
    res.status(201).send(photo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating photo');
  }
});

router.get('/', async (req, res) => {
  let username = req.query.username;

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

// Get a specific photo - based on the photo Route
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    let photo = await Photo.findOne({ _id: id });
    if (!photo) {
      return res.status(404).send('Photo not found');
    }
    photo = {
      id: photo._id,
      username: photo.username,
      petname: photo.petname,
      petage: photo.petage,
      petweight: photo.petweight,
      data: photo.petimg.data.toString('base64'),
      contentType: photo.petimg.contentType,
    };
    res.status(200).send(photo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting photo');
  }
});

//Delete photo
router.delete('/:id', tokenVerify, async (req, res) => {
  const { username } = req.user;
  const { id } = req.params;

  try {
    const photo = await Photo.findOne({ _id: id });
    if (!photo) {
      return res.status(404).send('Photo not found');
    }
    if (photo.username !== username) {
      return res.status(401).send('Unauthorized');
    }
    await Photo.deleteOne({ _id: id });
    res.status(200).send('Photo deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting photo');
  }
});

module.exports = router;
