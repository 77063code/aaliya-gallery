const express = require('express');
const router = express.Router();
const Likes = require('../models/likes');
const auth = require('../middleware/auth');
const path = require('path');



router.get('/like/:img', auth, async (req, res) => {
// user likes a picture
// check if the user has a cookie
// check if the user exists
// check if user has already liked this picture
// if yes then dont do anything
// if no then add a new record and send the new count
    
    const img = req.params.img;
    const username = req.user.username;
    
    try {
        const like = await Likes.findByUserLike(username,img)
 
       
                
        if (!like) {
        // This user is liking this picture for the first time, so add an entry
            const like = new Likes({img, username}); 
            await like.save();
            const likes = await Likes.countDocuments({img}, (err, count) => {
                            return count;
            })
            res.send({likes});
        } else {          
            const likes = await Likes.countDocuments({img}, (err, count) => {
                            return count;
            res.status(208).send({likes});
            })
            }
        
    }  catch(e) {
        throw new Error('There was an error');        
    }   

})

router.get('/likes/:img', async (req,res) => {
    const img = req.params.img
    const likes = await Likes.countDocuments({img}, (err, count) => {
        return count;
    })
    res.send({likes});
})


module.exports = router;