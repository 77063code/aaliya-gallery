// ELEMENT

$errorRegister = document.getElementById('error-register');
$emailConfirm = document.getElementById('email-confirm');
$emailConfirmResend = document.getElementById('email-confirm-resend');


document.getElementById('name').focus();

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
            document.getElementById('name').focus();
        } else if(response.status === 351) {
             $errorRegister.textContent = 'Please enter a loginid';
        } else if(response.status === 352) {
            $errorRegister.textContent = 'This loginid is already taken. Please enter a different loginid';
        } else if(response.status === 353) {
            $errorRegister.textContent = 'Please enter an email';
            document.getElementById('email').focus();
        } else if(response.status === 354) {
            $errorRegister.textContent = 'This email is already being used. Please enter a different email';
            document.getElementById('email').focus();
        } else if(response.status === 355) {
            $errorRegister.textContent = 'Please enter a valid email';
            document.getElementById('email').focus();
        } else if(response.status === 356) {
            $errorRegister.textContent = 'The password needs to be atleast 7 characters long';
        } else {
             /*let loginid = await response.json()  
            loginid = loginid.user.loginid
            window.location.href = `/?loginid=${loginid}`; // If a user is found based on creds, pass the loginid to the home page */
            /*$errorRegister.textContent = 'Please check your email including the spam folder for confirmation link'*/
            $emailConfirm.textContent = 'Please check your email including the spam folder for confirmation link'
            $emailConfirmResend.textContent = "If you don't receive the confirmation email, please click on the 'Send Email Again' button"
            document.getElementById('register-user').style.display = 'none';
            document.getElementById('resend-email').style.display = 'block';
            
            
        }
    } catch (e) {
        $errorRegister.textContent = 'Error registering. Please try again';
    }
});

document.getElementById('btn-close-register').addEventListener('click', (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/';
})


document.getElementById('btn-close-resend-email').addEventListener('click', (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/';
})


document.getElementById('btn-resend-email').addEventListener('click', (e) => {
    e.preventDefault();
    alert('hello');
})

document.addEventListener('touchmove', (e) => {
// To prevent the form from reloading on swipe motion on the screen
    e.preventDefault();
}, {passive: false});

/* Was trying this solution to keep the forms working on a mobile phone, but its not working
Keeping it here for right now
document.getElementById('name').addEventListener('focus', () => {
        console.log('Hello');
        window.scrollTo(0,0);
        document.body.scrollTop = 0;
});
*/

