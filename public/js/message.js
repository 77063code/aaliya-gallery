// ELEMENT

$errorMessage = document.getElementById('error-message')

document.forms['message'].addEventListener('submit', async (event) => {
// When the login form is successfully submitted, render the header of the home page with the correct 
// template. If unsuccessful then give an alert with a message to try again
    event.preventDefault();

    try {
        const response = await fetch(event.target.action, {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target)) // event.target is the form
        })
        if (response.status === 350) {
            $errorMessage.textContent = 'Please enter your name';
        } else if (response.status === 351) {
            $errorMessage.textContent = 'Please enter an email';
        } else if (response.status === 352) {
            $errorMessage.textContent = 'Please enter a valid email';
        } else if (response.status === 353) {
            $errorMessage.textContent = 'Please enter a message';
        } else {
            $errorMessage.textContent = 'Your message was sent successfully';
            $errorMessage.style.color = 'green';
            window.location.href = `/`; 
        }       
        
    } catch (e) {
        $errorMessage.textContent = 'Error sending the message. Please try again';
        // alert('Error logging in. Please try again')
    }
});



document.getElementById('close-message').addEventListener('click', (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/';
})