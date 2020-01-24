const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const path = require('path');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const sgMail = require('@sendgrid/mail');
const sendgridAPIKEY = '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'

const portHTTPS = process.env.AALIYAPORTHTTPS || 3000;
const host = process.env.AALIYAHOST || 'localhost';


router.post('/users', async (req, res) => {
// Register a new user  
    const user = new User(req.body);
    
    try {
        await user.save()       
        await user.generateHashCode();


        sgMail.setApiKey(sendgridAPIKEY);
        sgMail.send({
            to: user.email,
            from: 'aaliyagallery@gmail.com',
            subject: 'aaliya-art login confirmation',
            text: `Please click on following link to login https://${host}.com:${portHTTPS}?code=${user.hashcode}`
        })
        sgMail.send({
            to: 'aaliyagallery@gmail.com',
            from: 'aaliyagallery@gmail.com',
            subject: 'New User Account Created',
            text: `Name: ${user.name}, Email: ${user.email}, Loginid: ${user.loginid}`
        })
        console.log(`Please click on following link to login https://${host}.com:${portHTTPS}?code=${user.hashcode}`)
        // Send a confirmation email to the new user, and a new user joining email to admin
        res.status(201).send();// The 201 is most routerropriate status code for a successful creation
    } catch (e) {
        // All these errors happen when the save is run
        
        const keys = Object.keys(e.errors);
        let status = 400;       
        if (keys[0] === 'name') {
             status = 350
        } else if (keys[0] === 'loginid' && e.errors[keys[0]].message.includes('required')) {
            status = 351
        } else if (keys[0] === 'loginid' && e.errors[keys[0]].message.includes('unique')) {
            status = 352
        } else if (keys[0] === 'email' && e.errors[keys[0]].message.includes('required')) {
            status = 353
        } else if (keys[0] === 'email' && e.errors[keys[0]].message.includes('unique')) {
            status = 354
        } else if (keys[0] === 'email' && e.errors[keys[0]].message.includes('invalid')) {
            status = 355
        } else if (keys[0] === 'password' && e.errors[keys[0]].message.includes('characters')) {
            status = 356
        } 
        res.status(status).send(e.errors[keys[0]].message); // To send a non-standard status code
    }
});


router.post('/users/login', async (req, res) => {
// Check to see if hashcode has a non-zero value. If it does then that means the user hasn't confirmed the registration via email and should not be able to login    
    try {
        const user = await User.findByCredentials(req.body.loginid, req.body.password);
        
        if (user.hashcode === '0') {
        // means the user has clicked on the confirmation email
            const token = await user.generateAuthToken(); // Note this method is on instance user and not the model User
            
            res.cookie('auth_token', token);
            /*res.sendFile(path.resolve(__dirname, '..', 'views', 'private.html'));*/
            res.send({
                user,
                token
            });
        }
        
        res.status(350).send(user);
    } catch (e) {
        res.status(400).send({e});

    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
            // Take out the token that the client is sending from the tokens stored by the user document
        });
        await req.user.save();
        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/message', async (req,res) => {
    let status = 400
    if (req.body.messageName.length <= 0) {
        status = 350
    } else if (req.body.messageEmail.length <= 0) {
        status = 351
    } else if (!validator.isEmail(req.body.messageEmail)) {
        status = 352
    } else if (req.body.messageMessage.length <= 0) {
        status = 353
    } else {
        sgMail.setApiKey(sendgridAPIKEY);
        sgMail.send({
            to: 'aaliyagallery@gmail.com',
            from: 'aaliyagallery@gmail.com',
            subject: 'New Message',
            text: `${req.body.messageName} sent message - ${req.body.messageMessage} from ${req.body.messageEmail}`
        })
        status = 200;       
    }
    res.status(status).send();
    
});


router.get('/users/confirm/:code', async (req, res) => {
// This route is called when the user clicks on the registration confirmation email. This should only be called once for a new user. The hashcode is changed to zero once the user is found successfully
    const hashcode = req.params.code;
    try {
        const user = await User.findByHashCode(hashcode);
        
        user.hashcode = 0; // The user is saved in generateAuthToken
        const token = await user.generateAuthToken(); 
        
        res.cookie('auth_token', token);
        res.send();
        
        // This endpoint should just send the cookie and then the page gets redirected to home page
        // which will get the user information based on the cokkie 
        // res.send(user);
    } catch (e) {        
        res.status(400).send();
    }
})

router.get('/users/info', auth, async (req, res) => {
// This route is called from the message page. Send the user information based on the cookie. If a user is found then the information can be used to fill out name and email fields on the message page. This will save the user some typing
    try {
        const user = req.user;
        res.send({user});
    } catch (e) {
        res.status(401).send(e);
    }
})

router.post('/users/resend/email', async (req,res) => {
// This route is used to resend the confirmation email based on the 
// loginid. First check if the user exists and then check if the hashcode
// is different from zero
    try {
        const user = await User.findByLoginId(req.body.loginid);
        
        sgMail.setApiKey(sendgridAPIKEY);
        sgMail.send({
            to: user.email,
            from: 'aaliyagallery@gmail.com',
            subject: 'aaliya-art login confirmation',
            text: `Please click on following link to login https://${host}.com:${portHTTPS}?code=${user.hashcode}`
        })
        sgMail.send({
            to: 'aaliyagallery@gmail.com',
            from: 'aaliyagallery@gmail.com',
            subject: 'New User Account Created',
            text: `Name: ${user.name}, Email: ${user.email}, Loginid: ${user.loginid}`
        })
        // Send a confirmation email to the new user, and a new user joining email to admin
        res.send();// 
        }
    catch {
        res.status(401).send();
        }

    
})

module.exports = router;
