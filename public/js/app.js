// Elements
const $classname = document.getElementsByClassName('fa-thumbs-up');

const loginTemplate = document.getElementById('#login-template').innerHTML;
const logoutTemplate = document.getElementById('#logout-template').innerHTML;

Array.from($classname).forEach((element) => {
    element.addEventListener('click', () => {
    console.log(element.nextSibling.nextSibling.textContent)
    element.nextSibling.nextSibling.textContent = parseInt(element.nextSibling.nextSibling.textContent) +1;
    })   
}); /* This is creating an on-click event on all the thumbs up signs and will increase the value when clicked. Right now anyone can do it any number of times. These need to be only for authenticated users and they can only do it once */

const html = Mustache.render(logoutTemplate, {});
document.querySelector('#logging').innerHTML = html;


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
      
    
    const loginTemplate = document.getElementById('#login-template').innerHTML;
        
        const html = Mustache.render(loginTemplate, {});
        document.getElementById('#logging').innerHTML = html;
        window.location.href = "/";
});

