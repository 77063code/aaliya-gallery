// ELEMENT
$errorMessage = document.getElementById('error-message');
$messageName = document.getElementById('messageName');
$messageEmail = document.getElementById('messageEmail');
$messageMessage = document.getElementById('messageMessage');


const getUserInfo = async () => {
// get user info based on the cookie stored
    try {
        const response = await fetch('/users/info/')
        const user = await response.json();
        return user;
    } catch {
        return undefined;
    }    
}
     
        
const initializeForm = async () => {
// If user is logged in, then add that information to form so the user doest have to type it again
    const user = await getUserInfo();
    if (user.user) {
        $messageName.value = user.user.name;
        $messageEmail.value = user.user.email
        $messageMessage.focus();
    }
    else {
        $messageName.focus();
    }
}

initializeForm();

document.forms['message'].addEventListener('submit', async (event) => {
// user can send a message to the administrator of the site
    event.preventDefault();
    
    try {
        const response = await fetch(event.target.action, {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target)) // event.target is the form
        })
        if (response.status === 350) {
            $errorMessage.textContent = 'Please enter your name';
            $messageName.focus();
        } else if (response.status === 351) {
            $errorMessage.textContent = 'Please enter an email';
            $messageEmail.focus();
        } else if (response.status === 352) {
            $errorMessage.textContent = 'Please enter a valid email';
            $messageEmail.focus();
        } else if (response.status === 353) {
            $errorMessage.textContent = 'Please enter a message';
            $messageMessage.focus();
        } else {
            $errorMessage.textContent = 'Your message was sent successfully';
            $errorMessage.style.color = 'green';
            const user = await getUserInfo();
            //user.user ? (window.location.href = '/?loginid=' + user.user.loginid) : (window.location.href = '/')
            setTimeout(() => {window.location.href = '/'}, 1000)
        }       
        
    } catch (e) {
        $errorMessage.textContent = 'Error sending the message. Please try again';
        // alert('Error logging in. Please try again')
    }
});



document.getElementById('btn-close-message').addEventListener('click', async (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    /*const user = await getUserInfo();
    user.user ? (window.location.href = '/?loginid=' + user.user.loginid) : (window.location.href = '/')*/
    window.location.href = '/' // redirect to home page and based on cookie it will figure out what to do
})

document.addEventListener('touchmove', (e) => {
// To prevent the form from reloading on swipe motion on the screen
    e.preventDefault();
}, {passive: false});
