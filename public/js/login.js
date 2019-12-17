// ELEMENT

$errorLogin = document.getElementById('error-login')

document.forms['login'].addEventListener('submit', async (event) => {
// When the login form is successfully submitted, render the header of the home page with the correct 
// template. If unsuccessful then give an alert with a message to try again
    event.preventDefault();

    try {
        const response = await fetch(event.target.action, {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target)) // event.target is the form
        })
        if (response.status === 350) {
            $errorLogin.textContent = 'Please first confirm your registration via link in the email sent to you before logging in';
            $errorLogin.style.color = 'red';
        } else {
            let loginid = await response.json()  
            loginid = loginid.user.loginid
            window.location.href = `/?loginid=${loginid}`; // If a user is found based on creds, pass the loginid to the home page
        }
    } catch (e) {
        $errorLogin.textContent = 'Error logging in. Please try again';
        // alert('Error logging in. Please try again')
    }
});

/*document.getElementById('close-login').addEventListener('click', (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/';
})*/

document.getElementById('btn-close-login').addEventListener('click', (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/';
})

document.addEventListener('touchmove', (e) => {
// To prevent the form from reloading on swipe motion on the screen
    e.preventDefault();
}, {passive: false});
