const preupload = async () => {
//Check based on the cokkie if any if the user is an artist.
// If yes contine renderign the page
// If not go back to the home page
    const user = await getUserInfo();
    
    if (!user || !user.user.artist) {
    //If not an artist go back to the home page
        window.location.href = '/';
    }
}

preupload();