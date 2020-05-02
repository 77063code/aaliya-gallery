// ELEMENTS

$emailConfirm = document.getElementById('email-confirm');
$emailConfirmResend = document.getElementById('email-confirm-resend');

document.getElementById('register-artist-form').style.display = 'none';
document.getElementById('register-artist-complete-page').style.display = 'block';
$emailConfirm.textContent = 'Before your account can be activated, please click on the link in your email'
$emailConfirmResend.textContent = "If you don't receive the activation email, please click on the 'Resend Email' button"



const emailArtistPostFocus = async() => {
    const errMessages = document.getElementsByClassName('forms-error-msg');
    const errMsg = document.getElementById('forms-error-email-artist');
    const email = document.getElementById('email-artist').value;


    for (var i = 0; i < errMessages.length; i++) {
        errMessages.item(i).style.display = "none";
        errMessages.item(i).textContent = '';
    }

    if (email) {
        if (!emailIsValid(email)) {
            errMsg.style.display = "block";
            errMsg.textContent = 'Please enter a valid email';
            document.getElementById('email-artist').focus();
        } else {
            try {
                const response = await fetch('/users/info/email/' + email)
                if (response.status !== 200) {
                    for (var i = 0; i < errMessages.length; i++) {
                        errMessages.item(i).style.display = "none";
                        errMessages.item(i).textContent = '';
                    }
                    document.getElementById('loginid-artist').focus();
                } else {
                    errMsg.style.display = "block";
                    errMsg.textContent = 'This email is already being used. Please enter a different email';
                    document.getElementById('email-artist').focus();
                }
            } catch {
                for (var i = 0; i < errMessages.length; i++) {
                    errMessages.item(i).style.display = "none";
                    errMessages.item(i).textContent = '';
                }

            }
        }
    }
}

const loginidArtistPostFocus = async() => {
    const errMessages = document.getElementsByClassName('forms-error-msg');
    const errMsg = document.getElementById('forms-error-loginid-artist');
    const loginid = document.getElementById('loginid-artist').value;


    if (loginid) {
        try {
            const response = await fetch('/users/info/loginid/' + loginid)
            console.log(response.status);
            if (response.status !== 200) {
                for (var i = 0; i < errMessages.length; i++) {
                    errMessages.item(i).style.display = "none";
                    errMessages.item(i).textContent = '';
                }
                document.getElementById('password-artist').focus();
            } else {
                errMsg.style.display = "block";
                errMsg.textContent = 'This loginid is already being used. Please enter a different loginid';
                document.getElementById('loginid-artist').focus();
            }
        } catch {
            for (var i = 0; i < errMessages.length; i++) {
                errMessages.item(i).style.display = "none";
                errMessages.item(i).textContent = '';
            }

        }
    }
}


const passwordArtistPostFocus = () => {
    const errMessages = document.getElementsByClassName('forms-error-msg');
    const errMsg = document.getElementById('forms-error-password-artist');
    const password = document.getElementById('password-artist').value;


    if (password) {
        if (password.length < 7) {
            for (var i = 0; i < errMessages.length; i++) {
                errMessages.item(i).style.display = "none";
                errMessages.item(i).textContent = '';
            }
            errMsg.style.display = "block";
            errMsg.textContent = 'Password needs to be atleast 7 characters';
            document.getElementById('password-artist').focus();
        } else {
            for (var i = 0; i < errMessages.length; i++) {
                errMessages.item(i).style.display = "none";
                errMessages.item(i).textContent = '';
            }
        }
    }
}


const teacheremailArtistPostFocus = async() => {
    const errMessages = document.getElementsByClassName('forms-error-msg');
    const errMsg = document.getElementById('forms-error-teacheremail-artist');
    const teacherEmail = document.getElementById('teacheremail-artist').value;


    for (var i = 0; i < errMessages.length; i++) {
        errMessages.item(i).style.display = "none";
        errMessages.item(i).textContent = '';
    }

    if (teacherEmail) {
        if (!emailIsValid(teacherEmail)) {
            errMsg.style.display = "block";
            errMsg.textContent = "Please enter a valid teacher's email";
            document.getElementById('teacheremail-artist').focus();
        } else {
            for (var i = 0; i < errMessages.length; i++) {
                errMessages.item(i).style.display = "none";
                errMessages.item(i).textContent = '';
            }

        }
    }
}



