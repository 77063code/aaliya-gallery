const express = require('express');
const router = express.Router();
const Image = require('../models/image');
const auth = require('../middleware/auth');
const path = require('path');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const AWS = require('aws-sdk');

const sendgridAPIKEY = process.env.SENDGRIDAPIKEY;
const portHTTPS = process.env.AALIYAPORTHTTPS || 3000;
const host = process.env.AALIYAHOST || 'localhost';


router.get('/images/homepage', async (req, res) => {
// Get list and information of all images that get rendered to the home page 
   
    
    try {
        const images = await Image.find({});
        res.send(images);
    } catch (e) {
        console.log(e);
        res.status(401).send();
    }
});

router.get('/images/signed-url-put-object', async (req, res) => {
  AWS.config.update({
    accessKeyId: 'AKIAUQSMLK2MCLBYU4MZ', // Generated on step 1
    secretAccessKey: 'dXGxAw3D445qFRDh5/k3AcWVeei9QtUtsC67TqBE', // Generated on step 1
    region: 'us-west-2', // Must be the same as your bucket
    signatureVersion: 'v4',
  });
  const params = {
    Bucket: 'aaliya-gallery',
    Key: 'test.txt',
    Expires: 30 * 60 // 30 minutes
  };
  const options = {
    signatureVersion: 'v4',
    region: 'us-west-2'} // same as your bucket
    //endpoint: new AWS.Endpoint('aaliya-gallery.s3.amazonaws.com'),    useAccelerateEndpoint: false  }
  const client = new AWS.S3(options);
  const signedURL = await (new Promise((resolve, reject) => {
    client.getSignedUrl('putObject', params, (err, data) => {      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
      });
  }));
    console.log(signedURL);
  res.json(signedURL)
})

module.exports = router;
