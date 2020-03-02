const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const md5 = require('md5');



const artistSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true,
                trim: true
        },
        artistid: {
                type: String,
                required: true,
                trim: true,
                unique: true
        },
        email: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
		        unique: true,
                validate(value) {
                        if (!validator.isEmail(value)) {
                                throw new Error('Email is invalid');
                            
                        }
        }},
        school: {
            type: String,
            required: true,
            trim: true
        },
        grade: {
            type: String,
            required: true,
            trim: true
        },
        teachername: {
                type: String,
                required: true,
                trim: true
        },
        teacheremail: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid');
                            
                }
        }},
        numberOfPaintings: { // How many paintings have been uploaded
            type: Number,
            required: true
        },
        indexOfLastPainting: { // What was the AWS bucket index of the last image uploaded
            type: Number,
            required: true
        }
        
        hashcode: {
        // MD5 generated hash value based on loginid and email. This is filled in when the user
        // registers and once the user clicks on the email confirmation link, it should be 
        // set to zero
                type: String,
                required: false
        },
        password: {
                type: String,
                trim: true,
                validate(value) {
                        if (value.length <= 6) {
                                //throw new Error('The passwords needs to be more than 6 characters');
                            throw new Error('The password needs to more than 6 characters')
                        }
                }
        },
	tokens: [{
		token: {
			type: String,
			required: true
			}
		}]
});

artistSchema.plugin(uniqueValidator); // This is needed to check the uniqueness property of a field



artistSchema.methods.generateAuthToken = async function () {
// Generate a new token and add it to the tokens array on the object
    try {
	   const artist = this;
	   const token = jwt.sign({ _id: artist._id.toString() }, 'HelloWorld', {    expiresIn: 60 * 60 * 24}); // expires in 24 hours
	   artist.tokens = artist.tokens.concat({token});
	   await artist.save();
	   return token;
    } catch (e) {
        console.log(e);
    }
};

artistSchema.methods.generateHashCode = async function () {
// Generate a new hashcode and add it to the user instance
    try {
	   const artist = this;
        user.hashcode = md5(artist.artistid + artist.email + Math.floor(Math.random()*50000)); 
        // Create a hash value using the loginid, email and a random number b/w 0 amd 50000
	   await user.save();
    } catch (e) {
        console.log(e);
    }
};


artistSchema.methods.toJSON = function () {
// We dont want to expose password and tokens when we send the user data back to the client
// This method(toJSON) is called whenever stringify is called on the object and stringify is
// called whenever we do res.send
	const artist = this;
	const artistObject = artist.toObject(); // This method is provided by mongoose to remove some metadata and properties can be deleted from the object

	delete artistObject.password;
	delete artistObject.tokens;
    /* Need both these fields for the message form
    delete userObject.name;
    delete userObject.email;
    */

	return artistObject;
};

// Authenticate the user based on loginid and password
artistSchema.statics.findByCredentials = async (artistid,password) => {
    
	try {
       const artist = await Artist.findOne({artistid});
    
	   if (!artist) {
		  throw new Error('Unable to login');
	   };
    
	   const isMatch = await bcrypt.compare(password,artist.password);   

	   if (!isMatch) {
           throw new Error('Unable to login');
	   }
	   return artist;
    } catch (e) {
        console.log(e);
    }
};

artistSchema.statics.findByArtistId = async (artistid) => {
// Find user by loginid
    
    try {
	   const artist = await User.findOne({artistid});
    
	   if (!artist) {
           console.log('error');
		  throw new Error('Unable to login');
	   };
    
	   return artist;
    } catch (e) {
        console.log(e);
    }
};

artistSchema.statics.findByHashCode = async (hashcode) => {
// Find the user by hashcode
    try {
        const artist = await Artist.findOne({hashcode});
        if (!artist) {
            throw new Error('Cannot find the artist');
        }    
        return artist;
    } catch (e) {
        console.log(e);
    }
}
                                                    


// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
	try {
       const artist = this;

	   if (artist.isModified('password')) {
	   // This will be true when the user is first created and then again if the password is being changed
           artist.password = await bcrypt.hash(artist.password,8);
	   }
    } catch (e) {
        console.log(e)
    }
	next();
});

const Artist = mongoose.model('Artist',artistSchema);
module.exports = Artist;
