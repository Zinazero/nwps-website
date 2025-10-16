'use client';

import { Check } from '@/app/components/ui/Check';
import { Pen } from '@/app/components/ui/Pen';
import { useAuth } from '@/app/contexts/AuthContext';

interface EditModeProps {
	isEditMode: boolean;
	setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditMode = ({ isEditMode, setIsEditMode }: EditModeProps) => {
	const { user } = useAuth();

	if (!user) return;

	return (
		<>
			{isEditMode ? (
				<Check onClick={() => setIsEditMode(false)} className='text-xl' />
			) : (
				<Pen onClick={() => setIsEditMode(true)} className='text-xl' />
			)}
		</>
	);
};
