import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Section } from './types';
import { useEffect, useState } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface SectionFormProps {
	section: Section;
	index: number;
	setSection: (section: Section) => void;
	dropSection: (index: number, section: Section) => void;
}

export const SectionForm: React.FC<SectionFormProps> = ({
	section,
	index,
	setSection,
	dropSection,
}) => {
	const [preview, setPreview] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setSection({ ...section, image: file });

			// revoke previous preview if any
			if (preview) URL.revokeObjectURL(preview);

			// create new preview URL
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleTextChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setSection({ ...section, [name]: value });
	};

	useEffect(() => {
		if (section.image) {
			const url = URL.createObjectURL(section.image);
			setPreview(url);
			return () => URL.revokeObjectURL(url);
		} else {
			setPreview(null);
		}
	}, [section.image]);

	const removeImage = () => setSection({ ...section, image: null });
	const isReverse = index % 2 !== 0 ? 'flex-row-reverse' : '';

	return (
		<section
			className={`relative ${
				index === 0 ? 'hero-section' : `info-section ${isReverse}`
			}`}
		>
			{/* Image */}
			{preview ? (
				<div className='relative group'>
					{/* Image Preview */}
					<img
						src={preview}
						alt='Image Preview'
						className='w-full rounded-xl'
					/>

					{/* Remove Preview Button  */}
					<button
						type='button'
						onClick={removeImage}
						className='absolute top-0 right-0 m-2 trash hover-vis'
					>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</div>
			) : (
				<label htmlFor={`image-upload-${index}`} className='file-input'>
					+
				</label>
			)}
			<input
				id={`image-upload-${index}`}
				onChange={handleFileChange}
				type='file'
				name='image'
				className='hidden'
			/>

			{/* Text */}
			<div className='text-container'>
				<input
					type='text'
					name='title'
					placeholder='Title'
					value={section.title}
					onChange={handleTextChange}
                    required
				/>
				<textarea
					name='description'
					placeholder='Description'
					value={section.description}
					onChange={handleTextChange}
                    required
				/>
			</div>

			{/* Remove Section Button */}
			{index !== 0 && (
				<button
					type='button'
					onClick={() => dropSection(index, section)}
					className='absolute top-1/2 -translate-1/2 -right-50 text-2xl p-4 trash'
				>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			)}
		</section>
	);
};
