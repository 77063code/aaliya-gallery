# aaliya-art

FOR PRODUCTION -
1. Create a file /etc/profile.d/custom.sh
2. Add the following to this file -
    #!/bin/bash
    export AALIYAPORTHTTP=80
    export AALIYAPORTHTTPS=443
    export AALIYAHOST='aaliya-gallery'
    export SENDGRIDAPIKEY='apikey'
3. Install mongodb and mongodb backup as per the instructions


TO RUN THE APPLICATION -
1. Log-in as root
2. nohup /home/ec2-user/mongodb/bin/mongod --dbpath=/home/ec2-user/mongodb-data --bind_ip_all &
3. Go to aaliya-art directory
4. nohup node src/index.js &
5. To find out the processes -
6. netstat -tulpen | grep mongo
7. netstat -tulpen | grep node


TO MOVE A NEW VERSION TO PRODUCTION
1. Make a backup of the db
2. mongodump --archive="<date>-backup" --db="aaliya-art-api"


TO DO
1. Auto renew of certbot
1. Tighten security on EC2
1. at createddatetime filed to both colections
2. Figure out how not to reload images
4. When filling out forms on the phone the keyboard hides the field being filled
6. When the page refershes with a user, check if the auth-token matches what's in the system, if not then check them out. Probably have to do the same thing when doing likes
7. On login in page, reset the messages when trying to login again from earlier emaill resent message
8. Give a mesage when a user votes for the 1st time
9. The painting information should also have the canvas size
10. On every screen the button needs to be disabled when they cannot be pressed again
11. On the home header need to have a register button as well


TO DO BIG
2. Correct any cookie conflict, on the home page check for a valid cookie, expire cookies after 24 hours, change user end point
3. On any of the forms, when you get an error, the error should disappear when ncorrecting the mistake

TESTING STEPS
EXISTING USERS
1. Can an existing user login successfully
2. Is the correct error message shown when incorrect login information is entered
3. Is redirection proper when the close button is clicked on the login screen?
2. Do error messages dissapear when correcting them
2. After login, can the user click on thumbs-up and get the correct message
3. When the user clicks on message does the correct information gets pre-populated to the message screen
4. Does the message get sent correctly? and does the redirection happen correctly after the message is sent
4. When clicking closing the login and message screens, does the home page show the correct informaton
NEW USERS
1. When registering, do error messages for all fields work correctly
2. Do error messages disappear when correcting them
3. Does the confirmation email work and display the username correctly
4. When closing the registeraition screen does it render the home page correctly
5. When the email gets sent out does it show the correct website page
NON-REGISTERED USERS
1. When sending message do the user information field get populated correctly and does the message get sent and then does the redirection to home page happen correctly
2. When clicking on thumbs up, does it show the correct error message



TO INSTALL LETSENCRYPT
1. First install EPEL repo
2. yum install certbot

MSC - 
1. When saw user interacting, the username confused them, so have to change that field to login id everywhere





