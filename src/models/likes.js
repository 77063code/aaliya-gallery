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
    
	const like = await Likes.findOne({username,img});

	if (!like) {
		throw new Error('like not found');
	};

	return like;
};


const Likes = mongoose.model('Likes',likesSchema);

module.exports = Likes;
