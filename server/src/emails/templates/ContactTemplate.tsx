import { Container, Heading, Text, Hr, Section } from '@react-email/components';
import CobaltWrapper from '../NWPSWrapper';
import { ContactFormValues } from '../../types';

interface Field {
	label: string;
	info: string;
}

interface ContactTemplateProps {
	form: ContactFormValues
}

const ContactTemplate = ({ form }: ContactTemplateProps) => {
	const fields: Field[] = [
		{ label: 'Name', info: `${form.firstName} ${form.lastName}` },
		{ label: 'Phone', info: form.phone },
		{ label: 'Email', info: form.email },
		{ label: 'Message', info: form.message },
	];

	const messageField = fields.find(({ label }) => label === 'Message');
	const otherFields = fields.filter(({ label }) => label !== 'Message');

	return (
		<CobaltWrapper>
			<Section>
				<Heading className='text-brandorange'>Contact Request</Heading>
				<table className='mx-auto text-left w-500' cellPadding={20}>
					<tbody>
						{otherFields.map(({ label, info }, i) => (
							<tr key={i}>
								<td>
									<strong className='text-brandblue'>{label}</strong>
								</td>
								<td>{info}</td>
							</tr>
						))}
					</tbody>
				</table>

				{messageField && (
					<Container className='w-3/4'>
						<Text className='text-lg'>
							<strong className='text-brandblue'>Message</strong>
						</Text>
						<Hr />
						<Text className='font-serif text-left'>{messageField.info}</Text>
					</Container>
				)}
			</Section>
		</CobaltWrapper>
	);
};

export default ContactTemplate;
