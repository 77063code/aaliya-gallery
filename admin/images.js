const mongoose = require('../src/db/mongoose');
const Image = require('../src/models/image');



const imageInfo1 = {
    name: 'aaliya1-1.jpg',
    artistid: 'aaliya1',
    displayname: 'Mountain & Lake',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-1__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-1.jpg'
}

const imageInfo2 = {
    name: 'aaliya1-2.jpg',
    artistid: 'aaliya1',
    displayname: 'Solitude',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'y',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-2__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-2.jpg'
}


const imageInfo3 = {
    name: 'aaliya1-3.jpg',
    artistid: 'aaliya1',
    displayname: 'Butterfly',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-3__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-3.jpg'
}


const imageInfo4 = {
    name: 'aaliya1-4.jpg',
    artistid: 'aaliya1',
    displayname: 'Rainbow Tree',
    year: 2017,
    price: 100,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-4__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-4.jpg'
}

const imageInfo5 = {
    name: 'aaliya1-5.jpg',
    artistid: 'aaliya1',
    displayname: 'Venice',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'y',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-5__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-5.jpg'
}

const imageInfo6 = {
    name: 'aaliya1-6.jpg',
    artistid: 'aaliya1',
    displayname: 'Clueless Sally',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'Portrait',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-6__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-6.jpg'
}

const imageInfo7 = {
    name: 'aaliya1-7.jpg',
    artistid: 'aaliya1',
    displayname: 'First Abstract',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-7__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-7.jpg'
}


const imageInfo8 = {
    name: 'aaliya1-8.jpg',
    artistid: 'aaliya1',
    displayname: 'Surprised Sally',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'Portrait',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-8__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-8.jpg'
}


const imageInfo9 = {
    name: 'aaliya1-9.jpg',
    artistid: 'aaliya1',
    displayname: 'Confused Sally',
    year: 2019,
    price: 100,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-9__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-9.jpg'
}

const imageInfo10 = {
    name: 'aaliya1-10.jpg',
    artistid: 'aaliya1',
    displayname: 'Shore',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-10__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-10.jpg'
}

const imageInfo11 = {
    name: 'aaliya1-11.jpg',
    artistid: 'aaliya1',
    displayname: 'Medley',
    year: 2019,
    price: 150,
    type: 'Crayons on Canvas',
    length: 16,
    width: 20,
    orientation: 'Portrait',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-11__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-11.jpg'
}


const saveImageInfo = async (imageInfo) => {
    const image = new Image(imageInfo);
    try {
        await image.save();
        console.log(`${image.name} save successfully`)
    } catch (e) {
        console.log(e);
    }
}

saveImageInfo(imageInfo1);
saveImageInfo(imageInfo2);
saveImageInfo(imageInfo3);
saveImageInfo(imageInfo4);
saveImageInfo(imageInfo5);
saveImageInfo(imageInfo6);
saveImageInfo(imageInfo7);
saveImageInfo(imageInfo8);
saveImageInfo(imageInfo9);
saveImageInfo(imageInfo10);
saveImageInfo(imageInfo11);
