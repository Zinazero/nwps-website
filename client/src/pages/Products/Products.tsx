import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import playground from '@/assets/images/generic/products-image.jpg';
import { Image } from '../../components/ui/Image';
import './hotspots.css';
import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useState } from 'react';
import api from '../../api/axios';
import { AddCardButton } from '../../components/ui/AddCardButton';
import { Check } from '../../components/ui/Check';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { Loading } from '../../components/ui/Loading';
import { Pen } from '../../components/ui/Pen';
import { ProductsCard } from '../../components/ui/ProductsCard';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductsContext';
import type { ProductsCategory } from '../types';

export const Products = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState<ProductsCategory | null>(null);
  const { user } = useAuth();
  const { productsCategories, setProductsCategories, loading, fetchProductsCategories } = useProducts();

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

  const hotspotClasses =
    'absolute z-11 bg-brand-orange hover:bg-white hover:text-brand-orange transition p-2 rounded-4xl text-white';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-12">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center min-h-screen space-y-16">
          {/* Hero Image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <Image
              src={playground}
              alt="Playground with hotspots"
              className="w-full max-w-350 h-full object-cover relative z-10"
              priority
            />
            <Link to="/products/playgrounds" className={`top-[18%] left-[38%] hotspot ${hotspotClasses}`}>
              <FontAwesomeIcon icon={faInfo} className="text-lg" /> Playgrounds
            </Link>
            <Link
              to="/products/safety-surfacing"
              className={`top-[58%] left-[69%] hotspot ${hotspotClasses}`}
            >
              <FontAwesomeIcon icon={faInfo} className="text-lg" /> Safety Surfacing
            </Link>
            <Link to="/products/park-amenities" className={`top-[89%] left-[30%] hotspot ${hotspotClasses}`}>
              <FontAwesomeIcon icon={faInfo} className="text-lg" /> Park Amenities
            </Link>
          </div>

          {/* Blurb */}
          <div className="mx-40">
            <p className="text-xl/relaxed text-center">
              Since 2008, we’ve built playgrounds exemplifying our belief that play is for everyone,
              regardless of ability. That’s why we make inclusion a priority – not an option.
            </p>
          </div>

          {/* Headers */}
          <div className="flex flex-col text-center space-y-12">
            <h2 className="text-4xl font-semibold text-brand-orange">Let’s make playing fun!</h2>
            <div className="flex items-center space-x-4">
              <h1 className="text-6xl font-bold">Product Categories</h1>
              {user &&
                (isEditMode ? (
                  <Check onClick={() => setIsEditMode(false)} className="text-xl" />
                ) : (
                  <Pen onClick={() => setIsEditMode(true)} className="text-xl" />
                ))}
            </div>
          </div>

          {/* Categories */}
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={productsCategories.map((c) => c.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 gap-y-16 gap-x-32 max-w-350">
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
                    className="last:odd:col-span-2 last:odd:justify-self-center last:odd:w-1/2"
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

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
