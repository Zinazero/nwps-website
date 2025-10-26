import { Container, Heading, Hr, Section, Text } from '@react-email/components';
import { ContactFormValues, Field } from '../../types';
import NWPSWrapper from '../NWPSWrapper';

interface ContactTemplateProps {
  form: ContactFormValues;
}

const ContactTemplate = ({ form }: ContactTemplateProps) => {
  const fields: Field[] = [
    { label: 'Name', info: `${form.firstName} ${form.lastName}` },
    { label: 'Company', info: form.company || '---' },
    { label: 'Phone', info: form.phone },
    { label: 'Email', info: form.email },
    { label: 'Message', info: form.message },
  ];

  const messageField = fields.find(({ label }) => label === 'Message');
  const otherFields = fields.filter(({ label }) => label !== 'Message');

  return (
    <NWPSWrapper>
      <Section>
        <Heading className="text-brandorange">Contact Request</Heading>
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

        {messageField && (
          <Container className="w-3/4">
            <Text className="text-lg">
              <strong className="text-brandblue">Message</strong>
            </Text>
            <Hr />
            <Text className="font-serif text-left">{messageField.info}</Text>
          </Container>
        )}
      </Section>
    </NWPSWrapper>
  );
};

export default ContactTemplate;
