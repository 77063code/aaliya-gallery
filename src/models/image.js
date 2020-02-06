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
        loginid: {
                type: String,
                required: true,
                trim: true                
        },
        displayname: {
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
        width: {
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
                required: true,
                trim: true,
                lowercase: true
        },
        sold: {
                type: String,
                required: true,
                lowercase: true
        }
        
});

//userSchema.plugin(uniqueValidator); // This is needed to check the uniqueness property of a field




const Image = mongoose.model('Image',imageSchema);
module.exports = Image;
