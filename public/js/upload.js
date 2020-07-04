// ELEMENTS
$formsPriceError = document.getElementById('forms-error-price-upload');

const obj = Qs.parse(location.search, { ignoreQueryPrefix: true });
let update = false //By default updating an existing painting is false and adding a new painting is true

const initializeForm = () => {
// Initialize the forms based on any parametsrs passed
    if (Object.keys(obj).length > 0) {
    // If arguments were passed when calling this page, then an existing painting's information is being updated
        update = true; //Updating information about an existing painting instead of adding a new one
        document.getElementById('forms-error-file-upload').textContent = "Don't select this if not updating the image of the painting"                                                                       
        document.getElementById('title-upload').value = obj.title;
        document.getElementById('year-upload').value = obj.year;
        document.getElementById('height-upload').value = obj.height;
        document.getElementById('width-upload').value = obj.width;
        document.getElementById('depth-upload').value = obj.depth;
        document.getElementById('price-upload').value = obj.price;
    }
}

initializeForm();

const getS3Data = async () => {
// Get signed URL from AWS to be able to upload to S3
    let response;
    try {
        if (update) {
            response = await fetch('/images/signed-url-put-object/' + update + '/' + obj.name);
        }
        else {
            response = await fetch('/images/signed-url-put-object/' + update + '/' + undefined);
        }
        // Sending the update argument to the route. If update = true, the it doesnt increment imagesUploaded and imagesIndex for this user
        response = await response.json();
        //DEBUG
        console.log(response);
        //DEBUG
        return response
    } catch (e) {
        console.log(e)
    }
}

