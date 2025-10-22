import nodemailer from 'nodemailer';
import { ContactFormValues } from '../types';

import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

export const sendContactEmail = async (form: ContactFormValues) => {
	const { firstName, lastName, phone, email, message } = form;

	const html = `
        <p>
        <b>Name:</b> ${firstName} ${lastName}<br>
        <b>Phone:</b> ${phone}<br>
        <b>Email:</b> ${email}<br>
        <b>Message:</b> ${message}
        </p>
    `;

	const text = `
        Name: ${firstName} ${lastName}
        Phone: ${phone}
        Email: ${email}
        Message: ${message}
    `;

	await transporter.sendMail({
		from: `"NWPS Contact" <${process.env.SMTP_USER}>`,
		to: process.env.EMAIL_RECEIVER,
		subject: `New Contact Request from ${firstName} ${lastName}`,
		text: text,
		html: html,
		replyTo: email,
	});

	console.log(
		`Email sent to ${process.env.EMAIL_RECEIVER} at ${new Date().toISOString()}`
	);
};
