import { cn } from '@/app/utils/cn';
import Link from 'next/link';

interface AddCardButtonProps {
	navigationRoute: string;
	className?: string;
}

export const AddCardButton = ({
	navigationRoute,
	className,
}: AddCardButtonProps) => {
	return (
		<Link
			href={navigationRoute}
			className={cn(
				'border-1 border-dashed border-brand-green text-brand-green',
				'hover:scale-105 active:scale-100 rounded-xl text-4xl transition',
				'flex items-center justify-center',
				className
			)}
		>
			+
		</Link>
	);
};
