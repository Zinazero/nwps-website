import { Container, Heading, Hr, Section, Text } from '@react-email/components';
import { Field, InvoiceInfo, OrderItem } from '../../types';
import NWPSWrapper from '../NWPSWrapper';

interface InvoiceRequestTemplateProps {
  form: InvoiceInfo;
  cart: OrderItem[];
}

const InvoiceRequestTemplate = ({ form, cart }: InvoiceRequestTemplateProps) => {
  const fields: Field[] = [
    { label: 'Order #', info: form.orderNumber },
    { label: 'Name', info: `${form.firstName} ${form.lastName}` },
    { label: 'Company', info: form.company || '---' },
    { label: 'Phone', info: form.phone },
    { label: 'Email', info: form.email },
    { label: 'Address Line 1', info: form.address1 },
    { label: 'Address Line 2', info: form.address2 || '---' },
    { label: 'City', info: form.city },
    { label: 'Province', info: form.province },
    { label: 'Postal Code', info: form.postalCode },
    { label: 'Message', info: form.message },
  ];

  const messageField = fields.find(({ label }) => label === 'Message');
  const otherFields = fields.filter(({ label }) => label !== 'Message');

  return (
    <NWPSWrapper>
      <Heading className="text-brandorange">Invoice Request</Heading>

      <Section>
        <table className="mx-auto text-left w-500" cellPadding={20}>
          <tbody>
            {otherFields.map(({ label, info }) => (
              <tr key={label}>
                <td>
                  <strong className="text-brandblue">{label}</strong>
                </td>
                <td>{info}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {messageField?.info && (
          <Container className="w-3/4">
            <Text className="text-lg">
              <strong className="text-brandblue">Message</strong>
            </Text>
            <Hr />
            <Text className="font-serif text-left">{messageField.info}</Text>
          </Container>
        )}
      </Section>

      <Section className="w-3/4">
        <Text className="text-lg">
          <strong className="text-brandorange">Items</strong>
        </Text>
        <Container className="bg-white rounded-lg p-4 w-full">
          <table className="mx-auto text-left w-full border-collapse">
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f6f6f6' }}>
                  <td className="pt-4">
                    <strong className="text-brandblue">{item.title}</strong>
                  </td>
                  <td className="pt-4">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </Section>
    </NWPSWrapper>
  );
};

export default InvoiceRequestTemplate;
