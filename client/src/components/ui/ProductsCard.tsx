import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Link } from 'react-router-dom';
import type { ProductsCategory } from '../../pages/types';
import { cn } from '../../utils/cn';
import { Image } from './Image';
import { Trash } from './Trash';

interface ProductsCardProps {
  category: ProductsCategory;
  disabled?: boolean;
  isEditMode?: boolean;
  deleteItem?: (category: ProductsCategory) => void;
  className?: string;
}

export const ProductsCard = ({
  category,
  disabled,
  isEditMode,
  deleteItem,
  className,
}: ProductsCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: category.id,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const slug = category.slug;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative ${isEditMode ? 'draggable' : ''} ${className}`}
    >
      <Link
        to={`/products/${slug}`}
        state={{ category }}
        aria-label={category.title}
        className={cn(
          'flex flex-col items-center text-center gap-x-8',
          'gap-y-4 hover:scale-105 transition p-1',
          'lg:flex-row lg:text-left lg:gap-y-0',
          isEditMode ? 'pointer-events-none' : '',
        )}
      >
        <Image
          src={`/images/products/${slug}/${slug}-1.jpg?v=${category.imageVersion}`}
          alt={`${category.title} Image`}
          className="w-54 h-44 rounded-lg object-cover shadow-sm"
        />
        <div className={cn('flex flex-col gap-2 px-4', 'md:max-w-1/2 md:px-0')}>
          <h3 className="text-2xl font-bold text-brand-orange line-clamp-3">{category.title}</h3>
          <p className={cn('text-lg/relaxed hidden', 'lg:inline lg:line-clamp-4!')}>{category.description}</p>
        </div>
      </Link>

      {/* Delete Button */}
      {isEditMode && deleteItem && (
        <Trash onClick={() => deleteItem(category)} className="absolute top-1 right-6" />
      )}
    </div>
  );
};
