const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true,
                trim: true
        },
        username: {
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
        password: {
                type: String,
                trim: true,
                validate(value) {
                        if (value.length <= 6) {
                                throw new Error('The passwords needs to be more than 6 characters');
                        }
                        if (validator.contains(value.toLowerCase(),'password')) {
                                throw new Error('The password cannnot include string password');
                        }}
        },
	tokens: [{
		token: {
			type: String,
			required: true
			}
		}]
});


// Generate a new token and add it to the tokens array on the object
userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, 'HelloWorld');
	user.tokens = user.tokens.concat({token});
	await user.save();
	return token;
};

// We dont want to expose password and tokens when we send the user data back to the client
userSchema.methods.toJSON = function () {
	// This method is called whenever stringify is called on the object and stringify is
	// called whenever we do res.send
	const user = this;
	const userObject = user.toObject(); // This method is provided by mongoose to remove some metadata and properties can be deleted from the object

	delete userObject.password;
	delete userObject.tokens;
    delete userObject.name;
    delete userObject.email;

	return userObject;
};

// Authenticate the user
userSchema.statics.findByCredentials = async (username,password) => {
    
	const user = await User.findOne({username});

	if (!user) {
		throw new Error('Unable to login');
	};

	const isMatch = await bcrypt.compare(password,user.password);
   

	if (!isMatch) {
		throw new Error('Unable to login');
	}

	return user;
};


// Hash the plain text username and password before saving
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
