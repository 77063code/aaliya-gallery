document.forms['login'].addEventListener('submit', async (event) => {
// When the login form is successfully submitted, render the header of the home page with the correct 
// template. If unsuccessful then give an alert with a message to try again
    event.preventDefault();

    const response = await fetch(event.target.action, {
            method: 'POST',
            body: new URLSearchParams(new FormData(event.target)) // event.target is the form
    })
    
    const response2 = await response.json();
    
    console.log(response2);
    console.log(response2.user.username)
      
    
    const loginTemplate = document.querySelector('#login-template').innerHTML;
        
        const html = Mustache.render(loginTemplate, {});
        document.querySelector('#logging').innerHTML = html;
        window.location.href = "/";
});