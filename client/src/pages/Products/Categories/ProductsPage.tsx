import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/axios';
import { CallToAction } from '../../../components/ui/CallToAction';
import { Image } from '../../../components/ui/Image';
import { ImageMask } from '../../../components/ui/ImageMask';
import { Loading } from '../../../components/ui/Loading';
import { Pen } from '../../../components/ui/Pen';
import { useAuth } from '../../../contexts/AuthContext';
import { cn } from '../../../utils/cn';
import type { ProductsCategory } from '../../types';

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (state?.category && state.category.slug === slug) {
          // Use preloaded category from state, still fetch sections
          setCategory(state.category);
          const res = await api.get<ProductsSection[]>(`/products/${state.category.id}`);
          setSections(res.data);
        } else {
          // Fallback to full fetch by slug
          const res = await api.get(`/products/by-slug/${slug}`);
          setCategory(res.data.category);
          setSections(res.data.sections || []);
        }
      } catch (err) {
        console.error('Error fetching product category:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, state?.category]);

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
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white space-y-20 pb-26">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col items-center w-full min-h-screen space-y-20 p-6">
            {/* Hero */}
            {category && (
              <div className="flex w-full items-center justify-center border-b-3 border-dashed border-brand-orange pb-16">
                <div className="flex items-center max-w-450 space-x-30">
                  <ImageMask
                    src={`/images/products/${slug}/${slug}-1.jpg`}
                    alt={`${category.title} Image 1`}
                    mask="rock-mask.svg"
                    priority
                  />
                  <div className="flex flex-col space-y-6 w-150">
                    <h1 className="text-6xl font-bold">{category.title}</h1>
                    <p className="text-xl/relaxed">{category.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Other Sections */}
            {sections.map((section, index) => {
              const SectionContent = (
                <div
                  key={section.title}
                  className={cn(
                    'flex items-center justify-center max-w-350',
                    index % 2 !== 0 ? 'flex-row-reverse' : '',
                  )}
                >
                  <div className="flex flex-col space-y-4 mx-10 w-1/2">
                    <h2 className="text-4xl font-semibold text-brand-blue">{section.title}</h2>
                    {section.subheading && <h3 className="text-2xl font-semibold">{section.subheading}</h3>}
                    <p className="text-lg/relaxed">{section.description}</p>
                  </div>
                  {category && (
                    <Image
                      src={`/images/products/${slug}/${slug}-${index + 2}.jpg`}
                      alt={`${section.title} Image`}
                      className="rounded-xl"
                      priority={index === 0}
                    />
                  )}
                </div>
              );

              return section.externalLink ? (
                <a
                  key={section.title}
                  href={section.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:scale-105 transition"
                >
                  {SectionContent}
                </a>
              ) : (
                SectionContent
              );
            })}
          </div>

          {/* Playworld */}
          <CallToAction />

          {/* Edit Button */}
          {user && <Pen onClick={handleEditCategory} className="absolute top-10 right-10 text-2xl" />}
        </>
      )}
    </div>
  );
};
