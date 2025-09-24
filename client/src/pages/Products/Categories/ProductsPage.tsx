import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { ProductCategory } from '../../types';
import { useState } from 'react';
import { ImageMask } from '../../../components/ui/ImageMask';
import { Image } from '../../../components/ui/Image';
import { Pen } from '../../../components/ui/Pen';
import { useAuth } from '../../../contexts/AuthContext';

interface ProductsSection {
	id: number;
	title: string;
	subheading?: string;
	description: string;
	externalLink?: string;
}

export const ProductsPage = () => {
	const { user } = useAuth();
	const testSections: ProductsSection[] = [
		{
			id: 1,
			title: 'Early Childhood Playgrounds',
			subheading: 'Ages 5 and Under',
			description:
				'When it comes to developing emotional, sensory, and gross motor skills in preschoolers, and encouraging both co-located and cooperative play, our preschool playground equipment has your needs covered. Explore our playgrounds for toddlers, and find out how our developmentally optimized, sustainable and inclusive play environments will enhance your space.',
			externalLink: 'https://playworld.com/early-childhood/',
		},
		{
			id: 2,
			title: 'School-Age Playgrounds',
			subheading: 'Ages 5 — 12',
			description:
				'Older kids have different play needs—that’s why we offer school-age playgrounds specifically designed to entertain, challenge, burn calories, boost brain power, and build relationships. Explore our play equipment for children ages 5-12 to create a brand new structure or enhance your existing playground for kids of all abilities.',
			externalLink: 'https://playworld.com/school-age/',
		},
		{
			id: 3,
			title: 'Cre8Play',
			description:
				'In partnership with Cre8Play, New World Park Solutions is equipped to meet the unique needs of all projects and landscapes. From sculptures to tailor-made adventures, Cre8Play goes above and beyond to ensure park-goers of all ages enjoy a fantastic and immersive experience.',
			externalLink: 'https://www.cre8play.com/',
		},
	];

	const { state } = useLocation();
	const [category, setCategory] = useState<ProductCategory>(state?.category);
	const [sections, setSections] = useState(testSections);

	const { category: slug } = useParams<{ category: string }>();
	const navigate = useNavigate();

	const handleEditCategory = () => {
		navigate('/admin/add-edit-products', {
			state: {},
		});
	};

	return (
		<main className='relative min-h-screen flex flex-col items-center justify-center bg-white p-6'>
			<div className='flex flex-col min-h-screen space-y-20'>
				{/* Hero */}
				{category && (
					<div className='flex items-center border-b-3 border-dashed border-brand-orange pb-16'>
						<ImageMask
							src={`/images/products/${slug}/${slug}-1.jpg`}
							alt={`${category.title} Image 1`}
							maskUrl='/masks/rock-mask.svg'
						/>
						<div className='flex flex-col space-y-6'>
							<h1 className='text-6xl font-bold'>{category.title}</h1>
							<p className='text-xl/relaxed'>{category.description}</p>
						</div>
					</div>
				)}

				{/* Other Sections */}
				{sections.map((section, index) => {
					const SectionContent = (
						<div
							className={`flex items-center justify-center max-w-300 hover:scale-105 transition ${
								index % 2 !== 0 ? 'flex-row-reverse' : ''
							}`}
						>
							<div className='flex flex-col space-y-4 mx-10'>
								<h2 className='text-4xl font-semibold text-brand-blue'>
									{section.title}
								</h2>
								{section.subheading && (
									<h3 className='text-2xl font-semibold'>
										{section.subheading}
									</h3>
								)}
								<p className='text-lg/relaxed'>{section.description}</p>
							</div>
							{category && (
								<Image
									src={`/images/products/${slug}/${slug}-${index + 2}.jpg`}
									alt={`${section.title} Image`}
									className='rounded-xl'
								/>
							)}
						</div>
					);

					return section.externalLink ? (
						<a
							key={`Section ${index}`}
							href={section.externalLink}
							target='_blank'
							rel='noopener noreferrer'
							className='block' // ensure the <a> fills the content
						>
							{SectionContent}
						</a>
					) : (
						<div key={`Section ${index}`}>{SectionContent}</div>
					);
				})}
			</div>

			{/* Edit Button */}
			{user && (
				<Pen
					onClick={handleEditCategory}
					className='absolute top-10 right-10 text-2xl'
				/>
			)}
		</main>
	);
};
