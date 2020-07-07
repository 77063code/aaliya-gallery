const express = require('express');
const router = express.Router();
const Image = require('../models/image');
const Likes = require('../models/likes');
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
//Add a new entry in the image collection or update information of an existing painting
//This is called after an image has been successfully uploaded
    
    const update = req.params.update;

    //DEBUG
    console.log(req.body);
    //DEBUG

    if (update === 'false') {
    // Create a new Image object and save it to the collection
    	const image = new Image(req.body);
        
        //DEBUG
        console.log(image);
        //DEBUG
	
        try {
        	await image.save();
            //DEBUG
            console.log('Image successfully saved');
            //DEBUG
        	res.status(200).send();
    	} catch(e) {
            console.log(e);
        	res.status(500).send(e);
    	}
    }
    else {
	   try {
           if (req.body.newfile) {
           //There is a new image for an existing painting
               await Image.updateOne({name : req.body.name}, {s3location: req.body.s3location, title: req.body.title, year: req.body.year, grade: req.body.grade,  height: req.body.height, width: req.body.width, depth: req.body.depth, type: req.body.type, price: req.body.price, orientation: req.body.orientation, version:req.body.version});
               
           } else {
               await Image.updateOne({name : req.body.name}, {title: req.body.title, year: req.body.year, grade: req.body.grade,  height: req.body.height, width: req.body.width, depth: req.body.depth, type: req.body.type, price: req.body.price, orientation: req.body.orientation});
           }
           res.status(200).send();
       } catch(e) {
           //DEBUG
           console.log(e);
           //DEBUG
           res.status(500).send(e);
       }
    }    
});

router.get('/images/delete/:name', auth, async(req,res) => {
//Delete the image with the name passed on to the function
//Delete all likes for the image
//Delete the image information from the db
//Delete the iamge file from S3
    
    const name = req.params.name;
    const loginid = req.user.loginid;
    
    //DEBUG
    console.log(`Deleting image ${name} for user ${loginid}`);
    //DEBUG
    
    try {
        await Likes.deleteMany({img:name}); //Delete all the likes for this image
        await Image.deleteMany({name:name}); //Delete the image from the db
        
        
        const params = {
            Bucket: AWSBucket,
            Key: `${loginid}/${name}`            
        }
        
        const s3 = new AWS.S3({
            accessKeyId: AWSKey,
            secretAccessKey: AWSSecret
        })
        
        s3.deleteObject(params, (error, data) => {
            if (error) {
                res.status(500).send(error);
            }
            //DEBUG
            console.log(`${loginid} sucessfully deleted ${name}`)
            //DEBUG
            res.status(200).send('Image deleted sucessfully');
        })
        
    } catch(e) {
        //DEBUG
        console.log(`${loginid} wasn't able to delete ${name}`);
        console.log(`and got this error ${e}`);
        //DEBUG
        res.status(500).send(e);
    }
    
})





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
    //DEBUG
    //console.log(req.user);
    //DEBUG
    try {
        if (req.user && req.user.artist) {
        //Only fetch images if user is an artist
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


router.get('/images/signed-url-put-object/:update/:name/:version', auth, async(req, res) => {
//Based on the cookie, get user information
//From user information get the key of the image S3 storage
//Based on that information create a pre-signed URL which can be used to upload the image file
//If it's an update then the name and current version are passed to the route and the imagesUploaded and imageIndex not incremented
    
    
    try {
        const update = req.params.update;
        let name = req.params.name;
        let version = req.params.version;
        const user = req.user;
        const loginid = user.loginid
     
        //DEBUG
        console.log(update);
        console.log(name);
        console.log(version);
        //DEBUG
        
        req.user.imagesUploaded = user.imagesUploaded;
        req.user.imagesIndex = user.imagesIndex;
        

        if (update !== 'true') {
        //Adding a new painting. need to increment the imagesUploaded and imagesIndex
            req.user.imagesUploaded += 1;
            req.user.imagesIndex += 1;
            version = 1; //This is a new painting and the first version
            await req.user.save();
            name = loginid + '-' + req.user.imagesIndex 
        }
        else {
            version = Number(version) + 1; //A new image is being added for an existing painting
        }
         
        AWS.config.update({
            accessKeyId: AWSKey, 
            secretAccessKey: AWSSecret, 
            region: AWSRegion, // Must be the same as your bucket
            signatureVersion: 'v4',
        });
        
        const params = {
                Bucket: AWSBucket,
                Key: loginid + '/' + name + '-' + version + '.jpg',
                Expires: 30 * 60, // Link expires in 30 minutes
                ACL: 'public-read', // Make the file readable to all
                ContentType: 'image-jpeg'
        }
        
        //DEBUG
        console.log(params);
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
            name,
            artistid: loginid,
            backside_id: loginid + '-' + req.user.imagesIndex + '__back',
            s3location: 'https://' + AWSBucket + '.s3-' + AWSRegion + '.amazonaws.com/' + loginid + '/' + name + '-' + version + '.jpg'            
        }
        res.status(201).send(data);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;
