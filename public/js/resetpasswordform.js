const loginByHashCode = async(hashcode) => {
    try {
        const response = await fetch('/users/confirm/' + hashcode)
        if (response.status === 400) {
            console.log('The email link not working')
        }
        window.location.href = '/';
    } catch (e) {
        alert('The email link not working')
    }
}


const {
    code
} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

console.log(sode);

if (code) {
//If the code is correct the user can reset the password
    //loginByHashCode(code);
    alert(code);
}
