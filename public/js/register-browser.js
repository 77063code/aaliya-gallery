// ELEMENT

$errorRegister = document.getElementById('error-register');
$emailConfirm = document.getElementById('email-confirm');
$emailConfirmResend = document.getElementById('email-confirm-resend');


//document.getElementById('name').focus();

document.forms['register-browser-form'].addEventListener('submit', async (event) => {
// When the login form is successfully submitted, render the header of the home page with the correct 
// template. If unsuccessful then give an alert with a message to try again
    event.preventDefault();
    $errorRegister.textContent = "";
    
    const name = document.getElementById('name-browser').value
    const email = document.getElementById('email-browser').value
    const loginid = document.getElementById('loginid-browser').value
    const password = document.getElementById('password-browser').value
    
    if (!name) {
        $errorRegister.textContent = 'Please enter your name';
        document.getElementById('name-browser').focus();
    }
    else if (!email) {
        $errorRegister.textContent = 'Please enter your email';
        document.getElementById('email-browser').focus();
    }
    else if (!emailIsValid(email)) {
        $errorRegister.textContent = 'Please enter a valid email';
        document.getElementById('email-browser').focus();
    }
    else if (!loginid) {
        $errorRegister.textContent = 'Please enter a login';
        document.getElementById('loginid-browser').focus();
    }
    else if (!password) {
        $errorRegister.textContent = 'Please enter your password';
        document.getElementById('password-browser').focus();
    }
    else if(password.length < 7) {
            $errorRegister.textContent = 'Password needs to be atleast 7 characters';
            document.getElementById('password-browser').focus();
    }
    else {
        try {
            const response = await fetch(event.target.action, {
                    method: 'POST',
                    body: new URLSearchParams(new FormData(event.target)) // event.target is the form
            })
            if(response.status === 352) {
                $errorRegister.textContent = 'This email is already being used. Please enter a different email';
                document.getElementById('email-browser').focus();
            }
            else if(response.status === 351) {
                $errorRegister.textContent = 'This loginid is already taken. Please enter a different loginid';
                document.getElementById('loginid-browser').focus();
            } 
            else {
                $emailConfirm.textContent = 'Before your account can be activated, please click on the link in your email'
                $emailConfirmResend.textContent = "If you don't receive the activation email, please click on the 'Resend Email' button"
                document.getElementById('register-browser').style.display = 'none';
                document.getElementById('resend-email').style.display = 'block';
            }
        } catch (e) {
            $errorRegister.textContent = 'Error registering. Please try again';
        }
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


document.getElementById('btn-resend-email').addEventListener('click', async (e) => {
    e.preventDefault();
    const loginid = document.getElementById('register-browser-form').elements['loginid'].value
    const data = {loginid}
    document.getElementById('btn-resend-email').disabled = true;
    try {
        const response = await fetch('/users/resend/email', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    if (response.status === 200) {
        $emailConfirm.textContent = '';
        $emailConfirmResend.textContent = 'Activation email resent. Please check your email including the spam folder';
        }
    else {
        $emailConfirmResend.textContent = 'Error sending activation email. Please send us a message';
        }
    }
    catch (e) {
        $emailConfirmResend.textContent = 'Error sending activation email. Please send us a message';
    }
    
    // setTimeout(() => {window.location.href = '/'}, 2000)
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

