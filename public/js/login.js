// ELEMENT
$errorLogin = document.getElementById('error-login');
$loginResendEmail = document.getElementById('login-resend-email');
$btnLoginResendEmail = document.getElementById('btn-login-resend-email');

document.getElementById('loginid').focus();

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
            $errorLogin.textContent = 'Please check your email for confirmation link before logging in';
            $errorLogin.style.color = 'red';
            $loginResendEmail.textContent = "If you didn't receive the confirmation email, please click on the 'Resend Email' button"
            $btnLoginResendEmail.style.display = 'block';
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

$btnLoginResendEmail.addEventListener('click', async (e) => {
    e.preventDefault();
    const loginid = document.getElementById('login').elements['loginid'].value
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
    
    // setTimeout(() => {window.location.href = '/'}, 2000)
})

document.getElementById('btn-close-login').addEventListener('click', (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/';
})

document.addEventListener('touchmove', (e) => {
// To prevent the form from reloading on swipe motion on the screen
    e.preventDefault();
}, {passive: false});
