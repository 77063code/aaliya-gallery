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
    length: {
        type: Number,
        required: false,
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
    }

});

//userSchema.plugin(uniqueValidator); // This is needed to check the uniqueness property of a field




const Image = mongoose.model('Image', imageSchema);
module.exports = Image;