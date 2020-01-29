const mongoose = require('../src/db/mongoose');
const Image = require('../src/models/image');



const imageInfo1 = {
    name: 'aaliya-1.jpg',
    loginid: 'aaliya1',
    displayname: 'Mountain & Lake',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n'
}

const imageInfo2 = {
    name: 'aaliya-2.jpg',
    loginid: 'aaliya1',
    displayname: 'Solitude',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'y'
}


const imageInfo3 = {
    name: 'aaliya-3.jpg',
    loginid: 'aaliya1',
    displayname: 'Butterfly',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n'
}


const imageInfo4 = {
    name: 'aaliya-4.jpg',
    loginid: 'aaliya1',
    displayname: 'Rainbow Tree',
    year: 2017,
    price: 100,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n'
}

const imageInfo5 = {
    name: 'aaliya-5.jpg',
    loginid: 'aaliya1',
    displayname: 'Venice',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'y'
}

const imageInfo6 = {
    name: 'aaliya-6.jpg',
    loginid: 'aaliya1',
    displayname: 'Clueless Sally',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'Portrait',
    grade: 'Elementary',
    sold: 'n'
}

const imageInfo7 = {
    name: 'aaliya-7.jpg',
    loginid: 'aaliya1',
    displayname: 'First Abstract',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n'
}


const imageInfo8 = {
    name: 'aaliya-8.jpg',
    loginid: 'aaliya1',
    displayname: 'Surprised Sally',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'Portrait',
    grade: 'Elementary',
    sold: 'n'
}


const imageInfo9 = {
    name: 'aaliya-9.jpg',
    loginid: 'aaliya1',
    displayname: 'Confused Sally',
    year: 2019,
    price: 100,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n'
}

const imageInfo10 = {
    name: 'aaliya-10.jpg',
    loginid: 'aaliya1',
    displayname: 'Shore',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n'
}

const imageInfo11 = {
    name: 'aaliya-11.jpg',
    loginid: 'aaliya1',
    displayname: 'Medley',
    year: 2019,
    price: 150,
    type: 'Crayons on Canvas',
    length: 16,
    width: 20,
    orientation: 'Portrait',
    grade: 'Elementary',
    sold: 'n'
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
