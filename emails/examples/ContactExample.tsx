import ContactTemplate from '../../server/src/emails/templates/ContactTemplate';

const ContactExample = () => {
  const form = {
    firstName: 'John',
    lastName: 'Doe',
    company: '',
    phone: '(123) 456-7890',
    email: 'johndoe@gmail.com',
    message: 'Test Message',
  };

  return <ContactTemplate form={form} />;
};

export default ContactExample;
