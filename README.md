# aaliya-art

FOR PRODUCTION -

1. Create a file /etc/profile.d/custom.sh
2. Add the following to this file -
    #!/bin/bash
    export AALIYAPORT=80
    export AALIYAHOST='aaliya-gallery'
3. Login as root to run the src/index.js. This is needed to open port 80

TO RUN THE APPLICATION -
1. Log-in as root
2. nohup /home/ec2-user/mongodb/bin/mongod --dbpath=/home/ec2-user/mongodb-data --bind_ip_all &
3. Go to aaliya-art directory
4. nohup node src/index.js &
5. To find out the processes -
6. netstat -tulpen | grep mongo
7. netstat -tulpen | grep node


TO DO
1. Tighten security on EC2
2. Figure out how not to reload images
3. The icon clicking not working on my phone and old ipad
4. When filling out forms on the phone the keyboard hides the field being filled
6. When the page refershes with a user, check if the auth-token matches what's in the system, if not then check them out. Probably have to do the same thing when doing likes
7. The form error should be under that field
8. If the user is logged-in pre-populate the name and email fields
9. In registeriation form give them an option to be sent an email whn new paintings are posted
10. The like error messages are not working with every size

MSC - 
1. When saw user interacting, the username confused them, so have to change that field to login id everywhere


Aaliya's Art Website
1. Installing md5 to create hash values 

1. The create account button should create a new account. If there is an error - duplicate email or username it should give an alert and stay on the same page for the user to correct.

2. If the account is successfully created thengo to home page and render the correct template for the right side of the error - DONE, though not using templates
2a. If the account is created successfully then send an email with a link to be redirected to the proper page. This is to make sure the email provided is legit

3. On the login page, if there is an error, given an error message and let the user correct

4. If successfully logged in, then redirect to the home page - DONE

5. The alert boxes need to be customized

6. If the user logs out the token should be deleted from the db - DONE

7. To upvote, the user has to be authenticated and should have voted on the same painting before - DONE

8. Create a back screen for each painting

9. Create a screen for sending an email message
10. When the users register for the first time, how to confirm the email is legit
11. To be able to authenticate using google, facebook and amazon

2. 
