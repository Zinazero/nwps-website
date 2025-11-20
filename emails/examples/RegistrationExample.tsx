import RegistrationTemplate from '../../server/src/emails/templates/RegistrationTemplate';

const RegistrationExample = () => {
  const link = 'http://localhost:5173';

  return <RegistrationTemplate link={link} />;
};

export default RegistrationExample;
