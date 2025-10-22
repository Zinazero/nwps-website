import { useState } from 'react';
import { ContactForm } from '../../components/forms/ContactForm';
import type { ContactFormValues } from '../../components/forms/types';
import { UnderlineHeader } from '../../components/ui/UnderlineHeader';
import { ContactBanner } from './sections/ContactBanner';
import api from '../../api/axios';
import { cn } from '../../utils/cn';

export const Contact = () => {
	const defaultForm: ContactFormValues = {
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		message: '',
	};

	const [form, setForm] = useState<ContactFormValues>(defaultForm);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [isContactSent, setIsContactSent] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Checking for spam
		const formData = new FormData(e.currentTarget);
		if (formData.get('website')) return;

		setLoading(true);
		setError(null);

		try {
			await api.post('/contact', form);
			console.log('Contact Sent');
			setIsContactSent(true);
			setForm(defaultForm);
		} catch (err: any) {
			setError('Something went wrong. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className='flex flex-col items-center space-y-12 p-8'>
			<UnderlineHeader text='Contact' withArrow />

			<ContactBanner />

			{isContactSent ? (
				<>
					{/* Contact Sent */}
					<div className='flex flex-col items-center space-y-10 mt-40'>
						<div className='flex flex-col text-center space-y-2'>
							<span className='text-2xl font-bold text-brand-orange'>
								Thanks for reaching out!
							</span>
							<p className='text-lg'>
								Your message has been received, and a member of our team will
								respond shortly.
							</p>
						</div>
						<button
							type='button'
							onClick={() => setIsContactSent(false)}
							className={cn(
								'p-2 w-1/2 bg-brand-orange hover:bg-brand-blue transition',
								'text-light font-bold rounded-lg active:scale-95 cursor-pointer'
							)}
						>
							Return
						</button>
					</div>
				</>
			) : (
				<ContactForm
					form={form}
					setForm={setForm}
					handleSubmit={handleSubmit}
					loading={loading}
				/>
			)}

			{/* Error Message */}
			{error && <span className='text-[red]'>{error}</span>}
		</main>
	);
};
