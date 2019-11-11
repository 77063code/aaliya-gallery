const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const path = require('path');



router.post('/users', async (req, res) => {

    
    const user = new User(req.body);    

    try {
        console.log('Hello World')
        await user.save()
        console.log('Hello World')
        const token = await user.generateAuthToken();
        console.log('Hello World')
        res.cookie('auth_token', token);
        console.log('Hello World')
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
        console.log('This is working');
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

router.get('/likes', async (req, res) => {
    
    const likes = {
        like: 55
    }
    console.log('Got it');
    console.log(likes.like)
    res.send(likes);
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


router.get('/users/me', auth, (req, res) => {
    // This route sends self information based on the token provided, which also contains the id
    res.send(req.user);
});



router.patch('/users/me', auth, async (req, res) => {
    // Refactoring where cannot update based on id, can only update own data

    const updates = Object.keys(req.body); // Create an array of the keys in req.body array
    const allowedUpdates = ['name', 'password', 'email', 'age']; // These are the only fileds that can be updated, 
    // so for example id or any non existent field cannot be updated
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    // Check to see if every field that is being updated is in the list of allowed fields that can be udpated


    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates'
        });
    }



    try {

        // Commenting this section out b/c findByIdAndUpdate doesnt run the middleware
        // so won't run the pre-save middleware	
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators: true });
        // new:true means return the new object with update value
        // runValidators means run all the validation code

        // We already have the user due to running auth const user = await User.findById(req.params.id);
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save(); //This is where the middleware actually gets saved


        res.send(req.user);
    } catch (e) {
        // Here we can have 2 cases, one where the db connection failed
        // or the validation failed
        // Currrently we are just looking at failing validation
        res.status(400).send(e);
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