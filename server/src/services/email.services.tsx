import { pretty, render, toPlainText } from '@react-email/render';
import { Resend } from 'resend';
import env from '../config/env';
import ContactTemplate from '../emails/templates/ContactTemplate';
import InvoiceRequestTemplate from '../emails/templates/InvoiceRequestTemplate';
import OrderConfirmationTemplate from '../emails/templates/OrderConfirmationTemplate';
import { ContactFormValues, InvoiceInfo, OrderItem } from '../types';
import RegistrationTemplate from '../emails/templates/RegistrationTemplate';

const resend = new Resend(env.RESEND_API_KEY);

export const sendContactEmail = async (form: ContactFormValues) => {
  const { firstName, lastName, company, email } = form;

  const contact = company ? company : `${firstName} ${lastName}`;

  const html = await pretty(await render(<ContactTemplate form={form} />));
  const text = toPlainText(html);

  await resend.emails.send({
    from: `NWPS Contact <${env.EMAIL_SENDER}>`,
    to: env.EMAIL_RECEIVER,
    subject: `New Contact Request from ${contact}`,
    html,
    text,
    replyTo: email,
  });

  console.log(`Email sent to ${env.EMAIL_RECEIVER} at ${new Date().toISOString()}`);
};

export const sendInvoiceRequest = async (form: InvoiceInfo, cart: OrderItem[]) => {
  const { firstName, lastName, company, email } = form;

  const contact = company ? company : `${firstName} ${lastName}`;

  const html = await pretty(await render(<InvoiceRequestTemplate form={form} cart={cart} />));
  const text = toPlainText(html);

  await resend.emails.send({
    from: `NWPS Contact <${env.EMAIL_SENDER}>`,
    to: env.EMAIL_RECEIVER,
    subject: `New Invoice Request from ${contact}`,
    html,
    text,
    replyTo: email,
  });

  console.log(`Invoice request sent to ${env.EMAIL_RECEIVER} at ${new Date().toISOString()}`);
};

export const sendOrderConfirmation = async (form: InvoiceInfo, cart: OrderItem[]) => {
  const { email, orderNumber } = form;

  const html = await pretty(await render(<OrderConfirmationTemplate form={form} cart={cart} />));
  const text = toPlainText(html);

  await resend.emails.send({
    from: `New World Park Solutions <${env.EMAIL_SENDER}>`,
    to: email,
    subject: `Order Confirmation: ${orderNumber}`,
    html,
    text,
    replyTo: env.EMAIL_RECEIVER,
  });

  console.log(`Order Confirmation sent to ${email} at ${new Date().toISOString()}`);
};

export const sendRegistrationEmail = async (email: string, link: string) => {
  const html = await pretty(await render(<RegistrationTemplate link={link} />));
  const text = toPlainText(html);

  await resend.emails.send({
    from: `NWPS Register <${env.EMAIL_SENDER}>`,
    to: email,
    subject: 'Your Registration Link',
    html,
    text,
  });
};

export const sendAdminAlert = async (subject: string, message: string) => {
  try {
    await resend.emails.send({
      from: `NWPS System <${env.ADMIN_SENDER}>`,
      to: env.ADMIN_RECEIVER,
      subject: `[ALERT] ${subject}`,
      text: message,
    });
  } catch (err) {
    console.error('Failed to send admin alert email:', err);
  }
};
