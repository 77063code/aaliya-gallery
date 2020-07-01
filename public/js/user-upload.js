// Elements
const $updateimageinfo = document.getElementsByClassName('update-image-info'); //Get all the update image buttons

const getImageInfo = async() => {
// Get information on all the images this user has uploaded
    try {
        let response = await fetch('/images/byuser');
        response = await response.json();
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

//getImageInfo();

const renderImageUploadPage = async() => {
    const userImages = document.getElementById('user-images');
    const images = await getImageInfo();
    let obj = {};
    
    images.forEach((image) => {
        const imageTemplate = document.getElementById('user-image-template').innerHTML;
        const html = Mustache.render(imageTemplate, {
            img_title: image.title,
            img_src: image.s3location,
            img_name: image.name,
            img_year: image.year,
            img_grade: image.grade,
            img_height: image.height,
            img_width: image.width,
            img_depth: image.depth,
            img_type: image.type,
            img_price: image.price            
        })
        console.log(html);
        obj[image.name] = image;
        userImages.insertAdjacentHTML('beforeEnd',html);    
    })
    

    Array.from($updateimageinfo).forEach((element) => {
        element.addEventListener('click',() => {
            const name = element.parentElement.children[0].textContent;
            const title = element.parentElement.children[8].textContent;
            const year = element.parentElement.children[1].textContent;
            const height = element.parentElement.children[3].textContent;
            const width = element.parentElement.children[4].textContent;
            const depth = element.parentElement.children[5].textContent;
            const price = element.parentElement.children[7].textContent;
            
            window.location.href = "upload.html?name=" + name + "&title=" + title + "&year=" + year + "&height=" + height + "&width=" + width + "&depth=" + depth + "&price=" + price;
        })
    })
}

document.getElementById('btn-add-new-painting').addEventListener('click', () => {
    window.location.href = "upload.html";
})

renderImageUploadPage();