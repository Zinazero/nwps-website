import { SectionForm } from './SectionForm';
import type { Section } from './types';
import './sections.css';

interface ItemFormProps {
	form: Section[];
	setForm: React.Dispatch<React.SetStateAction<Section[]>>;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const ItemForm: React.FC<ItemFormProps> = ({
	form,
	setForm,
	handleSubmit,
}) => {
	const addSection = () => {
		setForm((prev) => [...prev, { title: '', description: '', image: [] }]);
	};

	return (
		<form
			id='item-form'
			className='flex flex-col items-center space-y-12'
			onSubmit={handleSubmit}
		>
			{form.map((section, index) => (
				<SectionForm
					form={section}
					index={index}
					setForm={(updatedSection) =>
						setForm((prev) =>
							prev.map((s, i) => (i === index ? updatedSection : s))
						)
					}
				/>
			))}
			<div className='flex flex-col items-center space-y-6 w-full'>
				<button
					type='button'
					onClick={addSection}
					className='w-full max-w-300 border-1 border-dashed border-brand-orange text-brand-orange hover:border-brand-green hover:text-brand-green active:scale-95 rounded-xl text-2xl transition'
				>
					+
				</button>
				<button
					type='submit'
					className='rounded-lg p-2 bg-brand-blue hover:bg-brand-orange active:scale-95 transition text-white text-xl w-100'
				>
					Save
				</button>
			</div>
		</form>
	);
};
