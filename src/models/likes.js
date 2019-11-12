const mongoose = require('mongoose');


const likesSchema = new mongoose.Schema({
        img: {
                type: String,
                required: true,
                trim: true
        },
        username: { // user who liked this image
                type: String,
                required: true,
                trim: true

        }
});


// Authenticate the user
likesSchema.statics.findByUserLike = async (username,img) => {
    
    try {
        const like = await Likes.findOne({username,img});   

	   return like;
    } catch(e) {
        console.log('The collection doesnt exist')
        return(null);
    }
};


const Likes = mongoose.model('Likes',likesSchema);

module.exports = Likes;
