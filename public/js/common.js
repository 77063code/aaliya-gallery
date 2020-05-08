// Common Functions for different pages


// Check if an email address is in a valid format
emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Check if a string only contains alpha-numeric values
stringIsAlphaNumeric = (string) => /^[a-zA-Z0-9]*$/.test(string);
