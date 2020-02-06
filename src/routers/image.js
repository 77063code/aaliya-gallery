const express = require('express');
const router = express.Router();
const Image = require('../models/image');
const auth = require('../middleware/auth');
const path = require('path');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const sendgridAPIKEY = process.env.SENDGRIDAPIKEY;
const portHTTPS = process.env.AALIYAPORTHTTPS || 3000;
const host = process.env.AALIYAHOST || 'localhost';


router.get('/images/homepage', async (req, res) => {
// Get list and information of all images that get rendered to the home page 
   
    
    try {
        const images = Image.find();
        res.send(images)
    } catch (e) {
        console.log(e);
        res.status(401).send();
    }
});

module.exports = router;
