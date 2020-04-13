// Check if the calling device has a touch screen
// Use that as a proxy to find out if the device will have a virtual keyboard
let hasTouchScreen = false;
if ("maxTouchPoints" in navigator) { 
    hasTouchScreen = navigator.maxTouchPoints > 0;
} else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0; 
} else {
    var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
    } else if ('orientation' in window) {
        hasTouchScreen = true; // deprecated, but good fallback
    } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen = (
            /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
            /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
        );
    }
}

document.getElementById('artist-account').addEventListener("click", () => {
    if (hasTouchScreen) {
        window.location.href='/register-artist-mobile.html'
    }
    else {
        window.location.href='/register-artist.html'
    }
})
document.getElementById('browser-account').addEventListener("click", () => {
    if (hasTouchScreen) {
        window.location.href='/register-browser-mobile.html'
    }
    else {
        window.location.href='/register-browser.html'
    }
})



document.getElementById('btn-close-login').addEventListener('click', (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/';
})

