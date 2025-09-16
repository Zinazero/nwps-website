import { ItemForm } from '../../../components/forms/ItemForm';
import { useState } from 'react';
import type { Section } from '../../../components/forms/types';

export const AddPark = () => {
	const [form, setForm] = useState<Section[]>([
		{
			title: '',
			description: '',
			image: null,
		},
	]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(form);
	};

	return (
		<main className='min-h-screen flex flex-col items-center space-y-12 bg-white p-16'>
			<div className='flex flex-col items-center'>
				<ItemForm form={form} setForm={setForm} handleSubmit={handleSubmit} />
			</div>
		</main>
	);
};
