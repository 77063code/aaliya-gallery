// Common Functions for different pages


// Check if an email address is in a valid format
const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Check if a string only contains alpha-numeric values
const stringIsAlphaNumeric = (string) => /^[a-zA-Z0-9]*$/.test(string);

// Return the extension of a file
const fileExtension = (file) => {
    const a = file.split(".");
    if ( a.length === 1 || ( a[0] === "" && a.length === 2)) {
        return "";
    }
    return a.pop();
}
