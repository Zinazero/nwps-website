import { ParkCard } from '@/app/components/ui/ParkCard';
import { CallToAction } from '@/app/components/ui/CallToAction';
import Link from 'next/link';
import { getRecentParks } from '@/lib/parks.repository';
import { Park } from '@/app/types';
import { cn } from '@/app/utils/cn';

export const RecentProjects = async () => {
	const recentProjects: Park[] = await getRecentParks();

	return (
		<section id='recent-projects'>
			{/* Recent Projects */}
			<div className='flex flex-col max-w-400 mx-auto px-20 py-14 space-y-10'>
				<Link href='/portfolio' className='flex items-center w-full group'>
					<h2 className='text-5xl font-bold text-nowrap mr-6 group-hover:translate-x-4 transition'>
						Recent Projects
					</h2>
					<hr className='w-full text-brand-orange group-hover:translate-x-4 transition' />
				</Link>
				{recentProjects.length === 0 ? (
					<Link
						href='/portfolio'
						className={cn(
							'rounded-lg mx-auto w-1/2 p-2 bg-brand-orange text-light',
							'font-semibold text-center hover:bg-brand-blue transition'
						)}
					>
						Check out our Recent Projects!
					</Link>
				) : (
					<div className='grid grid-cols-1 xl:grid-cols-3 gap-10 text-center'>
						{recentProjects.map((park, i) => (
							<div key={`Recent Project ${i}`}>
								<ParkCard park={park} className='mb-24' />
								<p className='text-lg/loose'>
									{park.blurb || park.description}
								</p>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Call To Action Banner */}
			<CallToAction />
		</section>
	);
};
