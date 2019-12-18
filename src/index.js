const fs = require('fs');
const https = require('https');
const express = require('express');
require('./db/mongoose'); // This will make sure that the entire file runs
const userRouter = require('./routers/user');
const likesRouter = require('./routers/likes');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.AALIYAPORT || 3000 // AALIYAPORT is defined in /etc/profile.d/custom.sh



app.use(express.static('public', {dotfiles: 'allow'})); // The dotfiles optiion is to allow lets encrypt challenge to go through
app.use(express.json()); // This one line parses incoming data into a JSON object
app.use(express.urlencoded({extended: false }));
app.use(cookieParser());
app.use(userRouter);
app.use(likesRouter);

/* Commenting this out, as a different method with letsencrypt
app.listen(port, () => {
	console.log('Express server is running');
});
*/

https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/aaliya-gallery.com/privkey1.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/aaliya-gallery.com/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/aaliya-gallery.com/chain1.pem'),
}, app).listen(443, () => {
  console.log('Listening...')
})



