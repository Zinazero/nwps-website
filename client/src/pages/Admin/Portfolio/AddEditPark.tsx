import { ItemForm } from '../../../components/forms/ItemForm';
import { useState } from 'react';
import type { ParkSection } from '../../../components/forms/types';
import api from '../../../api/axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Tooltip } from '../../../components/ui/Tooltip';

export const AddEditPark = () => {
	const location = useLocation();
	const {
		parkId,
		parkCity,
		parkBlurb,
		parkSections = [],
	} = (location.state as {
		parkId: number;
		parkCity: string;
		parkBlurb: string;
		parkSections?: ParkSection[];
	}) || {};
	const [form, setForm] = useState<ParkSection[]>(
		parkSections.length > 0
			? parkSections
			: [{ title: '', description: '', image: null }]
	);
	const [city, setCity] = useState<string>(parkCity || '');
	const [blurb, setBlurb] = useState<string>(parkBlurb || '');
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
			const id = parkId || null;
			const formData = new FormData();
			const location = `${city}, Ontario`;

			// Create a JSON object for all non-file data
			const jsonData = form.map((section, index) => {
				const { image, ...rest } = section; // remove image
				return index === 0 ? { ...rest, location, blurb, id } : rest;
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
				<div className='flex flex-col items-center space-y-4'>
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
					<div className='flex items-center space-x-4'>
						<textarea
							name='blurb'
							placeholder='Blurb (optional)'
							value={blurb}
							onChange={(e) => setBlurb(e.target.value)}
							className='w-100 h-30 text-center'
						/>
						<div className='relative group'>
							<FontAwesomeIcon icon={faCircleInfo} className='text-grey' />
							<Tooltip
								message='This text will appear under the park if it is in the Recent Projects section.'
								className='absolute bottom-full left-full w-80'
							/>
						</div>
					</div>
				</div>
				<ItemForm
					formType='park'
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
