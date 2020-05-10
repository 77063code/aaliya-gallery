const getSignedURL = async () => {
// Get signed URL from AWS to be able to upload to S3
    //DEBUG
    //DEBUG
    try {
        let response = await fetch('/images/signed-url-put-object')
        response = await response.json();
        //console.log(response);
        return response
    } catch (e) {
        console.log(e)
    }
}

document.getElementById('file').addEventListener('click', async (event) => {
    
    event.preventDefault();
    
    const errMessages = document.getElementsByClassName('forms-error-msg');
    const fileLength = document.getElementById('file-upload').files.length;
    const name = document.getElementById('name-upload').value;
    const year = document.getElementById('year-upload').value;
    const height = document.getElementById('height-upload').value;
    const width = document.getElementById('width-upload').value;
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
        
    } else if (!name) {
        document.getElementById('forms-error-name-upload').style.display = "block";
        document.getElementById('forms-error-name-upload').textContent = "Please enter a title for your artwork";
        document.getElementById('name-upload').focus();
        
    } else if (!year) {
        document.getElementById('forms-error-year-upload').style.display = "block";
        document.getElementById('forms-error-year-upload').textContent = "Please enter the year the artwork was created";
        document.getElementById('year-upload').focus();
        
    } else if (!height) {
        document.getElementById('forms-error-height-upload').style.display = "block";
        document.getElementById('forms-error-height-upload').textContent = "Please enter the height of your artwork";
        document.getElementById('height-upload').focus();
        
    } else if (!width) {
        document.getElementById('forms-error-name-upload').style.display = "block";
        document.getElementById('forms-error-name-upload').textContent = "Please enter the width of your artwork";
        document.getElementById('width-upload').focus();
        
    } else if (!price) {
        document.getElementById('forms-error-price-upload').style.display = "block";
        document.getElementById('forms-error-price-upload').textContent = "Please enter the selling price for your artwork";
        document.getElementById('price-upload').focus();
        
    } else {

        try {
            const data =  await getSignedURL();
            const file = document.getElementById('file-upload').files[0];
            const signedURL = data.signedURL;
            
            //console.log(signedURL);
            //console.log(file);
            
            const response = await fetch(signedURL, {
                method: 'PUT',
                body: file
            })
            
            try {
            // Image successfuly uploaded. Create a new record in image collection
                
                const imageData = {
                    name: data.name
                }
                
                //console.log(imageData);
                
                const response = await fetch('/images', {
                    method: 'POST',
                    body: JSON.stringify(imageData),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                
            } catch (e) {
                document.getElementById('forms-error-type-upload').style.display = "block";
                document.getElementById('forms-error-type-upload').textContent = "Image could not be uploaded. Please reselect the file and try again";
            }
            
            document.getElementById('forms-error-type-upload').style.display = "block";
            document.getElementById('forms-error-type-upload').textContent = "Image Successfully uploaded";
            document.getElementById('forms-error-type-upload').style.color = "green";
        } catch (e) {
            document.getElementById('forms-error-type-upload').style.display = "block";
            document.getElementById('forms-error-type-upload').textContent = "Image could not be uploaded. Please reselect the file and try again";
        }
    }
})

document.getElementById('btn-close-upload-image-form').addEventListener('click', (e) => {
// Close the form  and go back to the home page
     e.preventDefault();
     window.location.href = '/';
})



