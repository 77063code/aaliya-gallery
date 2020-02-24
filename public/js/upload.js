const getSignedURL = async () => {
// Get signed URL from AWS to be able to upload to S3
    try {
        let response = await fetch('/images/signed-url-put-object')
        response = await response.json();
        return response
    } catch (e) {
        console.log(e)
    }
}

document.getElementById('file').addEventListener('click', async (e) => {
    e.preventDefault();
    uploadfile = document.getElementById('uploadfile')    
    try {
        const signedURL =  await getSignedURL();
        let response = await fetch(signedURL, {
            method: 'PUT',
            body: uploadfile.files[0]
        })
        console.log(response);
    } catch (e) {
        console.log(e);
    }
})



