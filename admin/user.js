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
	const response = await Users.find({},'email name loginid imagesUploaded');
	console.log(response);
}

const findLikesByUser = async (id) => {
// get the images liked by a user
    const response = await Likes.find({loginid: id})
    console.log(response);
}

findAllUsers();
//findLikesByUser('garfield1');
