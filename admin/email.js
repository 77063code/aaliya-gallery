const nodemailer = require('nodemailer');
const smtpPassword = require('aws-smtp-credentials');

const transport = nodemailer.createTransport(
	{
		"host": "email-smtp.us-west-2.amazonaws.com",
		"secureConnection": true,
		"port": 465,
		"auth": {
			"user": "AKIAUQSMLK2MCG3SRAMN",
			"pass": "BEoemBkjY15xXr1Okh66ro3PUgcFagUpTKf6yh2dgtU6"
		}
	}
);

const mailOptions = {
	from: "<support@aaliya-gallery.com>",
	to: "<sgupt9999@gmail.com>",
	subject: "New User",
	html: "<b>New User Registeration<b>"
};

transport.sendMail(mailOptions, function(err,response) {
	if (error) {
		console.log(error);
	}
	else {
		console.log("Message sent: " + response.message);
	}

	transport.close();
});
	
