import ourStoryImage from '@/assets/images/generic/our-story-image.jpg';

export const OurStory = () => {
	return (
		<section id='our-story'>
			<div
				className='relative bg-cover bg-center'
				style={{ backgroundImage: `url(${ourStoryImage})` }}
			>
				<div className='flex flex-col items-center text-center text-light bg-black/70 p-10 space-y-12'>
					<div className='relative'>
						<h2 className='underline-header text-5xl font-bold'>Our Story</h2>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 500 150'
							preserveAspectRatio='none'
							className='absolute top-1/2 -translate-y-1/2 mt-2'
						>
							<path d='M8.1,146.2c0,0,240.6-55.6,479-13.8'></path>
						</svg>
					</div>
					<p className='text-xl/loose w-2/3 text-light'>
						{`New World Park Solutions is in our 18th year of business (est. 2008) 
                        and looking forward to continuing the great relationships we
						have developed with municipalities, school boards and landscape
						architects throughout Ontario. We are pleased to be the exclusive
						authorized dealer for Playworld, which is a recognized industry
						leader having been in the play equipment manufacturing business
						since 1971. Playworld strongly believes that play is for everyone,
						regardless of ability. That’s why we make inclusion a priority—not
						an option.`}
					</p>
				</div>
			</div>
		</section>
	);
};
