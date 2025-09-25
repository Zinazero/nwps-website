import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { ProductsCategory } from '../../types';
import { useEffect, useState } from 'react';
import { ImageMask } from '../../../components/ui/ImageMask';
import { Image } from '../../../components/ui/Image';
import { Pen } from '../../../components/ui/Pen';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../api/axios';
import { Loading } from '../../../components/ui/Loading';
import { CallToAction } from '../../../components/ui/CallToAction';

interface ProductsSection {
	id: number;
	title: string;
	subheading?: string;
	description: string;
	externalLink?: string;
}

export const ProductsPage = () => {
	const { user } = useAuth();
	const { state } = useLocation();
	const [category, setCategory] = useState<ProductsCategory>(state?.category);
	const [sections, setSections] = useState<ProductsSection[]>([]);
	const [loading, setLoading] = useState(true);

	const { category: slug } = useParams<{ category: string }>();
	const navigate = useNavigate();

	// Only fetch product category if we don't have it
	useEffect(() => {
		if (!category) {
			const fetchCategory = async () => {
				try {
					const res = await api.get(`/products/by-category/${slug}`);
					setCategory(res.data.category);
					setSections(res.data.sections || []);
				} catch (err) {
					console.error('Error fetching product category:', err);
				} finally {
					setLoading(false);
				}
			};

			fetchCategory();
		}
	}, [slug]);

	// Only fetch sections if product category already exists on initial render
	useEffect(() => {
		if (category) {
			const fetchSections = async () => {
				try {
					const res = await api.get<ProductsSection[]>(
						`/products/${category.id}`
					);
					setSections(res.data);
				} catch (err) {
					console.error('Error fetching product category sections:', err);
				} finally {
					setLoading(false);
				}
			};

			fetchSections();
		}
	}, []);

	const handleEditCategory = () => {
		const categoryId = category.id;
		const categorySections = [category, ...sections].map((section, index) => ({
			...section,
			image: `/images/products/${slug}/${slug}-${index + 1}.jpg`,
		}));

		navigate('/admin/add-edit-products', {
			state: { categoryId, categorySections },
		});
	};

	return (
		<main className='relative min-h-screen flex flex-col items-center justify-center bg-white space-y-20 pb-26'>
			{loading ? (
				<Loading />
			) : (
				<>
					<div className='flex flex-col items-center w-full min-h-screen space-y-20 p-6'>
						{/* Hero */}
						{category && (
							<div className='flex w-full items-center justify-center border-b-3 border-dashed border-brand-orange pb-16'>
								<div className='flex items-center max-w-500'>
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
							</div>
						)}

						{/* Other Sections */}
						{sections.map((section, index) => {
							const SectionContent = (
								<div
									className={`flex items-center justify-center max-w-350 ${
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
											className='rounded-xl max-w-1/2'
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
									className='block hover:scale-105 transition'
								>
									{SectionContent}
								</a>
							) : (
								<div key={`Section ${index}`}>{SectionContent}</div>
							);
						})}
					</div>

					{/* Playworld */}
					<CallToAction />

					{/* Edit Button */}
					{user && (
						<Pen
						onClick={handleEditCategory}
						className='absolute top-10 right-10 text-2xl'
						/>
					)}
				</>
			)}
		</main>
	);
};
