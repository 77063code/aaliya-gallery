// ELEMENT

$errorRegisterArtist = document.getElementById('error-register-artist');
$emailConfirm = document.getElementById('email-confirm');
$emailConfirmResend = document.getElementById('email-confirm-resend');

document.forms['register-artist-form'].addEventListener('submit', async (event) => {
// When the login form is successfully submitted, render the header of the home page with the correct 
// template. If unsuccessful then give an alert with a message to try again
    event.preventDefault();
    $errorRegisterArtist.textContent = "";
    const name = document.getElementById('name-artist').value;
    const email = document.getElementById('email-artist').value;
    const loginid = document.getElementById('loginid-artist').value;
    const password = document.getElementById('password-artist').value;
    const school = document.getElementById('school-artist').value;
    const grade = document.getElementById('grade-artist').value;
    const teachername = document.getElementById('teachername-artist').value;
    const teacheremail = document.getElementById('teacheremail-artist').value;
    
    if(!name) {
        $errorRegisterArtist.textContent = 'Please enter your name';
        document.getElementById('name-artist').focus();
    }
    else if(!email) {
            $errorRegisterArtist.textContent = 'Please enter your email';
            document.getElementById('email-artist').focus();
    }
    else if(!emailIsValid(email)) {
            $errorRegisterArtist.textContent = 'Please enter a valid email';
            document.getElementById('email-artist').focus();
    }
     else if(!loginid) {
            $errorRegisterArtist.textContent = 'Please enter a loginid';
            document.getElementById('loginid-artist').focus();
    }
     else if(!password) {
            $errorRegisterArtist.textContent = 'Please enter a password';
            document.getElementById('password-artist').focus();
    }
    else if(password.length < 7) {
            $errorRegisterArtist.textContent = 'Password needs to be atleast 7 characters';
            document.getElementById('password-artist').focus();
    }
    else if(!school) {
            $errorRegisterArtist.textContent = 'Please enter your school name';
            document.getElementById('school-artist').focus();
    }
    else if(!grade) {
            $errorRegisterArtist.textContent = 'Please enter your grade';
            document.getElementById('grade-artist').focus();
    }
    else if(!teachername) {
            $errorRegisterArtist.textContent = "Please enter your teacher's name";
            document.getElementById('teachername-artist').focus();
    }
    else if(!teacheremail) {
            $errorRegisterArtist.textContent = "Please enter yor teacher's email"
            document.getElementById('teacheremail-artist').focus();
    }
    else if(!emailIsValid(teacheremail)) {
            $errorRegisterArtist.textContent = "Please enter a valid teacher's email";
            document.getElementById('teacheremail-artist').focus();
    }
    else {
        try {
            //DEBUG
            const e = document.getElementById('grade-artist');
            const str = e.options[e.selectedIndex].value;
            console.log(str);
            //DEBUG
            
            const response = await fetch(event.target.action, {
                    method: 'POST',
                    body: new URLSearchParams(new FormData(event.target)) // event.target is the form

                })            
            console.log(response);
           if(response.status === 352) {
                $errorRegisterArtist.textContent = 'This email is already being used. Please enter a different email';
                document.getElementById('email-artist').focus();
            } 
            else if(response.status === 351) {
                $errorRegisterArtist.textContent = 'This loginid is already taken. Please enter a different loginid';
                document.getElementById('loginid-artist').focus();
            } 
            else {
                $emailConfirm.textContent = 'Before your account can be activated, please click on the link in your email'
                $emailConfirmResend.textContent = "If you don't receive the activation email, please click on the 'Resend Email' button"
                document.getElementById('register-artist').style.display = 'none';
                document.getElementById('resend-email').style.display = 'block';
            }
        }    
        catch (e) {
            $errorRegisterArtist.textContent = 'Error registering. Please try again';
        } 
    } 
});

document.getElementById('btn-close-register-artist').addEventListener('click', (e) => {
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
    const loginid = document.getElementById('register-artist-form').elements['loginid'].value
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



