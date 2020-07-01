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


router.post('/images/:update', async(req, res) => {
// Add a new entry in the image collection
// This is called after an image has been successfully uploaded
    const update = req.params.update;

    console.log(req.body);

    if (update === 'false') {
    // Create a new Image object and save it to the collection
    	const image = new Image(req.body);
	
        try {
        	await image.save();
        	res.status(201).send();
    	} catch(e) {
        	res.status(404).send(e);
    	}
    }
    else {
	   try {
           await Image.updateOne({name : req.body.name}, {grade: req.body.grade, type: req.body.type, title: req.body.title, year: req.body.year, price: req.body.price, height: req.body.height, width: req.body.width, depth: req.body.depth});
           res.status(201).send();
       } catch(e) {
           res.status(404).send(e);
       }
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

router.get('/images/byuser', auth, async(req, res) => {
// Get list and information of all images for a user identified by the cookie passed
    try {
        if (req.user && req.user.artist) {
		const images = await Image.find({artistid:req.user.loginid});
        	res.send(images);
	}
	else {
		console.log('Either user not found by cookie or user not an artist');
		res.status(401).send;
	}
    } catch (e) {
        console.log(e);
        res.status(401).send();
    }
});


router.get('/images/signed-url-put-object/:update', auth, async(req, res) => {
// Based on the cookie, get user information
// From user information get the key of the image S3 storage
// Based on that information create a pre-signed URL which can be used to upload the image file
// If it's an update then the imagesUploaded and imageIndex don't get incremented
    
    
    try {
        const user = req.user;
        const update = req.params.update;
        const loginid = user.loginid;
        
        req.user.imagesUploaded = user.imagesUploaded;
        req.user.imagesIndex = user.imagesIndex;
        

        if (update !== 'true') {
        // Adding a new painting. need to increment the imagesUploaded and imagesIndex
            req.user.imagesUploaded += 1;
            req.user.imagesIndex += 1;
            await req.user.save();
        }
         
        
        AWS.config.update({
            accessKeyId: AWSKey, 
            secretAccessKey: AWSSecret, 
            region: AWSRegion, // Must be the same as your bucket
            signatureVersion: 'v4',
        });
        
        const params = {
            Bucket: AWSBucket,
            Key: loginid + '/' + loginid + '-' + req.user.imagesIndex + '.jpg',
            Expires: 30 * 60, // Link expires in 30 minutes
            ACL: 'public-read', // Make the file readable to all
            ContentType: 'image-jpeg'
        };

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
            name: loginid + '-' + req.user.imagesIndex + '.jpg',
            artistid: loginid,
            backside_id: loginid + '-' + req.user.imagesIndex + '__back',
            s3location: 'https://' + AWSBucket + '.s3-' + AWSRegion + '.amazonaws.com/' + loginid + '/' + loginid + '-' + req.user.imagesIndex + '.jpg'            
        }
        res.status(201).send(data);
        //res.json(signedURL);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;
