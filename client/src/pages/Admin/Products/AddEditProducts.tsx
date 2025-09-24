import { useLocation, useNavigate } from 'react-router-dom';
import type { ProductsSection } from '../../../components/forms/types';
import { useState } from 'react';
import { ItemForm } from '../../../components/forms/ItemForm';

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
			: [{ title: '', subheading: '', description: '', image: null, externalLink: '' }]
	);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

	return (
		<main className='relative min-h-screen flex flex-col items-center bg-white'>
			<ItemForm 
                formType='products'
                form={form}
                setForm={setForm}
                handleSubmit={() => { console.log('submitting!') }}
                loading={loading}
            />
		</main>
	);
};
