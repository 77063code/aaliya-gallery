// Elements
const $classname = document.getElementsByClassName('fa-thumbs-up');

const loginTemplate = document.getElementById('login-template').innerHTML;
const logoutTemplate = document.getElementById('logout-template').innerHTML;

Array.from($classname).forEach((element) => {
    element.addEventListener('click', () => {
    console.log(element.nextSibling.nextSibling.textContent)
    element.nextSibling.nextSibling.textContent = parseInt(element.nextSibling.nextSibling.textContent) +1;
    })   
}); /* This is creating an on-click event on all the thumbs up signs and will increase the value when clicked. Right now anyone can do it any number of times. These need to be only for authenticated users and they can only do it once */

const {username} = Qs.parse(location.search, { ignoreQueryPrefix: true });

if (username) {
// logged in user
    const html = Mustache.render(loginTemplate, {username});
    document.querySelector('#logging').innerHTML = html;
} else {
    const html = Mustache.render(logoutTemplate, {});
    document.querySelector('#logging').innerHTML = html;
}




