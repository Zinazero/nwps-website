import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';

interface ProviderForm {
	logo: File | null;
	image: File | null;
	title: string;
	blurb: string;
	description: string;
	externalLink: string;
}

export const AddProvider = () => {
	const [form, setForm] = useState<ProviderForm>({
		logo: null,
		image: null,
		title: '',
		blurb: '',
		description: '',
		externalLink: '',
	});

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const formData = new FormData();

			const { image, ...jsonData } = form;
			formData.append('data', JSON.stringify(jsonData));
			if (form.logo) formData.append('logo', form.logo);
			if (form.image) formData.append('image', form.image);

			const res = await api.post('/providers/post-provider', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			console.log('Provider successfully added', res.data);
			navigate('/#authorized-distributor');
		} catch (err) {
			console.error(err);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const { name } = e.target;
			const file = e.target.files[0];
			setForm({ ...form, [name]: file });
		}
	};

	const handleTextChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	return (
		<main className='min-h-screen flex items-center justify-center'>
			<form
				className='flex flex-col items-center space-y-4'
				onSubmit={handleSubmit}
			>
				<div className='flex flex-col'>
					<label className='text-lg font-bold'>Logo</label>
					<input type='file' name='logo' onChange={handleFileChange} required />
				</div>
				<div className='flex flex-col'>
					<label className='text-lg font-bold'>Provider Page Image</label>
					<input type='file' name='image' onChange={handleFileChange} />
				</div>
				<input
					type='text'
					name='title'
					placeholder='Title'
					value={form.title}
					onChange={handleTextChange}
					required
				/>
				<textarea
					name='blurb'
					placeholder='Blurb'
					value={form.blurb}
					onChange={handleTextChange}
				/>
				<textarea
					name='description'
					placeholder='Description'
					value={form.description}
					onChange={handleTextChange}
				/>
				<input
					type='url'
					name='externalLink'
					placeholder='External Link'
					value={form.externalLink}
					onChange={handleTextChange}
					required
				/>
				<button
					type='submit'
					className='rounded-lg p-2 bg-brand-blue text-white hover:bg-brand-orange active:scale-95 transition'
				>
					Submit
				</button>
			</form>
		</main>
	);
};
