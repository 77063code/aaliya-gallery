const express = require('express');
require('./db/mongoose'); // This will make sure that the entire file runs
const userRouter = require('./routers/user');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000

app.use(express.static('public'));
app.use(express.json()); // This one line parses incoming data into a JSON object
app.use(express.urlencoded({extended: false }));
app.use(cookieParser());
app.use(userRouter);


const bcrypt = require('bcryptjs');

const x = async () => {    
    const password = await bcrypt.hash('Abc123456',8);
    console.log(password);
}



const y = async () => {
    const passed = await bcrypt.compare('Abc123456','$2a$08$FsjJFCsG/ZpjvSr.65aB6Oird738DNd9C7KUFo4AAMUGaYN6Tjgpy')
    console.log(passed);
}



app.listen(port, () => {
	console.log('Express server is running');
});




