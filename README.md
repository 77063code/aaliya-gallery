# aaliya-art

FOR PRODUCTION -

1. Create a file /etc/profile.d/custom.sh
2. Add the following to this file -
    #!/bin/bash
    export AALIYAPORTHTTP=80
    export AALIYAPORTHTTPS=443
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
1. Auto renew of certbot
1. Tighten security on EC2
1. at createddatetime filed to both colections
2. Figure out how not to reload images
4. When filling out forms on the phone the keyboard hides the field being filled
6. When the page refershes with a user, check if the auth-token matches what's in the system, if not then check them out. Probably have to do the same thing when doing likes


TO DO BIG
1. Finalize the process for taking photos, editing and displaying images
2. Correct any cookie conflict, on the home page check for a valid cookie, expire cookies after 24 hours, change user end point


TO INSTALL LETSENCRYPT
1. First install EPEL repo
2. yum install certbot

MSC - 
1. When saw user interacting, the username confused them, so have to change that field to login id everywhere





