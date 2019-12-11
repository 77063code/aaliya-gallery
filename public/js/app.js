// Elements
const $thumbsupclassname = document.getElementsByClassName('fa-thumbs-up');
const $informationclassname = document.getElementsByClassName('fa-info');
const $imgbackclose = document.getElementsByClassName('img__back--close');
const $likesclassname = document.getElementsByClassName('total-likes');
const $messageclass = document.getElementsByClassName('fa-envelope')


Array.from($thumbsupclassname).forEach((element) => {
// Create a separate click event for all the thumbs-up icons
// All the authenticated users can give a thumbs up to a painting, but only once
    element.addEventListener('click', async () => {
    //const img = element.parentElement.parentElement.previousSibling.previousSibling.classList[1];
    const img = element.parentElement.parentElement.parentElement.childNodes[1].classList[1];
   
   
    const response = await fetch('/like/' + img)
    
    if (response.status === 401) {              element.parentElement.parentElement.nextElementSibling.textContent = 'Please authenticate before using this feature'
    } else if (response.status === 360) {        element.parentElement.parentElement.nextElementSibling.textContent = 'You have already given a thumbs up to this image';
    }
    else  {
        let like = await response.json()
        element.nextSibling.nextSibling.textContent = like.likes;  
    }
    })   
});

/*Array.from($informationclassname).forEach((element) => {
// Create a separate click event for all the information icons
// When clicking on the information icons the back of the image which has all the image information will be displayed
    element.addEventListener('click',  () => {
    
    const img = element.parentElement.parentElement.childNodes[1].classList[1]; 
    
    document.getElementById(element.parentElement.parentElement.childNodes[1].id).style.transform = "rotateY(180deg)"; /* Rotate the front side 180deg so its not visible */
   /* document.getElementById(element.parentElement.parentElement.childNodes[3].id).style.transform = "rotateY(0)"; /* Rotate the back side to 0deg so it's visible */
   /* })   
});*/

document.getElementById('btn1').addEventListener('click', () => {
    const element = document.getElementById('btn1')
    const img = element.parentElement.parentElement.childNodes[1].classList[1]; 
    console.log(img);
    document.getElementById(element.parentElement.parentElement.childNodes[1].id).style.transform = "rotateY(180deg)";
    document.getElementById(element.parentElement.parentElement.childNodes[3].id).style.transform = "rotateY(0)";
    
})

Array.from($imgbackclose).forEach((element) => {
// Create a separate click event for all back pages of the images
// When clicking close of the back page, it should revert back to the image
    element.addEventListener('click',  () => {
    document.getElementById(element.parentElement.parentElement.parentElement.childNodes[1].id).style.transform = "rotateY(0)"; /* Rotate the front side to 0deg so it's visible */
    document.getElementById(element.parentElement.parentElement.parentElement.childNodes[3].id).style.transform = "rotateY(180deg)"; /* Rotate the back side 180deg so its not visible */
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

        location.href = '/' ; 
    } catch (e) {
        alert('Error logging in. Please try again')
    }
});

// When the home page is loaded initialize all the likes querying from the database
Array.from($likesclassname).forEach( async (element) => {
    //const img = element.parentElement.parentElement.previousSibling.previousSibling.classList[1];
    const img = element.parentElement.parentElement.parentElement.childNodes[1].classList[1];
    
    const response = await fetch('/likes/' + img)
    
    const likes = await response.json();
   
    element.textContent = likes.likes;
    
})
    
const loginByHashCode = async (hashcode) => {
    try {
        const response = await fetch('/users/confirm/' + hashcode)  
        let username = await response.json()  
        username = username.user.username
        window.location.href = `/?username=${username}`; // If a user is found based on creds, pass the username to the home page
    } catch (e) {
        alert('The email link not working')
    }
}


const {code} = Qs.parse(location.search, { ignoreQueryPrefix: true });
// This is he user confirming the creation of the account
 if (code) {     
    loginByHashCode(code);
}

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






