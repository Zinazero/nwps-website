import { ContactFormValues } from '../types';
import ContactTemplate from '../emails/templates/ContactTemplate';
import 'web-streams-polyfill/polyfill'; // Required to support Safari and iOS browsers
import { pretty, render, toPlainText } from '@react-email/render';
import { Resend } from 'resend';
import env from '../config/env';

const resend = new Resend(env.RESEND_API_KEY);

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
		await resend.emails.send({
			from: `NWPS Contact <${env.EMAIL_SENDER}>`,
			to: env.EMAIL_RECEIVER,
			subject: `New Contact Request from ${firstName} ${lastName}`,
			html,
			text,
			replyTo: email,
		});

		console.log(
			`Email sent to ${env.EMAIL_RECEIVER} at ${new Date().toISOString()}`
		);
	} catch (err) {
		throw err;
	}
};
