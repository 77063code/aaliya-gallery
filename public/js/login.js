// ELEMENT
$errorLogin = document.getElementById('error-login');
$confirmationEmail = document.getElementById('confirmation-email');
$loginResendEmail = document.getElementById('login-resend-email');
$btnLoginResendEmail = document.getElementById('btn-login-resend-email');


/*
document.getElementById('register-account').addEventListener("click", () => {
    window.location.href='/register.html'
})*/


const displayErrors = (hide) => {
    
    const errMessages = document.getElementsByClassName('forms-error-msg');
    
    for (var i = 0; i < errMessages.length; i++) {
        errMessages.item(i).style.display = hide;
        errMessages.item(i).textContent = '';
    }   
    $btnLoginResendEmail.style.display = hide;
}

displayErrors("none");

document.forms['login-form'].addEventListener('submit', async (event) => {
// When the login form is successfully submitted, render the header of the home page with the correct 
// template. If unsuccessful then give an alert with a message to try again
    event.preventDefault();
    displayErrors("none");

    try {
        const response = await fetch(event.target.action, {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target)) // event.target is the form
        })
        if (response.status === 350) {
            displayErrors("block");
            $confirmationEmail.textContent = 'Please check your email for confirmation link before logging in';
            $loginResendEmail.textContent = "If you didn't receive the confirmation email, please click on the 'Resend Email' button"
        } else if (response.status === 200) {
            window.location.href='/';
        }
        else {
            $errorLogin.style.display = "block";
            $errorLogin.textContent = 'Error logging in. Please try again';
        }
    } catch (e) {
        $errorLogin.style.display = "block";
        $errorLogin.textContent = 'Error logging in. Please try again';
    }
});


$btnLoginResendEmail.addEventListener('click', async (e) => {
    e.preventDefault();
    const loginid = document.getElementById('login-form').elements['loginid'].value
    const data = {loginid}
    $btnLoginResendEmail.disabled = true;
    try {
        const response = await fetch('/users/resend/email', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    if (response.status === 200) {
        $errorLogin.textContent = '';
        $loginResendEmail.textContent = 'Confirmation email resent. Please check your email including the spam folder';
        }
    else {
        $loginResendEmail.textContent = 'Error sending confirmation email. Please send us a message';
        }
    }
    catch (e) {
        $loginResendEmail.textContent = 'Error sending confirmation email. Please send us a message';
    }

})

document.getElementById('btn-close-login-form').addEventListener('click', (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/';
})

/*
document.addEventListener('touchmove', (e) => {
// To prevent the form from reloading on swipe motion on the screen
    e.preventDefault();
}, {passive: false});
*/