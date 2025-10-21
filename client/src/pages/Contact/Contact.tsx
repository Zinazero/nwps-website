import { useState } from 'react';
import { ContactForm } from '../../components/forms/ContactForm';
import type { ContactFormValues } from '../../components/forms/types';
import { UnderlineHeader } from '../../components/ui/UnderlineHeader';
import { ContactBanner } from './sections/ContactBanner';
import api from '../../api/axios';

export const Contact = () => {
	const [form, setForm] = useState<ContactFormValues>({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		message: '',
	});
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [isContactSent, setIsContactSent] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		if (formData.get('website')) return;


		setLoading(true);
		setError(null);

		try {
			await api.post('/contact', form);
			console.log('Contact Sent');
			setIsContactSent(true);
		} catch (err: any) {
			console.error(err);
			setError(err.response?.data?.error || 'Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className='flex flex-col items-center space-y-12 p-8'>
			<UnderlineHeader text='Contact' withArrow />

			<ContactBanner />

			<ContactForm
				form={form}
				setForm={setForm}
				handleSubmit={handleSubmit}
				loading={loading}
			/>

			{/* Error Message */}
			{error && <span className='text-[red]'>{error}</span>}
		</main>
	);
};