document.getElementById('file').addEventListener('click', async (event) => {
    
    event.preventDefault();
    
    const errMessages = document.getElementsByClassName('forms-error-msg');
    const fileLength = document.getElementById('file-upload').files.length;
    const file = document.getElementById('file-upload').files.length && document.getElementById('file-upload').files[0].name;
    const title = document.getElementById('title-upload').value;
    const year = document.getElementById('year-upload').value;
    const height = document.getElementById('height-upload').value;
    const width = document.getElementById('width-upload').value;
    const depth = document.getElementById('depth-upload').value;
    const price = document.getElementById('price-upload').value;

    
    for (var i = 0; i < errMessages.length; i++) {
    // Clear all the error messages
        errMessages.item(i).style.display = "none";
        errMessages.item(i).textContent = '';
    }

    if (!update && !fileLength) {
    // Adding a new image instead of update. When updating it's not necessary to specify a new image
        document.getElementById('forms-error-file-upload').style.display = "block";
        document.getElementById('forms-error-file-upload').textContent = "Please select an image to upload";
        document.getElementById('file-upload').focus();
        
    } else if (fileLength && fileExtension(file) !== 'jpg' && fileExtension(file) !== 'jpeg') {
        document.getElementById('forms-error-file-upload').style.display = "block";
        document.getElementById('forms-error-file-upload').textContent = "Images can only be uploaded in .jpg or .jpeg format";
        document.getElementById('file-upload').focus();
    }
    else if (!title) {
        document.getElementById('forms-error-title-upload').style.display = "block";
        document.getElementById('forms-error-title-upload').textContent = "Please enter a title for your artwork";
        document.getElementById('title-upload').focus();
        
    } else if (!year) {
        document.getElementById('forms-error-year-upload').style.display = "block";
        document.getElementById('forms-error-year-upload').textContent = "Please enter the year the artwork was created";
        document.getElementById('year-upload').focus();
        
    } else if (!height) {
        document.getElementById('forms-error-height-upload').style.display = "block";
        document.getElementById('forms-error-height-upload').textContent = "Please enter the height of your artwork";
        document.getElementById('height-upload').focus();
        
    } else if (!width) {
        document.getElementById('forms-error-width-upload').style.display = "block";
        document.getElementById('forms-error-width-upload').textContent = "Please enter the width of your artwork";
        document.getElementById('width-upload').focus();
        
    } else if (!depth) {
        document.getElementById('forms-error-depth-upload').style.display = "block";
        document.getElementById('forms-error-depth-upload').textContent = "Please enter the depth of your artwork";
        document.getElementById('depth-upload').focus();
        
    } else if (!price) {
        $formsPriceError.style.display = "block";
        $formsPriceError.textContent = "Please enter the selling price for your artwork";
        document.getElementById('price-upload').focus();
        
    } else {

        try {
            if (fileLength) {
                const data =  await getS3Data(); // get signed URL and other data for the image to be uploaded
                const file = document.getElementById('file-upload').files[0];
                const signedURL = data.signedURL;
                
                console.log(signedURL);

                const response = await fetch(signedURL, {
                // upload the file to AWS S3 based on the signed URL
                    method: 'PUT',
                    body: file
                })

                if (response.status === 200) { 
                    if (update) {
                    // This is an update of an existing painting
                        try {
                            const imageData = {
                                name: obj.name,
                                grade: document.getElementById('grade-upload').value,
                                type: document.getElementById('type-upload').value,
                                title,
                                year,
                                price,
                                height,
                                width,
                                depth                        
                            }
                            const response = await fetch('/images/update', {
                                method: 'POST',
                                body: JSON.stringify(imageData),
                                headers: new Headers({
                                    'Content-Type': 'application/json'
                                })
                            })

                            $formsPriceError.style.display = "block";
                            $formsPriceError.textContent = "Information successfully updated";
                            $formsPriceError.style.color = "green";
                            setTimeout(() => {window.location.replace('user-upload.html')}, 1000)
                        } catch (e) {
                            $formsPriceError.style.display = "block";
                            $formsPriceError.textContent = "Information could not be updated. Please try again";
                        }
                    }
                    else {
                    // This is a new painting being added. Add the new information to the colection
                        try {
                        // Image successfuly uploaded. Create a new record in image collection
                            const imageData = {
                                name: data.name,
                                artistid: data.artistid,
                                s3location: data.s3location,
                                backside_id: data.backside_id,
                                sold: 'N',
                                grade: document.getElementById('grade-upload').value,
                                type: document.getElementById('type-upload').value,
                                title,
                                year,
                                price,
                                height,
                                width,
                                depth                        
                            }
                            const response = await fetch('/images/' + update, {
                            // The true argument is to tell it's only an update and not an addition of a new painting
                                method: 'POST',
                                body: JSON.stringify(imageData),
                                headers: new Headers({
                                    'Content-Type': 'application/json'
                                })
                            })

                            $formsPriceError.style.display = "block";
                            $formsPriceError.textContent = "Image Successfully uploaded";
                            $formsPriceError.style.color = "green";
                            setTimeout(() => {window.location.replace('user-upload.html')}, 1000)
                        } catch (e) {
                            $formsPriceError.style.display = "block";
                            $formsPriceError.textContent = "Image could not be uploaded. Please reselect the file and try again";
                        }
                    } 
                }
                else {
                    $formsPriceError.style.display = "block";
                    $formsPriceError.textContent = "Server not responding. Please make sure you have permissions to read the image file and try again";
                }
            }
            else {
            // This is an update of an existing painting
                try {
                    // Update record in the image collection
                        const imageData = {
                            name: obj.name,
                            grade: document.getElementById('grade-upload').value,
                            type: document.getElementById('type-upload').value,
                            title,
                            year,
                            price,
                            height,
                            width,
                            depth                        
                        }
                        const response = await fetch('/images/' + update, {
                            method: 'POST',
                            body: JSON.stringify(imageData),
                            headers: new Headers({
                                'Content-Type': 'application/json'
                            })
                        })

                        $formsPriceError.style.display = "block";
                        $formsPriceError.textContent = "Information successfully updated";
                        $formsPriceError.style.color = "green";
                        setTimeout(() => {window.location.replace('user-upload.html')}, 1000)
                    } catch (e) {
                        $formsPriceError.style.display = "block";
                        $formsPriceError.textContent = "Information could not be updated. Please try again";
                    }
            }
        } catch (e) {
            $formsPriceError.style.display = "block";
            $formsPriceError.textContent = "Server not responding. Please make sure you have permissions to read the image file and try again";
        }
    }
})

document.getElementById('btn-close-upload-image-form').addEventListener('click', (e) => {
// Close the form  and go back to the home page
     e.preventDefault();
     window.location.href = '/';
})



