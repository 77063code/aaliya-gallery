const fs = require('fs');
const https = require('https');
const http = require('http');
const express = require('express');
require('./db/mongoose'); // This will make sure that the entire file runs
const userRouter = require('./routers/user');
const likesRouter = require('./routers/likes');
const cookieParser = require('cookie-parser');


const app = express();
const httpApp = express();
const portHTTP = process.env.AALIYAPORTHTTP || 3000 // AALIYAPORTHTTP is defined in /etc/profile.d/custom.sh
const portHTTPS = process.env.AALIYAPORTHTTPS || 3000 // AALIYAPORTHTTPS is defined in /etc/profile.d/custom.sh



app.use(express.static('public', {dotfiles: 'allow'})); // The dotfiles optiion is to allow lets encrypt challenge to go through
app.use(express.json()); // This one line parses incoming data into a JSON object
app.use(express.urlencoded({extended: false }));
app.use(cookieParser());

if (portHTTP !== 3000) {
    httpApp.use((req,res) => {
            res.redirect('https://' + req.headers.host + req.url);
    });
}
app.use(userRouter);
app.use(likesRouter);

if (portHTTP !== 3000) {
    http.createServer(httpApp).listen(portHTTP);
    https.createServer({
      key: fs.readFileSync('/etc/letsencrypt/live/aaliya-gallery.com/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/aaliya-gallery.com/cert.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/live/aaliya-gallery.com/chain.pem'),
    }, app).listen(portHTTPS, () => {
      console.log('Listening...')
    })
} else {
    app.listen(portHTTP, () => {
            console.log('Express server is running');
    });
}






