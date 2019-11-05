document.forms['login'].addEventListener('submit', async (event) => {
// When the login form is successfully submitted, render the header of the home page with the correct 
// template. If unsuccessful then give an alert with a message to try again
    event.preventDefault();

    try {
        const response = await fetch(event.target.action, {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target)) // event.target is the form
        })

        let username = await response.json()  
        username = username.user.username
        window.location.href = `/?username=${username}`;
    } catch (e) {
        alert('Error logging in. Please try again')
    }
});