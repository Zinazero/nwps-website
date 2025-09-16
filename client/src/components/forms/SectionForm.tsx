import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Section } from './types';
import { useEffect, useState } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface SectionFormProps {
	section: Section;
	setSection: (section: Section) => void;
	index: number;
}

export const SectionForm: React.FC<SectionFormProps> = ({
	section,
	index,
	setSection,
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
			className={index === 0 ? 'hero-section' : `info-section ${isReverse}`}
		>
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
						className='absolute top-0 right-0 p-4 text-red hover:text-brand-red active:scale-95 opacity-0 group-hover:opacity-100 transition'
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
			<div className='text-container'>
				<input type='text' name='title' placeholder='Title' />
				<textarea name='description' placeholder='Description' />
			</div>
		</section>
	);
};
