const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const md5 = require('md5');



const userSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true,
                trim: true
        },
        loginid: {
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

userSchema.plugin(uniqueValidator); // This is needed to check the uniqueness property of a field


// Generate a new token and add it to the tokens array on the object
userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, 'HelloWorld');
	user.tokens = user.tokens.concat({token});
	await user.save();
	return token;
};

userSchema.methods.generateHashCode = async function () {
// Generate a new hashcode and add it to the user instance
	const user = this;
    user.hashcode = md5(user.loginid + user.email + Math.floor(Math.random()*50000)); 
    // Create a hash value using the loginid, email and a random number b/w 0 amd 50000
	await user.save();
};


userSchema.methods.toJSON = function () {
// We dont want to expose password and tokens when we send the user data back to the client
// This method(toJSON) is called whenever stringify is called on the object and stringify is
// called whenever we do res.send
	const user = this;
	const userObject = user.toObject(); // This method is provided by mongoose to remove some metadata and properties can be deleted from the object

	delete userObject.password;
	delete userObject.tokens;
    /* Need both these fields for the message form
    delete userObject.name;
    delete userObject.email;
    */

	return userObject;
};

// Authenticate the user based on loginid and password
userSchema.statics.findByCredentials = async (loginid,password) => {
    
	const user = await User.findOne({loginid});
    
	if (!user) {
		throw new Error('Unable to login');
	};
    
	const isMatch = await bcrypt.compare(password,user.password);   

	if (!isMatch) {
		throw new Error('Unable to login');
	}
	return user;
};

// Find user by loginid
userSchema.statics.findByLoginId = async (loginid) => {
    
	const user = await User.findOne({loginid});
    
	if (!user) {
        console.log('error');
		throw new Error('Unable to login');
	};
    
	return user;
};

// Find the user by hashcode
userSchema.statics.findByHashCode = async (hashcode) => {
    const user = await User.findOne({hashcode});
    if (!user) {
        throw new Error('Cannot find the user');
    }    
    return user;      
}
                                                    


// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password')) {
	// This will be true when the user is first created and then again if the password is being changed
		user.password = await bcrypt.hash(user.password,8);
	}    
	next();
});

const User = mongoose.model('User',userSchema);
module.exports = User;