document.forms['register-artist-form'].addEventListener('submit', async(event) => {
    // When the login form is successfully submitted, render the header of the home page with the correct 
    // template. If unsuccessful then give an alert with a message to try again
    event.preventDefault();

    const errMessages = document.getElementsByClassName('forms-error-msg');
    const name = document.getElementById('name-artist').value;
    const email = document.getElementById('email-artist').value;
    const loginid = document.getElementById('loginid-artist').value;
    const password = document.getElementById('password-artist').value;
    const school = document.getElementById('school-artist').value;
    const teacherName = document.getElementById('teachername-artist').value;
    const teacherEmail = document.getElementById('teacheremail-artist').value;

    for (var i = 0; i < errMessages.length; i++) {
        // Clear all the error messages
        errMessages.item(i).style.display = "none";
        errMessages.item(i).textContent = '';
    }

    if (!name) {
        document.getElementById('forms-error-name-artist').style.display = "block";
        document.getElementById('forms-error-name-artist').textContent = "Please enter your name";
        document.getElementById('name-artist').focus();
        //document.getElementById('name-artist').scrollIntoView(); 
    } else if (!email) {
        document.getElementById('forms-error-email-artist').style.display = "block";
        document.getElementById('forms-error-email-artist').textContent = "Please enter your email";
        document.getElementById('email-artist').focus();
    } else if (!loginid) {
        document.getElementById('forms-error-loginid-artist').style.display = "block";
        document.getElementById('forms-error-loginid-artist').textContent = "Please enter your loginid";
        document.getElementById('loginid-artist').focus();
    } else if (!password) {
        document.getElementById('forms-error-password-artist').style.display = "block";
        document.getElementById('forms-error-password-artist').textContent = "Please enter a password";
        document.getElementById('password-artist').focus();
    } else if (!school) {
        document.getElementById('forms-error-school-artist').style.display = "block";
        document.getElementById('forms-error-school-artist').textContent = "Please enter your school's name";
        document.getElementById('school-artist').focus();
    } else if (!teacherName) {
        document.getElementById('forms-error-teachername-artist').style.display = "block";
        document.getElementById('forms-error-teachername-artist').textContent = "Please enter your teacher's name";
        document.getElementById('teachername-artist').focus();

    } else if (!teacherEmail) {
        document.getElementById('forms-error-teacheremail-artist').style.display = "block";
        document.getElementById('forms-error-teacheremail-artist').textContent = "Please enter your teacher's name";
        document.getElementById('teacheremail-artist').focus();

    } else if (!emailIsValid(teacherEmail)) {
        document.getElementById('forms-error-teacheremail-artist').style.display = "block";
        document.getElementById('forms-error-teacheremail-artist').textContent = "Please enter a valid teacher's email";
        document.getElementById('teacheremail-artist').focus();
    } else {

        try {
            const response = await fetch(event.target.action, {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target)) // event.target is the form

            })
            console.log(response);
            console.log(response.status);
            if (response.status === 352) {
                displayArtistFirstPage();
                $errorEmail.textContent = 'This email is already being used. Please enter a different email';
                document.getElementById('email-artist-mobile').focus();
            } else if (response.status === 351) {
                displayArtistSecondPage();
                $errorLoginid.textContent = 'This loginid is already taken. Please enter a different loginid';
                document.getElementById('loginid-artist-mobile').focus();
            } else {
                document.getElementById('register-artist-form').style.display = 'none';
                document.getElementById('register-artist-complete-page').style.display = 'block';
                $emailConfirm.textContent = 'Before your account can be activated, please click on the link in your email'
                $emailConfirmResend.textContent = "If you don't receive the activation email, please click on the 'Resend Email' button"
            }
        } catch (e) {
            console.log('Error registering. Please try again');
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
    $emailConfirm.textContent = '';
    document.getElementById('register-artist-complete-page').style.height = "14rem";
    try {
        const response = await fetch('/users/resend/email', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

    if (response.status === 200) {
        $emailConfirmResend.textContent = 'Activation email resent. Please check your email including the spam folder';
        }
    else {
        $emailConfirmResend.textContent = 'Error sending activation email. Please send us a message';
        }
    }
    catch (e) {
        $emailConfirmResend.textContent = 'Error sending activation email. Please send us a message';
    }
})


/*
document.addEventListener('touchmove', (e) => {
// To prevent the form from reloading on swipe motion on the screen
    e.preventDefault();
}, {passive: false});
*/
