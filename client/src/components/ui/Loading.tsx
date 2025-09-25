import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const Loading = () => {
	return (
		<div className='flex  w-full h-full items-center justify-center flex-1 text-transparent-grey'>
			<FontAwesomeIcon icon={faSpinner} spin size='2x' />
		</div>
	);
};
