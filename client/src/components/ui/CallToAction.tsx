import { Image } from './Image';
import nwpsVerticalLogo from '@/assets/logos/nwps-vertical-logo.svg';
import { Link } from 'react-router';

export const CallToAction = () => {
	return (
		<div className='max-w-300 xl:mx-auto mx-20 mb-20 rounded-2xl shadow-2xl bg-brand-blue-light p-12 flex items-center'>
			<Image src={nwpsVerticalLogo} alt='NWPS Logo' className='h-48' />
			<div className='flex-1 flex flex-col items-center gap-6'>
				<p className='text-4xl text-brand-orange'>
					Not sure which product to choose?
				</p>
				<div className='flex gap-2 text-4xl font-bold'>
					<h3 className='text-brand-blue'>{'Call Us (519) 304-3437 or'}</h3>
					<Link
						to='/contact'
						className='text-white hover:text-brand-orange transition'
					>
						Get In Touch
					</Link>
				</div>
			</div>
		</div>
	);
};
