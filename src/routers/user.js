const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const path = require('path');



router.post('/users', async (req, res) => {

    
    const user = new User(req.body);    

    try {
        await user.save()
        const token = await user.generateAuthToken();
        res.cookie('auth_token', token);
        res.status(201).send({
            user,
            token
        }); // The 201 is most routerropriate status code for a successful creation
    } catch (e) {
        res.status(400).send(e); // To send a non-standard status code
    }
});


router.post('/users/login', async (req, res) => {
    
    
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = await user.generateAuthToken(); // Note this method is on instance user and not the model User
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
            // Take out the toek that the client is sending from the tokens stored by the user document
        });
        await req.user.save();
        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
});


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