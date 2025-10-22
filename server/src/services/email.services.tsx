import nodemailer from 'nodemailer';
import { ContactFormValues } from '../types';
import ContactTemplate from '../emails/templates/ContactTemplate';
import 'web-streams-polyfill/polyfill'; // Required to support Safari and iOS browsers

import dotenv from 'dotenv';
import { pretty, render, toPlainText } from '@react-email/render';
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
	const { firstName, lastName, email } = form;

	// Render email HTML and text
	let html: string, text: string;
	try {
		html = await pretty(await render(<ContactTemplate form={form} />));
		text = toPlainText(html);
	} catch (err) {
		throw err;
	}

	// Send email
	try {
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
	} catch (err) {
		throw err;
	}
};
