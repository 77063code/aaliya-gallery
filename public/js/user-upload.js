// Elements
const $updateimageinfo = document.getElementsByClassName('update-image-info'); //Get all the update image buttons
const $deleteimage = document.getElementsByClassName('delete-image'); //Get all the delete image buttons

const checkUserEligibility = async () => {
//Check if the user is an artist. If not redirect to home page
    const user = await getUserInfo();
    
    if (!user || !user.artist) {
        window.location.href = '/';
    }
    else {
        //DEBUG
        //alert(user.imagesAllowed);
        //DEBUG
        if (user.imagesAllowed <= user.imagesUploaded) {
        //User has reached the maximum number of artwork images that can be uploaed. Disbale the add button
            document.getElementById('btn-add-new-painting').disabled = true
        }
    }
}

checkUserEligibility();


const getImageInfo = async() => {
// Get information on all the images this user has uploaded
    try {
        let response = await fetch('/images/byuser');
        response = await response.json();
        //DEBUG
        //console.log(response);
        //DEBUG
        return response;
    } catch (e) {
        //DEBUG
        //console.log(e);
        //DEBUG
        return undefined;
    }
}

const renderImageUploadPage = async() => {
//This function runs everytime the page is called or refershed
    
    const userImages = document.getElementById('user-images');
    const images = await getImageInfo();
    let obj = {};
    
    if (images.length === 0) {
    //This user hasn't uploaded any artwork
    //Show a message asking them to upload artwork
        document.getElementById('msg-no-images').style.display = "block";
    }
    
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
            img_orientation: image.orientation,
            img_price: image.price,
            img_version: image.version
        })
        //DEBUG
        //console.log(html);
        //DEBUG
        obj[image.name] = image;
        userImages.insertAdjacentHTML('beforeEnd',html);    
    })
    

    Array.from($updateimageinfo).forEach((element) => {
        element.addEventListener('click',() => {
        //Create a click event for each update button.
        //Redirect to update.html passing the information about the image so the form can be populated with existing values
            const name = element.parentElement.parentElement.children[0].textContent;
            const year = element.parentElement.parentElement.children[1].textContent;
            const grade = element.parentElement.parentElement.children[2].textContent;
            const height = element.parentElement.parentElement.children[3].textContent;
            const width = element.parentElement.parentElement.children[4].textContent;
            const depth = element.parentElement.parentElement.children[5].textContent;
            const type = element.parentElement.parentElement.children[6].textContent;
            const orientation = element.parentElement.parentElement.children[7].textContent;
            const price = element.parentElement.parentElement.children[8].textContent;
            const version = element.parentElement.parentElement.children[9].textContent;
            const title = element.parentElement.parentElement.children[10].textContent;
            
            window.location.href = "upload.html?name=" + name + "&title=" + title + "&year=" + year + "&grade=" + grade + "&height=" + height + "&width=" + width + "&depth=" + depth + "&type=" + type + "&orientation=" + orientation + "&price=" + price + "&version=" + version;
        })
    })
    
    
        Array.from($deleteimage).forEach((element) => {
            element.addEventListener('click', async () => {
            //Create a click event for each delete button.
            //Delete image corresponding to that delete button
            //This will delete all associated likes, image info and the image from the database
                const name = element.parentElement.parentElement.children[0].textContent;

                try {
                    const response = await fetch('/images/delete/' + name);
                    if (response.status === 200) {
                        window.location.reload(); //Reload the  page on successful delete. This should remove this image from the list
                    }
                    else {
                        alert('There was an error deleting the image. Please refresh the page and try again')
                    }
                } catch (e) {
                    alert('Error deleting image. Please try again')
                }
            })
    })
}

document.getElementById('btn-add-new-painting').addEventListener('click', () => {
    window.location.href = "upload.html";
})

document.getElementById('btn-done').addEventListener('click', () => {
    window.location.href = "/";
})

renderImageUploadPage();