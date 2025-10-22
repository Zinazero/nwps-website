import { cn } from '../../utils/cn';
import { phoneNumberFormatter } from '../../utils/phoneNumberFormatter';
import { Loading } from '../ui/Loading';
import type { ContactFormValues } from './types';

interface ContactFormProps {
	form: ContactFormValues;
	setForm: React.Dispatch<React.SetStateAction<ContactFormValues>>;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	loading: boolean;
}

export const ContactForm = ({
	form,
	setForm,
	handleSubmit,
	loading,
}: ContactFormProps) => {
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const labelClasses = cn('text-xl font-bold');

	return (
		<form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
			{/* Fields */}

			{/* Name */}
			<fieldset>
				<legend className={labelClasses}>Name</legend>
				<div className='flex space-x-6'>
					<label htmlFor='first-name' className='sr-only'>
						First Name
					</label>
					<input
						type='text'
						id='first-name'
						name='firstName'
						placeholder='First'
						value={form.firstName}
						onChange={(e) => handleChange(e)}
						required
					/>
					<label htmlFor='last-name' className='sr-only'>
						Last Name
					</label>
					<input
						type='text'
						id='last-name'
						name='lastName'
						placeholder='Last'
						value={form.lastName}
						onChange={(e) => handleChange(e)}
						required
					/>
				</div>
			</fieldset>

			<fieldset className='flex space-x-6'>
				{/* Phone */}
				<div className='flex flex-col'>
					<label htmlFor='phone' className={labelClasses}>
						Phone
					</label>
					<input
						type='tel'
						id='phone'
						name='phone'
						value={form.phone}
						onChange={(e) => handleChange(e)}
						onBlur={(e) =>
							setForm({
								...form,
								[e.target.name]: phoneNumberFormatter(e.target.value),
							})
						}
						pattern='\(\d{3}\) \d{3}-\d{4}'
						title='(123) 456-7890'
						required
					/>
				</div>

				{/* Email */}
				<div className='flex flex-col'>
					<label htmlFor='email' className={labelClasses}>
						Email
					</label>
					<input
						type='email'
						id='email'
						name='email'
						value={form.email}
						onChange={(e) => handleChange(e)}
						required
					/>
				</div>
			</fieldset>

			{/* Message */}
			<label htmlFor='message' className={labelClasses}>
				How Can We Help You?
			</label>
			<textarea
				rows={10}
				id='message'
				name='message'
				value={form.message}
				onChange={(e) => handleChange(e)}
				required
			/>

			{/* Hidden honeypot for spam */}
			<input
				type='text'
				name='website'
				autoComplete='off'
				tabIndex={-1}
				className='sr-only'
				aria-hidden='true'
			/>

			{/* Submit */}
			{loading ? (
				<Loading />
			) : (
				<button
					type='submit'
					className={cn(
						'p-2 bg-brand-orange hover:bg-brand-blue transition',
						'text-light font-bold rounded-lg active:scale-95 cursor-pointer'
					)}
				>
					Submit
				</button>
			)}
		</form>
	);
};
