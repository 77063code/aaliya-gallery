const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');



const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    artistid: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: false,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    height: {
        type: Number,
        required: false,
        trim: true
    },
    width: {
        type: Number,
        required: false,
        trim: true
    },
    depth: {
        type: Number,
        required: false,
        trim: true
    },
    orientation: {
        type: String,
        required: false,
        trim: true,
        lowercase: true
    },
    grade: {
        type: String,
        required: false,
        trim: true
    },
    sold: {
        type: String,
        required: false,
        lowercase: true
    },
    backside_id: {
        type: String,
        required: true
    },
    s3location: {
        type: String,
        lowercase: true
    },
    version: {
    //Version of the image saved. If user updates the image, the due to caching the new image doesn't get displayed
    //version will get incremented everytime an image for a painting is updated. This will create a new AWS S3 link
    //and will force the browser to et the new file
        type: Number,
        required: false
    },
    original: {
    //User entered field to tag a painting as original or not
        type: Boolean,
        required: false
    }

});

//userSchema.plugin(uniqueValidator); // This is needed to check the uniqueness property of a field




const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
