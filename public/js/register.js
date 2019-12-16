// ELEMENT

$errorRegister = document.getElementById('error-register');

document.forms['register'].addEventListener('submit', async (event) => {
// When the login form is successfully submitted, render the header of the home page with the correct 
// template. If unsuccessful then give an alert with a message to try again
    event.preventDefault();
    $errorRegister.textContent = "";

    try {
        const response = await fetch(event.target.action, {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target)) // event.target is the form
            
        })
        if (response.status === 350) {
            $errorRegister.textContent = 'Please enter your name';
        } else if(response.status === 351) {
             $errorRegister.textContent = 'Please enter a username';
        } else if(response.status === 352) {
            $errorRegister.textContent = 'This username is already taken. Please enter a different username';
        } else if(response.status === 353) {
            $errorRegister.textContent = 'Please enter an email';
        } else if(response.status === 354) {
            $errorRegister.textContent = 'This email is already being used. Please enter a different email';
        } else if(response.status === 355) {
            $errorRegister.textContent = 'Please enter a valid email';
        } else if(response.status === 356) {
            $errorRegister.textContent = 'The password needs to be atleast 7 characters long';
        } else {
             /*let username = await response.json()  
            username = username.user.username
            window.location.href = `/?username=${username}`; // If a user is found based on creds, pass the username to the home page */
            $errorRegister.textContent = 'Please check your email for confirmation link'
        }
    } catch (e) {
        $errorRegister.textContent = 'Error registering. Please try again';
    }
});

document.getElementById('close-register').addEventListener('click', (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/';
})

document.addEventListener('ontouchmove', (e) => {
    e.preventDefault();
});
