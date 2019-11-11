// Elements
const $classname = document.getElementsByClassName('fa-thumbs-up');

Array.from($classname).forEach((element) => {
    element.addEventListener('click', async () => {
   /*console.log(element.nextSibling.nextSibling.textContent)
    element.nextSibling.nextSibling.textContent = parseInt(element.nextSibling.nextSibling.textContent) +1;*/
        
    console.log(element.parentElement.parentElement.previousSibling.previousSibling.classList[1]);
        
    const response = await fetch('/likes')
    console.log(response);
    let likes = await response.json()
    console.log(likes)
    
        
    })   
}); /* This is creating an on-click event on all the thumbs up signs and will increase the value when clicked. Right now anyone can do it any number of times. These need to be only for authenticated users and they can only do it once */

document.forms['logout'].addEventListener('submit', async (event) => {
// When the login form is successfully submitted, render the header of the home page with the correct 
// template. If unsuccessful then give an alert with a message to try again
    event.preventDefault();

    try {
        const response = await fetch(event.target.action, {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target)) // event.target is the form
        })

        location.href = '/' ; // If a user is found based on creds, pass the username to the home page
    } catch (e) {
        alert('Error logging in. Please try again')
    }
});

const {username} = Qs.parse(location.search, { ignoreQueryPrefix: true });

if (username) {
// logged in user
    document.getElementById('username').textContent = username;
    document.getElementById('logout-btn').style.display = "block"; // display the logout button
    document.getElementById('login-label').style.display = "none"; // Once logged in hide te log in button
    
}




