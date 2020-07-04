# aaliya-art

FOR PRODUCTION -
1. Create a file /etc/profile.d/custom.sh
2. Add the following to this file -
    #!/bin/bash
    export AALIYAPORTHTTP=80
    export AALIYAPORTHTTPS=443
    export AALIYAHOST='aaliya-gallery'
    export SENDGRIDAPIKEY='apikey'
    export AWSKEY=''
    export AWSSECRET=''
    export AWSREGION='us-west-2'
    export AWSBUCKET='aaliya-gallery'

3. Install mongodb and mongodb backup as per the instructions

TO INSTALL LETSENCRYPT
1. First install EPEL repo
2. yum install certbot

TO RENEW LETSENCRYPT
1. certbot certonly --server https://acme-v02.api.letsencrypt.org/directory --manual --preferred-challenges dns -d 'cmeitest.com' OR certbot certonly --server https://acme-v02.api.letsencrypt.org/directory --manual --preferred-challenges dns -d 'aaliya-gallery.com'
2. Say yes to logging in the IP address



TO RUN THE APPLICATION -
1. Log-in as root
2. nohup /home/ec2-user/mongodb/bin/mongod --dbpath=/home/ec2-user/mongodb-data --bind_ip_all &
3. Go to aaliya-art directory
4. nohup node src/index.js &
5. To find out the processes -
6. netstat -tulpen | grep mongo
7. netstat -tulpen | grep node


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
CHECK FOR RESPONSIVENESS
1. The site needs to be tested on desktop, laptop, iPad, iPhone and Android phone to make sure forms responsiveness is working good


TO MOVE A NEW VERSION TO PRODUCTION
1. Make a backup of the db
2. mongodump --archive="<date>-backup" --db="aaliya-art-api"
3. Delete node-modules and run npm install to install any new packages
3. Run user.js to find out how many images garfield3 has
4. Delete all likes by garfield3
5. Delete user garfield3. Now this can be used in testing
6. Create a new git tag with the version information

BRANCHES & TAGS

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
    
UPLOAD-IMAGE BRANCH
1. Right now just creating a form to upload one file and save it as test.txt
2. Reformatting all form pages to be able to work on mobile 
3. Recreating a new form structure


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

V1.4
1. Branch - images
2. Date - 03/21/2020
3. Features    
	1. Add 3 more images by aaliya1 to AWS S3
	2. Change the images.js script in admin directory to upload information about the 3 images
    
V1.5
1. Branch - upload-image
2. Date - 05/07/2020
3. Features
	1. Created a new structure for all the forms to make them scrollable on mobile devices
	2. Added a background pix to all the forms
	3. Made the message icon a little bigger so easier to click
	4. There is upload file as part of this version, but hasnt been tested 
	5. Register button added to the home page 
    
V1.6
1. Branch - store-image
2. Date - 05/24/20
3. Features
    1. Added a banner to all the pages which linke back to the home page
    2. The images on home page and forms now scroll under the banner, so it always stays in place
    3. When resubmitting on login page after an error, the previous error message disappears
    4. Instead of name, ask for separate firstname and lastname for browser, artist and teacher
    5. The login is via email and not loginid anymore
    6. Homepage displays first name instead of loginid
    7. Added a pre-load script to upload page to check if there is a valid logged in user and is an artist
    8. Using email instead of loginid when resending activation email
    9. Added title and height to the images model
    10. displayname and height will have to be deleted as part of the 2nd part of the commit
    11. Cleaned up error display on register pages, but still not very clean and problems on firefox

V1.7
1. Branch - password-reset
2. Date - 06/04/20
3. Features
	1. Added a new route for users, so the user who wants to change the password is sent an email
	2. Added a Forgot Password link in login.html
	3. Create a form and an end-point to reset the password
	4. Corrected a small text error in register-browser.js
	5. Added a field passwordhashcode in user model and also a function to initialize the hash
	6. Deleted length field from image model


WHAT FIELDS ARE NEEDED FOR THE IMAGE COLLECTION
1. Image title(internal)
2. Image title(displayed)
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
5. Parents Permission
7. Number of paintings uploaded
9. Index of the last file uploaded
10. AWS BucketName


TO DO
1. Cleanup all unnecessary console.logs
2. Stats alignment is a bit messed up
3. the loginids need to be of correct format to align with bucket names. It's not the bucket name, but the object name
    1. Just limit it to alpha-numeric less than 64 characters
4. The email and the key should not be hard-coded
5. at createddatetime filed to both colections
6. Figure out how not to reload images
7. When the page refershes with a user, check if the auth-token matches what's in the system, if not then check them out. Probably have to do the same thing when doing likes
8. The painting information should also have the canvas size
9. On every screen the button needs to be disabled when they cannot be pressed again
10. Correct any cookie conflict, on the home page check for a valid cookie, expire cookies after 24 hours, change user end point
11. The db backups to be uploaded to S3


1 Create a form so artists can upload their images to S3
2. For the names the first letter needs to be capitalized
3 They should be able to upload upto 5 images, no more than 200kb each
4 They should also be able to delete any image they want
5.Problem with email sent through sendgrid
6.Need to log all the actions so can be debugeed i.e when the emails are sent
7. Need to create a mail server
9. The onblur still doesnt work on firefox. That needs to be fixed
10. The error display on register pages is still a mess. That also needs to be fixed.
11. Maybe have to change the formatting of the old images
12. How to create thumbnails of uploaded images
13. The price and sold/not sold needs to be added to the front of the image
14. How to show progress bar when images are being uploaded
15.  Work on onblur and onfocus on firefox
16. The background image is different on test and prod


DOMAIN-EMAIL
WHAT ALL NEED TO DO
1. Set up a domain email instead of gmail from which to send emails from
4. Create prod and test buckets for all the images
5. Renew the certbot certificate for both aaliya-gallery and cmeitest.com
6. Autofocus error in register-artist on 2 fields
7. Website Title


STEPS
1. Installed new packages
2. Created WorkMail setup on AWS
3. Created SMTP user in AWS
4. Add STMP creds and the send email address to custom.sh file
5. export AWSBUCKET='aaliya-gallery-test'
   export AWSSMTPHOST=''
   export AWSSMTPUSER=''
   export AWSSMTPPASS=''
   export SENDEMAIL=''
4. Have created functions for sending email through node.js with using both STMP or SES in the admin directory
5. Created a new bucket aaliya-gallery-test. Need to have the common folder and he bg file and CORS policy
6. On test machines change AWSBUKCET = this new bucket
7. Delete all images from collection and reupload images for cmeitest to test the new bucket is working
8. Corrected a bug in app.js when confirm code was 0

UPLOAD-FORMS
WHAT ALL NEED TO DO
1. Create a form to upload images


STEPS
1. Create a new html page and based on the user login show all the images the user has already uploaded

