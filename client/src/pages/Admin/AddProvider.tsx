import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

interface ProviderForm {
	image: File | null;
	title: string;
	blurb: string;
	description: string;
	externalLink: string;
}

export const AddProvider = () => {
	const [form, setForm] = useState<ProviderForm>({
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
			if (form.image) formData.append('image', form.image);

			const res = await api.post('/providers/add-provider', formData, {
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
			const file = e.target.files[0];
			setForm({ ...form, image: file });
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
				<input type='file' name='image' onChange={handleFileChange} required />
				<input type='text' name='title' placeholder='Title' value={form.title} onChange={handleTextChange} required />
				<textarea name='blurb' placeholder='Blurb' value={form.blurb} onChange={handleTextChange} required />
				<textarea name='description' placeholder='Description' value={form.description} onChange={handleTextChange} required />
				<input type='text' name='externalLink' placeholder='External Link' value={form.externalLink} onChange={handleTextChange} required />
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
