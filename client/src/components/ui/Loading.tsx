import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const Loading = () => {
	return (
		<div className='flex items-center justify-center flex-1 text-transparent-grey'>
			<span className='text-3xl mr-4'>Loading</span>
			<FontAwesomeIcon icon={faSpinner} spin size='2x' />
		</div>
	);
};
