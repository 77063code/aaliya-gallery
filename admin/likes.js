const mongoose = require('../src/db/mongoose');
const Likes = require('../src/models/likes');


const updateImageNames = async (oldImage, newImage) => {
	const res1 = await Likes.updateMany({ img: oldImage }, {img: newImage});
	console.log(oldImage + ' was modified to  ' + newImage + ' ' + res1.nModified + ' times');
}

const findCountByImage = async (imgName) => {
	const countQuery = await Likes.where({'img': imgName }).countDocuments();
	console.log(imgName + '-' + countQuery);
};

const findAllLikes = async () => {
// get the full dump of the likes collection
	const response = await Likes.find();
	console.log(response);
}

const deleteLikesByLogin= async (id) => {
// Delete all likes by a particular user
    const response = await Likes.deleteMany({loginid: id});
    console.log(response);
}

const findImageCounts = () => {
	findCountByImage('img1');
	findCountByImage('img2');
	findCountByImage('img3');
	findCountByImage('img4');
	findCountByImage('img5');
	findCountByImage('img6');
	findCountByImage('img7');
	findCountByImage('img8');

	findCountByImage('aaliya-1');
	findCountByImage('aaliya-2');
	findCountByImage('aaliya-3');
	findCountByImage('aaliya-4');
	findCountByImage('aaliya-5');
	findCountByImage('aaliya-6');
	findCountByImage('aaliya-7');
	findCountByImage('aaliya-8');
	findCountByImage('aaliya-9');
	findCountByImage('aaliya-10');
	findCountByImage('aaliya-11');
}

const updateAllImageNames = () => {
	updateImageNames('img1','aaliya-1');
	updateImageNames('img2','aaliya-2');
	updateImageNames('img3','aaliya-3');
	updateImageNames('img4','aaliya-4');
	updateImageNames('img5','aaliya-5');
	updateImageNames('img6','aaliya-6');
	updateImageNames('img7','aaliya-7');
	updateImageNames('img8','aaliya-9');
}

//findImageCounts();
//updateAllImageNames();
//findImageCounts();
//findAllLikes();
deleteLikesByLogin('garfield1');
