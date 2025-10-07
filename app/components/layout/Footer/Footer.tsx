import footerBackground from '@/app/assets/backgrounds/background-playground-icons.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebookF,
	faInstagram,
	faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import {
	faEnvelopeOpen,
	faLocationArrow,
	faPhoneFlip,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { FooterLinks } from './FooterLinks';
import Link from 'next/link';
import { AdminButton } from './AdminButton';

export const Footer = () => {
	return (
		<footer className='text-white'>
			<div
				className='relative bg-center bg-black/85 p-2 flex flex-col items-center'
				style={{ backgroundImage: `url(${footerBackground})` }}
			>
				{/* Top Border */}
				<div className='absolute top-0 left-0 w-full h-2 grid grid-cols-3'>
					<div className='bg-brand-orange'></div>
					<div className='bg-brand-green'></div>
					<div className='bg-brand-blue'></div>
				</div>

				{/* Footer Content */}
				<div className='flex my-6'>
					{/* Section 1 */}
					<div className='flex flex-col px-8 pb-20 space-y-10 w-1/4'>
						<div className='h-42 relative'>
							<Image
								src='/logos/nwps-vertical-logo.svg'
								alt='NWPS Logo'
								fill
							/>
						</div>
						<div className='flex flex-col space-y-6'>
							<span>
								<FontAwesomeIcon icon={faLocationArrow} /> Brantford, ON
							</span>
							<span>
								<FontAwesomeIcon icon={faEnvelopeOpen} /> info@nwps.ca
							</span>
							<span>
								<FontAwesomeIcon icon={faPhoneFlip} /> {'(519) 304-3437'}
							</span>
							<div className='flex items-center text-lg space-x-2'>
								<div className='relative group space-y-3'>
									<a
										href='https://www.facebook.com/newworldparksolutions/'
										target='_blank'
										rel='noopener noreferrer'
									>
										<div className='rounded-lg bg-grey/30 p-1 hover:bg-brand-blue transition cursor-pointer'>
											<FontAwesomeIcon icon={faFacebookF} className='' />
										</div>
									</a>
									<span className='mt-2 absolute top-full left-1/2 -translate-x-1/2 text-xs text-transparent-grey opacity-0 group-hover:opacity-100 transition'>
										Facebook
									</span>
								</div>
								<div className='relative group space-y-3'>
									<a
										href='https://www.instagram.com/newworldparksolutions/'
										target='_blank'
										rel='noopener noreferrer'
									>
										<div className='rounded-lg bg-grey/30 p-1 hover:bg-brand-blue transition cursor-pointer'>
											<FontAwesomeIcon icon={faInstagram} className='' />
										</div>
									</a>
									<span className='mt-2 absolute top-full left-1/2 -translate-x-1/2 text-xs text-transparent-grey opacity-0 group-hover:opacity-100 transition'>
										Instagram
									</span>
								</div>
								<div className='relative group space-y-3'>
									<a
										href='https://www.linkedin.com/company/new-world-park-solutions-inc/'
										target='_blank'
										rel='noopener noreferrer'
									>
										<div className='rounded-lg bg-grey/30 p-1 hover:bg-brand-blue transition cursor-pointer'>
											<FontAwesomeIcon icon={faLinkedinIn} className='' />
										</div>
									</a>
									<span className='mt-2 absolute top-full left-1/2 -translate-x-1/2 text-xs text-transparent-grey opacity-0 group-hover:opacity-100 transition'>
										LinkedIn
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Section 2 */}
					<FooterLinks />

					{/* Section 3 */}
					<div className='flex flex-col border-l border-transparent-grey px-8 space-y-10 w-1/4'>
						<div>
							<h5 className='text-2xl font-semibold'>CONTACT US</h5>
							<div className='w-10 border-b-2 border-brand-orange border-dotted mt-3'></div>
						</div>
						<Link
							href='/contact'
							className='p-3 rounded-lg cursor-pointer bg-brand-orange text-xl text-white font-bold hover:bg-brand-blue transition text-center'
						>
							Request a Quote
						</Link>
					</div>

					{/* Section 4 */}
					<div className='flex flex-col border-l border-transparent-grey px-8 space-y-10 w-1/4'>
						<div>
							<h5 className='text-2xl font-semibold'>NEWSLETTER</h5>
							<div className='w-10 border-b-2 border-brand-orange border-dotted mt-3'></div>
						</div>
						<span className='text-lg'>
							Sign up for exclusive offers and the best deals.
						</span>
						<form className='space-y-4'>
							<label className='flex flex-col text-transparent-grey'>
								Email
								<input className='rounded-lg bg-white text-dark p-2 mt-1' />
							</label>
							<button
								type='submit'
								className='cursor-pointer rounded-lg bg-brand-blue hover:bg-brand-orange transition py-2 px-6 text-lg font-bold'
							>
								Submit
							</button>
						</form>
					</div>
				</div>
				<span className='text-brand-orange'>
					© 2025 | New World Park Solutions | All Rights Reserved
				</span>
				<AdminButton />
			</div>
		</footer>
	);
};
