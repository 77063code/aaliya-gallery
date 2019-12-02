const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const path = require('path');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const sgMail = require('@sendgrid/mail');
const sendgridAPIKEY = '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'





router.post('/users', async (req, res) => {
// Register a new user  
    const user = new User(req.body);
    try {
        /*try {*/
            await user.save()
        /*} catch(e) {
                const keys = Object.keys(e.errors);
            console.log(keys)
            keys.forEach((key) => {
                console.log(key);
                console.log(e.errors[key].message);
        })
        }*/
        
        await user.generateHashCode();
        const token = await user.generateAuthToken();
        res.cookie('auth_token', token);
        sgMail.setApiKey(sendgridAPIKEY);
        sgMail.send({
            to: user.email,
            from: 'sgupt9999@gmail.com',
            subject: 'aaliya-art login confirmation',
            text: `Please click on following link to login http://localhost:3000?code=${user.hashcode}`
        })
        console.log(user.email);
        res.status(201).send({
            user,
            token
        }); // The 201 is most routerropriate status code for a successful creation
    } catch (e) {
        // All these errors happen when the save is run
        const keys = Object.keys(e.errors);
        let status = 400;       
        if (keys[0] === 'name') {
             status = 350
        } else if (keys[0] === 'username' && e.errors[keys[0]].message.includes('required')) {
            status = 351
        } else if (keys[0] === 'username' && e.errors[keys[0]].message.includes('unique')) {
            status = 352
        } else if (keys[0] === 'email' && e.errors[keys[0]].message.includes('required')) {
            status = 353
        } else if (keys[0] === 'email' && e.errors[keys[0]].message.includes('unique')) {
            status = 354
        } else if (keys[0] === 'email' && e.errors[keys[0]].message.includes('invalid')) {
            status = 355
        } else if (keys[0] === 'password' && e.errors[keys[0]].message.includes('characters')) {
            status = 356
        } else if (keys[0] === 'password' && e.errors[keys[0]].message.includes('password')) {
            status = 357
        }
        res.status(status).send(e.errors[keys[0]].message); // To send a non-standard status code
    }
});


router.post('/users/login', async (req, res) => {
    
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        console.log(user);
        const token = await user.generateAuthToken(); // Note this method is on instance user and not the model User
        console.log(token);
        res.cookie('auth_token', token);
        /*res.sendFile(path.resolve(__dirname, '..', 'views', 'private.html'));*/
        res.send({
            user,
            token
        });
    } catch (e) {
        res.status(400).send();

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
    if (req.body.name.length <= 0) {
        status = 350
    } else if (req.body.email.length <= 0) {
        status = 351
    } else if (!validator.isEmail(req.body.email)) {
        status = 352
    } else if (req.body.message.length <= 0) {
        status = 353
    } else {
        sgMail.setApiKey(sendgridAPIKEY);
        sgMail.send({
            to: 'sgupt9999@gmail.com',
            from: 'sgupt9999@gmail.com',
            subject: 'aaliya-art',
            text: `${req.body.name} sent message - ${req.body.message} from ${req.body.email}`
        })
        status = 200;       
    }
    res.status(status).send();
    
});


router.get('/users/confirm/:code', async (req, res) => {
// This route is called when the user clicks on the registration confirmation email
    const hashcode = req.params.code;
    try {
        const user = await User.findByHashCode(hashcode);
        const token = await user.generateAuthToken(); // Note this method is on instance user and not the model User
        res.cookie('auth_token', token);
        res.send({
            user,
            token
        });
    } catch (e) {
        console.log('There is an error')
        res.status(400).send();
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});




router.delete('/users/me', auth, async (req, res) => {

    try {
        req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
});


module.exports = router;