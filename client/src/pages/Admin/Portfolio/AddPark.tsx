import { ItemForm } from '../../../components/forms/ItemForm';
import { useState } from 'react';
import type { Section } from '../../../components/forms/types';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const AddPark = () => {
	const [form, setForm] = useState<Section[]>([
		{
			title: '',
			description: '',
			image: null,
		},
	]);
	const [city, setCity] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		if (!city) {
			setError('Please provide a city.');
			return;
		}

		for (let i = 0; i < form.length; i++) {
			if (!form[i].image) {
				setError(`Section ${i + 1} requires an image.`);
				return;
			}
		}

		setLoading(true);

		try {
			const formData = new FormData();
			const location = `${city}, Ontario`;

			// Create a JSON object for all non-file data
			const jsonData = form.map((section, index) => {
				const { image, ...rest } = section; // remove image
				return index === 0 ? { ...rest, location } : rest;
			});
			formData.append('data', JSON.stringify(jsonData));

			// Append images separately
			form.forEach((section, index) => {
				if (section.image) {
					formData.append(`${index}`, section.image);
				}
			});

			const res = await api.post('/parks/post-park', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			console.log('Park successfully added', res.data);
			navigate('/portfolio');
		} catch (err: any) {
			console.error(err);
			setError(err.response?.data?.error || 'Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className='min-h-screen flex flex-col items-center space-y-12 bg-white p-16 relative'>
			<div className='flex flex-col items-center'>
				<div className='flex items-center space-x-4'>
					<input
						type='text'
						name='city'
						placeholder='City'
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
					<span>Ontario</span>
				</div>
				<ItemForm
					form={form}
					setForm={setForm}
					handleSubmit={handleSubmit}
					loading={loading}
				/>
				{error && <span className='text-[red] mt-4'>{error}</span>}
			</div>
			<Link
				to='/portfolio'
				className='absolute top-10 left-10 text-3xl text-brand-orange hover:scale-110 active:scale-100 transition'
			>
				<FontAwesomeIcon icon={faArrowLeft} />
			</Link>
		</main>
	);
};
