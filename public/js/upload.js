// ELEMENTS
$formsPriceError = document.getElementById('forms-error-price-upload');

const getS3Data = async () => {
// Get signed URL from AWS to be able to upload to S3
    try {
        let response = await fetch('/images/signed-url-put-object')
        response = await response.json();
        //DEBUG
        //console.log(response);
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

    if (!fileLength) {
        document.getElementById('forms-error-file-upload').style.display = "block";
        document.getElementById('forms-error-file-upload').textContent = "Please select an image to upload";
        document.getElementById('file-upload').focus();
        
    } else if (fileExtension(file) !== 'jpg' && fileExtension(file) !== 'jpeg') {
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
            const data =  await getS3Data(); // get signed URL and other data for the image to be uploaded
            const file = document.getElementById('file-upload').files[0];
            const signedURL = data.signedURL;
            
            const response = await fetch(signedURL, {
            // upload the file to AWS S3 based on the signed URL
                method: 'PUT',
                body: file
            })
            
            console.log(response);
            console.log(document.getElementById('grade-upload').value);
            if (response.status === 200) {       
                try {
                // Image successfuly uploaded. Create a new record in image collection

                    console.log('Hello');
                    
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
                    
                    console.log(imageData);

                    const response = await fetch('/images', {
                        method: 'POST',
                        body: JSON.stringify(imageData),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    })
                    
                    $formsPriceError.style.display = "block";
                    $formsPriceError.textContent = "Image Successfully uploaded";
                    $formsPriceError.style.color = "green";
                } catch (e) {
                    $formsPriceError.style.display = "block";
                    $formsPriceError.textContent = "Image could not be uploaded. Please reselect the file and try again";
                }
            } else {
                $formsPriceError.style.display = "block";
                $formsPriceError.textContent = "Image could not be uploaded. Please reselect the file and try again";
            }
        } catch (e) {
            $formsPriceError.style.display = "block";
            $formsPriceError.textContent = "Image could not be uploaded. Please reselect the file and try again";
        }
    }
})

document.getElementById('btn-close-upload-image-form').addEventListener('click', (e) => {
// Close the form  and go back to the home page
     e.preventDefault();
     window.location.href = '/';
})



