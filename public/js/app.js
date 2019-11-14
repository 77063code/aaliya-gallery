// Elements
const $classname = document.getElementsByClassName('fa-thumbs-up');
const $likesclassname = document.getElementsByClassName('total-likes');

Array.from($classname).forEach((element) => {
// All the authenticated users can give a thumbs up to a painting, but only once
    element.addEventListener('click', async () => {
    const img = element.parentElement.parentElement.previousSibling.previousSibling.classList[1];        
    const response = await fetch('/like/' + img)
    console.log(response)
    if (response.status === 401) {
        alert('Please authetnticate before using this feature')
    } else if (response.status === 208) {
        alert('You have already given a thumbs up to this image')
    }
    else  {
        let like = await response.json()
        element.nextSibling.nextSibling.textContent = like.likes;  
    }
    })   
});

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

// When the home page is loaded initialize all the likes querying from the database
Array.from($likesclassname).forEach( async (element) => {
    const img = element.parentElement.parentElement.previousSibling.previousSibling.classList[1];
    const response = await fetch('/likes/' + img)
    const likes = await response.json();
    element.textContent = likes.likes;
    
})

const {username} = Qs.parse(location.search, { ignoreQueryPrefix: true });
if (username) {
// logged in user
    document.getElementById('username').textContent = username;
    document.getElementById('logout-btn').style.display = "block"; // display the logout button
    document.getElementById('login-label').style.display = "none"; // Once logged in hide te log in button
    
} else {
    // Delete any existing cookies
    document.cookie = 'auth_token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}




