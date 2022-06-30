const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const mg = require("mailgun-js");

const mailgun = () =>
	mg({
		apiKey: process.env.MAILGUN_API_KEY,
		domain: process.env.MAILGUN_DOMAIN,
	});

app.post("/sendmail", (req, res) => {
	const { subject, email, name, phone, message } = req.body;
	console.log(req.body);
	mailgun()
		.messages()
		.send(
			{
				from: "Mohd Haider <haiderahmed12786@gmail.com>",
				to: "haiderahmed12786@gmail.com",
				subject,
				text: `from ${email}\nname ${name}\nphone ${phone}\nmessage\n${message}`,
			},
			(error, success) => {
				if (error) {
					console.log(error);
					res.status(500).send("ERROR in sending mail");
				} else {
					console.log("success message", success);
					res.status(200).send("message send success");
				}
			}
		);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`server running on ${port}`);
});
