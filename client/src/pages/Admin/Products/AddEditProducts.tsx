import { useLocation, useNavigate } from 'react-router-dom';
import type { ProductsSection } from '../../../components/forms/types';
import { useState } from 'react';
import { ItemForm } from '../../../components/forms/ItemForm';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import api from '../../../api/axios';

export const AddEditProducts = () => {
	const location = useLocation();
	const { productsId, productsSections = [] } =
		(location.state as {
			productsId: number;
			productsSections?: ProductsSection[];
		}) || {};
	const [form, setForm] = useState<ProductsSection[]>(
		productsSections.length > 0
			? productsSections
			: [
					{
						title: '',
						subheading: '',
						description: '',
						image: null,
						externalLink: '',
					},
			  ]
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		for (let i = 0; i < form.length; i++) {
			if (!form[i].image) {
				setError(`Section ${i + 1} requires an image.`);
				return;
			}
		}

        setLoading(true);

        try {
            const id = productsId || null;
            const formData = new FormData();
            
            const jsonData = form.map((section, index) => {
                const { image, ...rest } = section; // remove image
                return index === 0 ? { ...rest, id } : rest;
            });
            formData.append('data', JSON.stringify(jsonData));

            // Append images separately
            form.forEach((section, index) => {
                if (section.image) {
                    formData.append(`${index}`, section.image);
                }
            });

            const res = await api.post('/products/post-products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log('Products Page successfully added', res.data);
            navigate('/products');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
	};

	return (
		<main className='relative min-h-screen flex flex-col items-center bg-white pt-20'>
			<ItemForm
				formType='products'
				form={form}
				setForm={setForm}
				handleSubmit={handleSubmit}
				loading={loading}
			/>
			{error && <span className='text-[red] mt-4'>{error}</span>}
			<Link
				to='/products'
				className='absolute top-10 left-10 text-3xl text-brand-orange hover:scale-110 active:scale-100 transition'
			>
				<FontAwesomeIcon icon={faArrowLeft} />
			</Link>
		</main>
	);
};
