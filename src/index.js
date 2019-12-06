const express = require('express');
require('./db/mongoose'); // This will make sure that the entire file runs
const userRouter = require('./routers/user');
const likesRouter = require('./routers/likes');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.AALIYAPORT || 3000 // AALIYAPORT is defined in /etc/profile.d/custom.sh



app.use(express.static('public'));
app.use(express.json()); // This one line parses incoming data into a JSON object
app.use(express.urlencoded({extended: false }));
app.use(cookieParser());
app.use(userRouter);
app.use(likesRouter);

app.listen(port, () => {
	console.log('Express server is running');
});






