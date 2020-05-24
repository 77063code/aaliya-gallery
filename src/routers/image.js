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


router.post('/images', async(req, res) => {
// Add a new entry in the image collection
// This is called after an image has been successfully uploaded
    const image = new Image(req.body);
    console.log(req.body);
    console.log(image);
    
    try {
        await image.save();
        res.status(201).send();
    } catch(e) {
        res.status(404).send(e);
    }
    
});

router.get('/images/homepage', async(req, res) => {
    // Get list and information of all images that get rendered to the home page 


    try {
        const images = await Image.find({});
        res.send(images);
    } catch (e) {
        console.log(e);
        res.status(401).send();
    }
});

router.get('/images/signed-url-put-object', auth, async(req, res) => {
// Based on the cookie, get user information
// From user information get the key of the image S3 storage
// Based on that information create a pre-signed URL which can be used to upload the image file
    
    
    try {
        const user = req.user;
        const imageUploaded = user.imagesUploaded + 1;
        const imageIndex = user.imagesIndex + 1;
        const loginid = user.loginid;
        
        req.user.imagesUploaded = imageUploaded; // Incremented by 1
        req.user.imagesIndex = imageIndex; // Incremented by 1
        await req.user.save();
        
        
        AWS.config.update({
            accessKeyId: AWSKey, 
            secretAccessKey: AWSSecret, 
            region: AWSRegion, // Must be the same as your bucket
            signatureVersion: 'v4',
        });
        const params = {
            Bucket: AWSBucket,
            Key: loginid + '/' + loginid + '-' + imageIndex + '.jpg',
            Expires: 30 * 60, // Link expires in 30 minutes
            ACL: 'public-read', // Make the file readable to all
            ContentType: 'image-jpeg'
        };
        //DEBUG
        //console.log(params);
        //DEBUG
        const options = {
                signatureVersion: 'v4',
                region: AWSRegion
            } // same as your bucket
            
        const client = new AWS.S3(options);
        const signedURL = await (new Promise((resolve, reject) => {
            client.getSignedUrl('putObject', params, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            });
        }));
        // It seems there is a signed URL generated even with incorrect creds
        // If there is an issue with AWS it doesn't show up as an error here
        
        const data = {
            signedURL,
            name: loginid + '-' + imageIndex + '.jpg',
            artistid: loginid,
            backside_id: loginid + '-' + imageIndex + '__back',
            s3location: 'https://' + AWSBucket + '.s3-' + AWSRegion + '.amazonaws.com/' + loginid + '/' + loginid + '-' + imageIndex + '.jpg'            
        }
        //DEBUG
        //console.log(signedURL);
        //console.log(data);
        //DEBUG
        res.status(201).send(data);
        //res.json(signedURL);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;