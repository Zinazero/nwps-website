import type { Section } from './types';

interface SectionFormProps {
	form: Section;
	setForm: (section: Section) => void;
	index: number;
}

export const SectionForm: React.FC<SectionFormProps> = ({
	form,
	index,
	setForm,
}) => {
	const isReverse = index % 2 !== 0 ? 'flex-row-reverse' : '';

	return (
		<section
			className={index === 0 ? 'hero-section' : `info-section ${isReverse}`}
		>
            <label htmlFor='image-upload' className='file-input'>+</label>
			<input id='image-upload' type='file' name='image' className='hidden' />
			<div className='text-container'>
				<input type='text' name='title' placeholder='Title' />
				<textarea name='description' placeholder='Description' />
			</div>
		</section>
	);
};
