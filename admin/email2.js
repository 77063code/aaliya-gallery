const nodemailer = require('nodemailer');
const ses = require('nodemailer-ses-transport');

const transport = nodemailer.createTransport(ses
	({
		accessKeyId: 'AKIAUQSMLK2MCLBYU4MZ',
    		secretAccessKey: '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',
		region: 'us-west-2'
}));

const mailOptions = {
	from: "<support@aaliya-gallery.com>",
	to: "<sgupt9999@gmail.com>",
	subject: "New User",
	html: "<b>New User Registeration<b>"
};

transport.sendMail(mailOptions);
	
