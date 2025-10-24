import ContactTemplate from '../emails/templates/ContactTemplate';
import { ContactFormValues } from '../types';
import 'web-streams-polyfill/polyfill'; // Required to support Safari and iOS browsers
import { pretty, render, toPlainText } from '@react-email/render';
import { Resend } from 'resend';
import env from '../config/env';

const resend = new Resend(env.RESEND_API_KEY);

export const sendContactEmail = async (form: ContactFormValues) => {
  const { firstName, lastName, email } = form;

  const html = await pretty(await render(<ContactTemplate form={form} />));
  const text = toPlainText(html);

  await resend.emails.send({
    from: `NWPS Contact <${env.EMAIL_SENDER}>`,
    to: env.EMAIL_RECEIVER,
    subject: `New Contact Request from ${firstName} ${lastName}`,
    html,
    text,
    replyTo: email,
  });

  console.log(`Email sent to ${env.EMAIL_RECEIVER} at ${new Date().toISOString()}`);
};
