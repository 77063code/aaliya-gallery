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
3. Run user.js to find out how many images garfield3 has
4. Delete all likes by garfield3
5. Delete user garfield3. Now this can be used in testing
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


WHAT FIELDS ARE NEEDED FOR THE IMAGE COLLECTION
1. Image name(internal)
2. Image name(displayed)
2. Year painted
3. Artist Loginid
4. Sale Price
5. Type of painting - i.e. canvas
6. Painting Length
7. Painting width
8. Orientation
7. Formatted image
8. Unformatted image
9. Grade when paiting was done
10. Already Sold - Y/N

WHAT FIELDS ARE NEEDED FOR ARTIST COLLECTION
1. Artist Name
2. School when paiting was done
3. Grade when painting was done
4. Email
5. Parents Permission
6. Art Teacher/Class Teacher's Name and Email

FEATURES BRANCH
1. How to access image files directly from S3 and not on the server
    1. Get Rid of the class name from the images and change the functions in app.js to reference the ids 
    2. Changes the ids to the actual image name i.e with jpg or png or whatever extension
    3. This change will have to made at the same time as step 2 - Update the likes database to add the same extension to the image name
    4. Create the image collection. The image names will have to be updated from aaliya to aaliya1
    5. The same change will have to be made in the likes db and the index.html file
    6. Delete the unwanted files from img folder and rename the others as per the new naming convention
    7. Upload the images to S3 with the new names and change the src in index to reference the S3 files
    8. Now test and this is the next verson that should be released to production
    

    

CLEANUP BRANCH
3. The old error messages to disappear when trying to correct the error
5. All usernames to be converted to lowercase
6. Cleanup all unnecessary console.logs
7. Stats alignment is a bit messed up
8. The message button needs to me made bigger
9. There should be a register button on the home page


UPLOAD BRANCH
1 Create a form so artists can upload their images to S3
2 The artist sub-folder is created when they register
3 They should be able to upload upto 5 images, no more than 200kb each
4 They should also be able to delete any image they want
STEPS
1. First rerun the admin/images.js to make sure the most recent data is uploaded



RELEASES
V1.3
1. Date - 02/11/2020
2. Features
    1. Recreate images collection - Change loginid field to artistid and add other fields
    2. The end point should return an array of objects with all the information that needs to be displayed
    3. Use Mustache templating system to render the home page, retrieving the information from the 
    database
    4. A message shown when the user likes an image for the first time
    5. To be able to src even the bg image from AWS
    6. Delete index2, index3 and style2 and style3
    7. Delete img subfolder in the public folder
    



