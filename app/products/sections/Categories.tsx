'use client';

import { AddCardButton } from '@/app/components/ui/AddCardButton';
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	rectSortingStrategy,
	SortableContext,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { EditMode } from './EditMode';
import { ProductsCategory } from '@/types';
import { ProductsCard } from '@/app/components/ui/ProductsCard';
import { ConfirmModal } from '@/app/components/ui/ConfirmModal';

interface CategoriesProps {
	categories: ProductsCategory[];
}

export const Categories = ({ categories }: CategoriesProps) => {
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [productsCategories, setProductsCategories] = useState<
		ProductsCategory[]
	>([]);

	const [deleteCategory, setDeleteCategory] = useState<ProductsCategory | null>(
		null
	);

	useEffect(() => {
		setProductsCategories(categories);
	}, []);

	const handleDeleteClick = (category: ProductsCategory) => {
		setDeleteCategory(category);
		setConfirmOpen(true);
	};

	const handleDelete = async () => {
		if (deleteCategory === null) return;

		try {
			await fetch(`/api/products/${deleteCategory.id}`, { method: 'DELETE' });
			setProductsCategories((prev) =>
				prev.filter((category) => category.id !== deleteCategory.id)
			);
			console.log('Deleted category:', deleteCategory);
		} catch (err) {
			console.error('Error deleting category:', err);
		} finally {
			setDeleteCategory(null);
			setConfirmOpen(false);
		}
	};

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 5 },
		})
	);

	const persistOrder = async (ordered: ProductsCategory[]) => {
		try {
			await fetch('/api/products/reorder', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(
					ordered.map((c, i) => ({ id: c.id, sort_order: i }))
				),
			});
		} catch (err) {
			console.error('Failed to persist products category order:', err);
		}
	};

	const handleDragEnd = ({ active, over }: { active: any; over: any }) => {
		if (!over || active.id === over.id) return;

		setProductsCategories((prev) => {
			const oldIndex = prev.findIndex((p) => p.id === active.id);
			const newIndex = prev.findIndex((p) => p.id === over.id);
			if (oldIndex === -1 || newIndex === -1) return prev;

			const next = arrayMove(prev, oldIndex, newIndex);

			persistOrder(next);

			return next;
		});
	};

	return (
		<>
			<EditMode isEditMode={isEditMode} setIsEditMode={setIsEditMode} />

			<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
				<SortableContext
					items={categories.map((c) => c.id)}
					strategy={rectSortingStrategy}
				>
					<div className='grid grid-cols-2 gap-y-16 gap-x-32 max-w-350'>
						{/* ADMIN ONLY --- Add Products Page */}
						{isEditMode && (
							<AddCardButton
								navigationRoute='/admin/add-edit-products'
								className='min-w-100 min-h-40 last:odd:col-span-2 last:odd:justify-self-center'
							/>
						)}

						{productsCategories.map((category) => (
							<ProductsCard
								key={category.id}
								category={category}
								disabled={!isEditMode}
								isEditMode={isEditMode}
								deleteItem={handleDeleteClick}
								className='last:odd:col-span-2 last:odd:justify-self-center last:odd:w-1/2'
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>

			{/* Confirm Modal */}
			<ConfirmModal
				isOpen={confirmOpen}
				message={`Are you sure you want to delete ${deleteCategory?.title}?`}
				onConfirm={handleDelete}
				onCancel={() => setConfirmOpen(false)}
			/>
		</>
	);
};
