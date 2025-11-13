import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/axios';
import { Image } from '../../../components/ui/Image';
import { Loading } from '../../../components/ui/Loading';
import { Pen } from '../../../components/ui/Pen';
import { useAuth } from '../../../contexts/AuthContext';
import { usePrerender } from '../../../contexts/PrerenderContext';
import { cn } from '../../../utils/cn';
import type { Park, ParkSection } from '../../types';

export const ParkPage = () => {
  const { user } = useAuth();
  const { state } = useLocation();

  const { park: slug } = useParams<{ park: string }>();
  const prerenderData = usePrerender();
  const prPark = prerenderData?.prParks?.find((p) => p.park.slug === slug);
  const [park, setPark] = useState<Park>(prPark?.park || state?.park);
  const [sections, setSections] = useState<ParkSection[]>(prPark?.sections || []);
  const [loading, setLoading] = useState(!prPark);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (state?.park && state.park.slug === slug) {
          // Use preloaded park from state, still fetch sections
          setPark(state.park);
          const res = await api.get<ParkSection[]>(`/parks/${state.park.id}`);
          setSections(res.data);
        } else {
          // Fallback to full fetch by slug
          const res = await api.get(`/parks/by-slug/${slug}`);
          setPark(res.data.park);
          setSections(res.data.sections || []);
        }
      } catch (err) {
        console.error('Error fetching park:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, state?.park]);

  const handleEditPark = () => {
    const parkId = park.id;
    const parkCity = park.location.replace(', Ontario', '');
    const parkBlurb = park.blurb;
    const parkSections = [park, ...sections].map((section, index) => ({
      ...section,
      image: `/images/playgrounds/${slug}/${slug}-${index + 1}.jpg`,
    }));
    navigate('/admin/add-edit-park', {
      state: { parkId, parkCity, parkBlurb, parkSections },
    });
  };

  return (
    <div
      className={cn(
        'relative min-h-screen flex flex-col items-center justify-center gap-12 bg-white',
        'md:py-16',
      )}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Hero */}
          {park && (
            <div
              className={cn(
                'py-6 px-2 flex flex-col items-center gap-12 border-b border-transparent-grey pb-8',
                'lg:border-0',
              )}
            >
              {/* src has cache-busting parameter so it changes on update */}
              <Image
                src={`/images/playgrounds/${slug}/${slug}-1.jpg?v=${Date.now()}`}
                alt={`${park.title} Image 1`}
                className="w-full max-w-250 rounded-xl"
                priority
              />
              <div className="text-center max-w-300 space-y-4">
                <div>
                  <h1 className="text-5xl font-bold">{park.title}</h1>
                  <h2 className="text-lg text-grey">{park.location}</h2>
                </div>
                <p className="text-xl ">{park.description}</p>
              </div>
            </div>
          )}

          {/* Other Sections */}
          {sections.map((section, index) => (
            <div
              key={section.title}
              className={cn(
                'flex flex-col items-center justify-center max-w-400',
                'gap-12 border-b border-transparent-grey pb-8 px-2 text-center',
                'lg:flex-row lg:gap-0 lg:border-0 lg:text-left',
                index % 2 !== 0 ? 'lg:flex-row-reverse' : '',
              )}
            >
              {park && (
                <>
                  {/* src has cache-busting parameter so it changes on update */}
                  <Image
                    src={`/images/playgrounds/${slug}/${slug}-${index + 2}.jpg?v=${Date.now()}`}
                    alt={`${section.title} Image`}
                    className="w-150 rounded-xl"
                    priority={index === 0}
                  />
                </>
              )}
              <div className={cn('flex flex-col gap-4 max-w-200 px-2', 'lg:px-12')}>
                <h3 className="text-3xl font-bold">{section.title}</h3>
                <p className="text-lg">{section.description}</p>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Edit Button */}
      {user && <Pen onClick={handleEditPark} className="absolute top-10 right-10 text-2xl" />}
    </div>
  );
};
