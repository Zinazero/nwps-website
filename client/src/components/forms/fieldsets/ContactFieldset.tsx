import { cn } from '../../../utils/cn';
import { phoneNumberFormatter } from '../../../utils/phoneNumberFormatter';
import type { ContactFieldsetValues } from '../types';

interface ContactFieldsetProps {
	form: ContactFieldsetValues;
	onChange: <K extends keyof ContactFieldsetValues>(
		name: K,
		value: ContactFieldsetValues[K]
	) => void;
}

export const ContactFieldSet = ({ form, onChange }: ContactFieldsetProps) => {
	const labelClasses = cn('text-xl font-bold mb-1');

	const handleChange = <K extends keyof ContactFieldsetValues>(
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		onChange(e.target.name as K, e.target.value as ContactFieldsetValues[K]);
	};

	const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		onChange(
			e.target.name as keyof ContactFieldsetValues,
			phoneNumberFormatter(e.target.value)
		);
	};

	return (
		<fieldset className={cn('flex flex-col space-y-4')}>
			<legend className={cn('sr-only')}>Contact</legend>

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
						onChange={handleChange}
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
						onChange={handleChange}
						required
					/>
				</div>
			</fieldset>

			{/* Company */}
			<div className={cn('flex flex-col')}>
				<label htmlFor='company' className={labelClasses}>
					Company
				</label>
				<input
					type='text'
					id='company'
					name='company'
					value={form.company}
					onChange={handleChange}
					placeholder='(optional)'
				/>
			</div>

			<div className='flex space-x-6'>
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
						onChange={handleChange}
						onBlur={handlePhoneBlur}
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
						onChange={handleChange}
						required
					/>
				</div>
			</div>
		</fieldset>
	);
};
