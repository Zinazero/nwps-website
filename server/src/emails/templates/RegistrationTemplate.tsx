import { Button, Heading, Section, Text } from '@react-email/components';
import NWPSWrapper from '../NWPSWrapper';

interface RegistrationTemplateProps {
  link: string;
}

const RegistrationTemplate = ({ link }: RegistrationTemplateProps) => {
  return (
    <NWPSWrapper>
      <Heading className="text-brandorange">NWPS Registration</Heading>

      <Section>
        <Text className="text-lg">Click the link to register!</Text>
      </Section>

      <Section>
        <Button href={link} className="bg-brandblue text-lg text-white p-4 rounded-2xl w-2/3">Register</Button>
      </Section>
    </NWPSWrapper>
  );
};

export default RegistrationTemplate;
