import InvoiceRequestTemplate from '../../server/src/emails/templates/InvoiceRequestTemplate';

const InvoiceRequestExample = () => {
  const form = {
    firstName: 'John',
    lastName: 'Doe',
    company: '',
    phone: '(123) 456-7890',
    email: 'johndoe@gmail.com',
    address1: '123 Example Drive',
    address2: '',
    city: 'Toronto',
    province: 'ON',
    postalCode: 'N1N N1N',
    message: 'Test Message',
    orderNumber: 'NWPS-2025-94651',
  };

  const cart = [
    { id: 1, increment: 10, title: 'Belt Seat', quantity: 50 },
    { id: 2, increment: 5, title: 'Infant Seat', quantity: 600 },
  ];

  return <InvoiceRequestTemplate form={form} cart={cart} />;
};

export default InvoiceRequestExample;
