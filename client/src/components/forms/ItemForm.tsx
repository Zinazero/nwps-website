import { SectionForm } from './SectionForm';
import type { Section } from './types';
import './sections.css';
import { useState } from 'react';
import { ConfirmModal } from '../ui/ConfirmModal';
import { Loading } from '../ui/Loading';

interface ItemFormProps {
	form: Section[];
	setForm: React.Dispatch<React.SetStateAction<Section[]>>;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	loading: boolean;
}

export const ItemForm: React.FC<ItemFormProps> = ({
	form,
	setForm,
	handleSubmit,
	loading,
}) => {
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [dropIndex, setDropIndex] = useState<number | null>(null);

	const addSection = () => {
		setForm((prev) => [...prev, { title: '', description: '', image: null }]);
	};

	const dropSection = (indexToRemove: number) => {
		setForm((prev) => prev.filter((_, i) => i !== indexToRemove));
	};

	const handleDropSectionClick = (index: number, section: Section) => {
		if (section.title || section.description || section.image) {
			setDropIndex(index);
			setConfirmOpen(true);
		} else {
			dropSection(index);
		}
	};

	const handleConfirmDrop = () => {
		if (dropIndex !== null) {
			dropSection(dropIndex);
			setDropIndex(null);
		}
		setConfirmOpen(false);
	};

	return (
		<>
			<form
				id='item-form'
				className='flex flex-col items-center space-y-12'
				onSubmit={handleSubmit}
			>
				{/* Section Map */}
				{form.map((section, index) => (
					<SectionForm
						key={index}
						section={section}
						index={index}
						setSection={(updatedSection) =>
							setForm((prev) =>
								prev.map((s, i) => (i === index ? updatedSection : s))
							)
						}
						dropSection={() => handleDropSectionClick(index, section)}
					/>
				))}

				{/* Buttons */}
				{loading ? (
					<Loading />
				) : (
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
				)}
			</form>

			{/* Confirm Modal */}
			<ConfirmModal
				isOpen={confirmOpen}
				message='Are you sure you want to delete this section?'
				onConfirm={handleConfirmDrop}
				onCancel={() => setConfirmOpen(false)}
			/>
		</>
	);
};
