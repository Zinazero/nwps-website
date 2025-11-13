import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/axios';
import { CallToAction } from '../../../components/ui/CallToAction';
import { Image } from '../../../components/ui/Image';
import { ImageMask } from '../../../components/ui/ImageMask';
import { Loading } from '../../../components/ui/Loading';
import { Pen } from '../../../components/ui/Pen';
import { useAuth } from '../../../contexts/AuthContext';
import { usePrerender } from '../../../contexts/PrerenderContext';
import { cn } from '../../../utils/cn';
import type { ProductsCategory, ProductsSection } from '../../types';

export const ProductsPage = () => {
  const { user } = useAuth();
  const { state } = useLocation();

  const { category: slug } = useParams<{ category: string }>();
  const prerenderData = usePrerender();
  const prCategory = prerenderData?.prProducts?.find((p) => p.category.slug === slug);
  const [category, setCategory] = useState<ProductsCategory>(prCategory?.category || state?.category);
  const [sections, setSections] = useState<ProductsSection[]>(prCategory?.sections || []);
  const [loading, setLoading] = useState(!prCategory);
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
    <div
      className={cn(
        'relative min-h-screen flex flex-col items-center justify-center bg-white gap-20 pb-26',
        'md:pt-10',
      )}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col items-center w-full min-h-screen gap-20 p-6">
            {/* Hero */}
            {category && (
              <div className="flex w-full items-center justify-center border-b-3 border-dashed border-brand-orange pb-16">
                <div className={cn('flex flex-col items-center max-w-450 gap-x-30 gap-y-6', 'md:flex-row')}>
                  <ImageMask
                    src={`/images/products/${slug}/${slug}-1.jpg`}
                    alt={`${category.title} Category Photo`}
                    mask="rock-mask.svg"
                    priority
                    className="md:w-1/2"
                  />
                  <div className={cn('flex flex-col gap-6 text-center', 'md:text-left md:w-1/2')}>
                    <h1 className={cn('text-5xl font-bold', 'md:text-6xl')}>{category.title}</h1>
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
                    'flex flex-col-reverse items-center justify-center max-w-350 gap-4 text-center',
                    'md:flex-row md:gap-10 md:text-left',
                    index % 2 !== 0 ? 'md:flex-row-reverse' : '',
                  )}
                >
                  <div className={cn('flex flex-col gap-4', 'md:w-1/2')}>
                    <h2 className="text-4xl font-semibold text-brand-blue">{section.title}</h2>
                    {section.subheading && <h3 className="text-2xl font-semibold">{section.subheading}</h3>}
                    <p className="text-lg/relaxed text-left!">{section.description}</p>
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
                  aria-label={`More info on ${section.title}`}
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
