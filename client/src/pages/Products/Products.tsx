import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useState } from 'react';
import api from '../../api/axios';
import { AddCardButton } from '../../components/ui/AddCardButton';
import { Check } from '../../components/ui/Check';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { HotspotImage } from '../../components/ui/HotspotImage';
import { Loading } from '../../components/ui/Loading';
import { Pen } from '../../components/ui/Pen';
import { ProductsCard } from '../../components/ui/ProductsCard';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductsContext';
import { cn } from '../../utils/cn';
import { useIsMobile } from '../../utils/useIsMobile';
import type { ProductsCategory } from '../types';

export const Products = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState<ProductsCategory | null>(null);
  const { user } = useAuth();
  const { productsCategories, setProductsCategories, loading, fetchProductsCategories } = useProducts();
  const isMobile = useIsMobile();

  const handleDeleteClick = (category: ProductsCategory) => {
    setDeleteCategory(category);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (deleteCategory === null) return;

    try {
      await api.delete(`/products/${deleteCategory.id}`);
      setProductsCategories((prev) => prev.filter((category) => category.id !== deleteCategory.id));
      console.log('Deleted category:', deleteCategory);
    } catch (err) {
      console.error('Error deleting category:', err);
    } finally {
      fetchProductsCategories();
      setDeleteCategory(null);
      setConfirmOpen(false);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const persistOrder = async (ordered: ProductsCategory[]) => {
    try {
      await api.post(
        '/products/reorder',
        ordered.map((c, i) => ({ id: c.id, sort_order: i })),
      );
    } catch (err) {
      console.error('Failed to persist products category order:', err);
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
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
    <div className={cn('min-h-screen flex flex-col items-center justify-center py-8 px-4', 'md:p-12')}>
      <div className="flex flex-col items-center min-h-screen gap-16">
        {/* Hotspot Image */}
        {!isMobile && <HotspotImage />}

        {/* Blurb */}
        <div className="lg:mx-40">
          <p className="text-xl/relaxed text-center">
            Since 2008, we’ve built playgrounds exemplifying our belief that play is for everyone, regardless
            of ability. That’s why we make inclusion a priority – not an option.
          </p>
        </div>

        {/* Headers */}
        <div className={cn('flex flex-col text-center gap-4', 'md:gap-12')}>
          <h2 className={cn('text-2xl font-semibold text-brand-orange', 'md:text-4xl')}>
            Let’s make playing fun!
          </h2>
          <div className="flex items-center gap-4">
            <h1 className={cn('text-4xl font-bold', 'md:text-6xl')}>Product Categories</h1>
            {user &&
              (isEditMode ? (
                <Check onClick={() => setIsEditMode(false)} className="text-xl" />
              ) : (
                <Pen onClick={() => setIsEditMode(true)} className="text-xl" />
              ))}
          </div>
        </div>

        {/* Categories */}
        {loading ? (
          <Loading />
        ) : productsCategories.length < 1 ? (
          <span className="text-xl text-gray-400">No products available</span>
        ) : (
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={productsCategories.map((c) => c.id)} strategy={rectSortingStrategy}>
              <div className={cn('grid grid-cols-1 gap-y-16 gap-x-32 max-w-350', 'md:grid-cols-2')}>
                {/* ADMIN ONLY --- Add Products Page */}
                {isEditMode && (
                  <AddCardButton
                    navigationRoute="/admin/add-edit-products"
                    className="min-w-100 min-h-40 last:odd:col-span-2 last:odd:justify-self-center"
                  />
                )}

                {productsCategories.map((category) => (
                  <ProductsCard
                    key={category.id}
                    category={category}
                    disabled={!isEditMode}
                    isEditMode={isEditMode}
                    deleteItem={handleDeleteClick}
                    className="md:last:odd:col-span-2 md:last:odd:justify-self-center md:last:odd:w-1/2"
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        message={`Are you sure you want to delete ${deleteCategory?.title}?`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};
