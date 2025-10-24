import { cn } from '../../utils/cn';
import { Loading } from '../ui/Loading';
import { ContactFieldSet } from './fieldsets/ContactFieldset';
import { ShippingFieldset } from './fieldsets/ShippingFieldset';
import { Honeypot } from './components/Honeypot';
import { Message } from './components/Message';
import type { OrderFormValues } from './types';
import { Quantity } from './components/Quantity';

interface OrderFormProps {
	form: OrderFormValues;
	setForm: React.Dispatch<React.SetStateAction<OrderFormValues>>;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	loading: boolean;
}

export const OrderForm = ({
	form,
	setForm,
	handleSubmit,
	loading,
}: OrderFormProps) => {
	const handleChange = (name: string, value: string | number) => {
		setForm({ ...form, [name]: value });
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			{/* Contact Info */}
			<ContactFieldSet form={form} onChange={handleChange} />

            {/* Shipping Info */}
            <ShippingFieldset form={form} onChange={handleChange} />

            {/* Quantity */}
            <Quantity form={form} onChange={handleChange} />

			{/* Notes */}
			<Message form={form} onChange={handleChange} />

			{/* Hidden honeypot for spam */}
			<Honeypot />

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
