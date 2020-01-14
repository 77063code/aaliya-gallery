// Elements
const $thumbsupclassname = document.getElementsByClassName('btn-thumbs-up');
const $informationclassname = document.getElementsByClassName('btn-info');
const $imgbackclose = document.getElementsByClassName('img__back--close');
const $likesclassname = document.getElementsByClassName('total-likes');
const $messageclass = document.getElementsByClassName('fa-envelope')
const $closeinformationclassname = document.getElementsByClassName('btn-close-information');

Array.from($thumbsupclassname).forEach((element) => {
// Create a separate click event for all the thumbs-up icons
// All the authenticated users can give a thumbs up to a painting, but only once
    element.addEventListener('click', async () => {
        //const img = element.parentElement.parentElement.previousSibling.previousSibling.classList[1];
        //const img = element.parentElement.parentElement.parentElement.childNodes[1].classList[1];
        const img = element.parentElement.parentElement.parentElement.children[0].classList[1];   

        const response = await fetch('/like/' + img);    
        if (response.status === 401) {              
            element.parentElement.parentElement.nextElementSibling.textContent = 'Please login before using this feature'
        } else if (response.status === 360) {        
            element.parentElement.parentElement.nextElementSibling.textContent = 'You can only click once per image';
        }
        else  {
            const like = await response.json()
            element.nextElementSibling.textContent = like.likes;  
        }
    })   
});

Array.from($informationclassname).forEach((element) => {
// Create a separate click event for all the information icons
// When clicking on the information icons the back of the image which has all the image information will be displayed
    element.addEventListener('click',  () => { 
        document.getElementById(element.parentElement.parentElement.children[0].id).style.transform = "rotateY(180deg)"; // Rotate the front side 180deg so its not visible */
        document.getElementById(element.parentElement.parentElement.children[1].id).style.transform = "rotateY(0)"; // Rotate the back side to 0deg so it's visible */
   })   
});



Array.from($closeinformationclassname).forEach((element) => {
// Create a separate click event for all back pages of the images
// When clicking close of the back page, it should revert back to the image
    element.addEventListener('click',  () => {
        document.getElementById(element.parentElement.parentElement.parentElement.children[0].id).style.transform = "rotateY(0)"; // Rotate the front side to 0deg so it's visible
        document.getElementById(element.parentElement.parentElement.parentElement.children[1].id).style.transform = "rotateY(180deg)"; // Rotate the back side 180deg so its not visible 
    })   
});


document.forms['logout'].addEventListener('submit', async (event) => {
// When logging out, delete the cookie from the current session and the database
    event.preventDefault();
    try {
        const response = await fetch(event.target.action, {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target)) // event.target is the form
        })
        document.cookie = 'auth_token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'; // Expire the cookie from the browser
        location.href = '/' ; 
    } catch (e) {
        alert('Error logging out. Please try again')
    }
});

// When the home page is loaded initialize all the likes querying from the database
Array.from($likesclassname).forEach( async (element) => {
    const img = element.parentElement.parentElement.parentElement.children[0].classList[1];    
    const response = await fetch('/likes/' + img)  
    const likes = await response.json();   
    element.textContent = likes.likes;
    
})
    
/*const loginByHashCode = async (hashcode) => {
    try {
        const response = await fetch('/users/confirm/' + hashcode)  
        let loginid = await response.json()  
        loginid = loginid.user.loginid
        window.location.href = `/?loginid=${loginid}`; // If a user is found based on creds, pass the loginid to the home page
    } catch (e) {
        alert('The email link not working')
    }
}*/

const loginByHashCode = async (hashcode) => {
    try {
        const response = await fetch('/users/confirm/' + hashcode)  
        const user = await response.json()  
        if (user) {
            document.getElementById('loginid').textContent = user.loginid;
            document.getElementById('logout-btn').style.display = "block"; // display the logout button
            document.getElementById('login-label').style.display = "none"; // Once logged in hide te log in button    
        }   
    } catch (e) {
        alert('The email link not working')
    }
}


const {code} = Qs.parse(location.search, { ignoreQueryPrefix: true });
// This is the user confirming the creation of the account through the email link
 if (code) { 
    console.log(code);
    loginByHashCode(code);
}

const getUserInfo = async () => {    
    try {
        const response = await fetch('/users/info/')
        const user = await response.json();
        return user; // Note of there was no user found, then the body is returned as an object, but it doesnt have the user property
    } catch {
        console.log('Error in getuserinfo');
        return undefined;
    }    
}
        
const setupHeader = async () => {
    const user = await getUserInfo();
    if (user.user) {
    // If the returned body has a user object
        document.getElementById('loginid').textContent = user.user.loginid;
        document.getElementById('logout-btn').style.display = "block"; // display the logout button
        document.getElementById('login-label').style.display = "none"; // Once logged in hide te log in button    
    }
}
    
setupHeader();
    
//getUserInfo()

/*
const {loginid} = Qs.parse(location.search, { ignoreQueryPrefix: true });
if (loginid) {
// logged in user
    document.getElementById('loginid').textContent = loginid;
    document.getElementById('logout-btn').style.display = "block"; // display the logout button
    document.getElementById('login-label').style.display = "none"; // Once logged in hide te log in button    
} else {
    // Delete any existing cookies
    document.cookie = 'auth_token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}*/






