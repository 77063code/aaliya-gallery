const express = require('express');
const router = express.Router();
const Image = require('../models/image');
const auth = require('../middleware/auth');
const path = require('path');
const AWS = require('aws-sdk');

const sendgridAPIKEY = process.env.SENDGRIDAPIKEY;
const portHTTPS = process.env.AALIYAPORTHTTPS || 3000;
const host = process.env.AALIYAHOST || 'localhost';
const AWSKey = process.env.AWSKEY;
const AWSSecret = process.env.AWSSECRET;
const AWSRegion = process.env.AWSREGION || 'us-west-2';
const AWSBucket = process.env.AWSBUCKET


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
    accessKeyId: AWSKey, // Generated on step 1
    secretAccessKey: AWSSecret, // Generated on step 1
    region: AWsRegion, // Must be the same as your bucket
    signatureVersion: 'v4',
  });
  const params = {
    Bucket: AWSBucket,
    Key: 'test.txt',
    Expires: 30 * 60 // 30 minutes
  };
  const options = {
    signatureVersion: 'v4',
    region: AWSRegion} // same as your bucket
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
