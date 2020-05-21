const mongoose = require('../src/db/mongoose');
const Likes = require('../src/models/likes');
const Users = require('../src/models/user');


const updateImageNames = async (oldImage, newImage) => {
	const res1 = await Likes.updateMany({ img: oldImage }, {img: newImage});
	console.log(oldImage + ' was modified to  ' + newImage + ' ' + res1.nModified + ' times');
}

const findCountByImage = async (imgName) => {
	const countQuery = await Likes.where({'img': imgName }).countDocuments();
	console.log(imgName + '-' + countQuery);
};

const findAllUsers = async () => {
// get the name and email of all users
	const response = await Users.find({},'email name loginid imagesUploaded hashcode artist');
	console.log(response);
}

const findLikesByUser = async (email_id) => {
// get the images liked by a user
    const response = await Likes.find({email: email_id})
    console.log(response);
}

const updateHashCode = async (email_id) => {
//Update hascode of a user to zero, so doesnt have to go through activaetion email
    const response = await Users.updateOne({ email : 'sgupt9999@gmail.com'}, { hashcode: '0' })
    console.log(response);
}

const updateField = async (user,value) => {
//Update field of a user to a passed value
    const response = await Users.updateOne({ email : user}, { artist: value })
    console.log(response);
}

const deleteUser = async (email_id) => {
    const response = await Users.deleteOne({email: email_id});
    console.log(response);
}

findAllUsers();
//findLikesByUser('garfield1');
//updateHashCode('sgupt9999@gmail.com');
//deleteUser('sgupt9999@gmail.com');
//findAllUsers();
updateField('sgupt9999@gmail.com',false);
